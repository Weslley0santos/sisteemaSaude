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

export const useAtendimentoStore = defineStore('atendimento', {
  state: () => ({
    atendimentos: [] as Atendimento[],
  }),

  actions: {
    async carregarAtendimentos() {
      this.atendimentos = await AtendimentoService.listar();
    },

    async adicionarAtendimento(atendimento: Atendimento) {
      const data = await AtendimentoService.criar(atendimento);
      this.atendimentos.push(data);
    },

    async atualizarAtendimento(atendimentoAtualizado: Atendimento) {
      const index = this.atendimentos.findIndex((a) => a.senha === atendimentoAtualizado.senha);

      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual?.id) return;

      const data = await AtendimentoService.atualizar(atual.id, atendimentoAtualizado);

      this.atendimentos[index] = data;
    },

    async avancarParaConsulta(senha: string) {
      const index = this.atendimentos.findIndex((a) => a.senha === senha);
      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual?.id) return;

      const inicioConsulta = new Date().toISOString();

      const tempoAtual = {
        espera: atual.tempoAtendimento?.espera ?? 0,
        consultando: atual.tempoAtendimento?.consultando ?? 0,
        total: atual.tempoAtendimento?.total ?? 0,
      };

      const atualizado: Atendimento = {
        ...atual,
        estagio: ESTAGIO.consulta,
        inicioConsulta,
        tempoAtendimento: tempoAtual,
      };

      atualizado.tempoAtendimento.espera = calcularEspera(atual, inicioConsulta);

      const data = await AtendimentoService.atualizar(atual.id, atualizado);

      this.atendimentos[index] = data;
    },

    async finalizarAtendimento(senha: string) {
      const index = this.atendimentos.findIndex((a) => a.senha === senha);
      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual?.id) return;

      const finalizadoEm = new Date().toISOString();

      const tempoAtual = {
        espera: atual.tempoAtendimento?.espera ?? 0,
        consultando: atual.tempoAtendimento?.consultando ?? 0,
        total: atual.tempoAtendimento?.total ?? 0,
      };

      const atualizado: Atendimento = {
        ...atual,
        status: STATUS.concluido,
        finalizadoEm,
        tempoAtendimento: tempoAtual,
      };

      atualizado.tempoAtendimento.consultando = calcularConsulta(
        atual.inicioConsulta || '',
        finalizadoEm,
      );

      atualizado.tempoAtendimento.total = calcularTotal(
        atualizado.tempoAtendimento.espera,
        atualizado.tempoAtendimento.consultando,
      );

      const data = await AtendimentoService.atualizar(atual.id, atualizado);

      this.atendimentos[index] = data;
    },
  },

  getters: {
    triagem: (state) => state.atendimentos.filter((a) => a.estagio === ESTAGIO.triagem),

    consulta: (state) => state.atendimentos.filter((a) => a.estagio === ESTAGIO.consulta),

    concluidos: (state) => state.atendimentos.filter((a) => a.status === STATUS.concluido),
  },
});
