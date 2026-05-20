import { defineStore } from 'pinia';
import type { Atendimento } from 'src/types/atendimento';
import { AtendimentoService } from 'src/services/atendimentoService';
import { calcularEspera, calcularConsulta, calcularTotal } from 'src/utils/tempoAtendimento';

export const ESTAGIO = {
  triagem: 'Triagem',
  consulta: 'Consulta',
};

export const STATUS = {
  emAndamento: 'Em andamento',
  concluido: 'Concluido',
};

export const ENCAMINHAMENTO = {
  Clinico_Geral: 'Clinico geral',
  Cardiologia: 'Cardiologia',
  Ortopedista: 'Ortopedista',
  Pediatria: 'Pediatria',
};

export const useAtendimentoStore = defineStore('atendimento', {
  state: () => ({
    atendimentos: [] as Atendimento[],
  }),

  actions: {
    async carregarAtendimentos() {
      const data = await AtendimentoService.listar();

      // proteção contra dados incompletos da API
      this.atendimentos = data.map((a: Atendimento) => ({
        ...a,
        tempoAtendimento: {
          espera: a.tempoAtendimento?.espera ?? 0,
          consultando: a.tempoAtendimento?.consultando ?? 0,
          total: a.tempoAtendimento?.total ?? 0,
        },
      }));
    },

    async adicionarAtendimento(atendimento: Atendimento) {
      const data = await AtendimentoService.criar(atendimento);

      this.atendimentos.push({
        ...data,
        tempoAtendimento: {
          espera: 0,
          consultando: 0,
          total: 0,
        },
      });
    },

    async atualizarAtendimento(atualizado: Atendimento) {
      if (!atualizado.id) return;

      const data = await AtendimentoService.atualizar(atualizado.id, atualizado);

      const index = this.atendimentos.findIndex((a) => a.id === atualizado.id);

      if (index !== -1) {
        this.atendimentos[index] = {
          ...this.atendimentos[index],
          ...data,
        };
      }
    },

    async avancarParaConsulta(id: number) {
      const index = this.atendimentos.findIndex((a) => a.id === id);
      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual?.id) return;

      const inicioConsulta = new Date().toISOString();

      const atualizado: Atendimento = {
        ...atual,
        estagio: ESTAGIO.consulta,
        inicioConsulta,
        tempoAtendimento: {
          ...atual.tempoAtendimento,
          espera: calcularEspera(atual, inicioConsulta),
        },
      };

      const data = await AtendimentoService.atualizar(atual.id, atualizado);

      this.atendimentos[index] = {
        ...atual,
        ...data,
      };
    },

    async finalizarAtendimento(id: number) {
      const index = this.atendimentos.findIndex((a) => a.id === id);
      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual?.id) return;

      const finalizadoEm = new Date().toISOString();

      const consultando = calcularConsulta(atual.inicioConsulta || '', finalizadoEm);

      const atualizado: Atendimento = {
        ...atual,
        status: STATUS.concluido,
        finalizadoEm,
        tempoAtendimento: {
          ...atual.tempoAtendimento,
          consultando,
          total: calcularTotal(atual.tempoAtendimento.espera, consultando),
        },
      };

      const data = await AtendimentoService.atualizar(atual.id, atualizado);

      this.atendimentos[index] = {
        ...atual,
        ...data,
      };
    },

    async removerAtendimento(id: number) {
      await AtendimentoService.remover(id);

      this.atendimentos = this.atendimentos.filter((a: Atendimento) => a.id !== id);
    },
  },

  getters: {
    triagem: (state) => state.atendimentos.filter((a) => a.estagio === ESTAGIO.triagem),

    consulta: (state) =>
      state.atendimentos.filter(
        (a) => a.estagio === ESTAGIO.consulta && a.status === STATUS.emAndamento,
      ),

    concluidos: (state) =>
      state.atendimentos.filter(
        (a) => a.estagio === ESTAGIO.consulta && a.status === STATUS.concluido,
      ),

    encaminhamentoOptions: () =>
      Object.entries(ENCAMINHAMENTO).map(([key, value]) => ({
        label: key,
        value,
      })),
  },
});
