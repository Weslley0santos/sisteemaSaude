import { defineStore } from 'pinia';
import type { Atendimento, AtendimentoCreate, AtendimentoUpdate } from 'src/types/atendimento';
import { AtendimentoService } from 'src/services/atendimentoService';
import {
  calcularEspera,
  calcularConsulta,
  calcularTotal,
} from 'src/helpers/tempoAtendimentoHelper';

export enum STAGE {
  TRIAGE = 'triage',
  CONSULTATION = 'consultation',
}

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

      this.atendimentos = data.map((a) => ({
        ...a,
        tempoAtendimento: {
          espera: a.tempoAtendimento?.espera ?? 0,
          consultando: a.tempoAtendimento?.consultando ?? 0,
          total: a.tempoAtendimento?.total ?? 0,
        },
      }));
    },

    async adicionarAtendimento(atendimento: AtendimentoCreate) {
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

    async atualizarAtendimento(id: number, atualizado: AtendimentoUpdate) {
      const data = await AtendimentoService.atualizar(id, atualizado);

      const index = this.atendimentos.findIndex((a) => a.id === id);

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
      if (!atual) return;

      const inicioConsulta = new Date().toISOString();

      const atualizado: AtendimentoUpdate = {
        estagio: STAGE.CONSULTATION,
        inicioConsulta,
        tempoAtendimento: {
          ...atual.tempoAtendimento,
          espera: calcularEspera(atual, inicioConsulta),
        },
      };

      await this.atualizarAtendimento(atual.id, atualizado);
    },

    async finalizarAtendimento(id: number) {
      const index = this.atendimentos.findIndex((a) => a.id === id);
      if (index === -1) return;

      const atual = this.atendimentos[index];
      if (!atual) return;

      const finalizadoEm = new Date().toISOString();

      const consultando = calcularConsulta(atual.inicioConsulta || '', finalizadoEm);

      const atualizado: AtendimentoUpdate = {
        status: STATUS.COMPLETED,
        finalizadoEm,
        tempoAtendimento: {
          ...atual.tempoAtendimento,
          consultando,
          total: calcularTotal(atual.tempoAtendimento.espera, consultando),
        },
      };

      await this.atualizarAtendimento(atual.id, atualizado);
    },

    async removerAtendimento(id: number) {
      await AtendimentoService.remover(id);

      this.atendimentos = this.atendimentos.filter((a) => a.id !== id);
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
