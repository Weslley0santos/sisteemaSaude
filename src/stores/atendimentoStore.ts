import { defineStore } from 'pinia';
import type { Atendimento } from 'src/types/atendimento';
import { AtendimentoService } from 'src/services/atendimentoService';
import { calcularEspera, calcularConsulta, calcularTotal } from 'src/utils/tempoAtendimento';

export const STAGE = {
  TRIAGE: 'triage',
  CONSULTATION: 'consultation',
} as const;

export type Stage = (typeof STAGE)[keyof typeof STAGE];

export const STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const REFERRAL = {
  GENERAL_CLINIC: 'general_clinic',
  CARDIOLOGY: 'cardiology',
  ORTHOPEDICS: 'orthopedics',
  PEDIATRICS: 'pediatrics',
};

export const useAtendimentoStore = defineStore('atendimento', {
  state: () => ({
    atendimentos: [] as Atendimento[],
  }),

  actions: {
    async carregarAtendimentos() {
      const data = await AtendimentoService.listar();

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
        estagio: STAGE.CONSULTATION,
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
        status: STATUS.COMPLETED,
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
    triagem: (state) => state.atendimentos.filter((a) => a.estagio === STAGE.TRIAGE),

    consulta: (state) =>
      state.atendimentos.filter(
        (a) => a.estagio === STAGE.CONSULTATION && a.status === STATUS.IN_PROGRESS,
      ),

    concluidos: (state) =>
      state.atendimentos.filter(
        (a) => a.estagio === STAGE.CONSULTATION && a.status === STATUS.COMPLETED,
      ),

    filtrar: (state) => (params: { estagio?: string | null; data?: string | null }) => {
      let dados = state.atendimentos;

      if (params.estagio) {
        dados = dados.filter((a) => a.estagio === params.estagio);
      }

      if (params.data) {
        dados = dados.filter((a) => a.criadoEm?.startsWith(params.data!));
      }

      return dados;
    },

    encaminhamentoOptions: () =>
      Object.entries(REFERRAL).map(([, value]) => ({
        label: value,
        value,
      })),
  },
});
