import { defineStore } from 'pinia';
import type { Atendimento } from 'src/types/atendimento';

export const ESTAGIO = {
  triagem: 'Triagem',
  consulta: 'Esperando Consulta',
  finalizado: 'No Medico',
};

export const STATUS = {
  esperando: 'Esperando',
  consultado: 'Consultando',
  concluido: 'Concluido',
};

export const ENCAMINHAMENTO = {
  clinico_geral: 'Clinico geral',
  cardiologia: 'Cardiologia',
  ortopedista: 'Ortopedista',
  pediatria: 'Pediatria',
};

export const useAtendimentoStore = defineStore('atendimento', {
  state: () => ({
    atendimentos: [] as Atendimento[],
  }),

  actions: {
    adicionarAtendimento(atendimento: Atendimento) {
      this.atendimentos.push(atendimento);
    },

    avancarParaConsulta(senha: string) {
      const atendimento = this.atendimentos.find((a) => a.senha === senha);

      if (atendimento) {
        atendimento.estagio = ESTAGIO.consulta;
      }
    },

    finalizarAtendimento(senha: string) {
      const atendimento = this.atendimentos.find((a) => a.senha === senha);

      if (atendimento) {
        atendimento.estagio = ESTAGIO.finalizado;
      }
    },
  },

  getters: {
    triagem: (state) => state.atendimentos.filter((a) => a.estagio === 'Triagem'),

    consulta: (state) => state.atendimentos.filter((a) => a.estagio === 'Esperando Consulta'),

    finalizados: (state) => state.atendimentos.filter((a) => a.estagio === 'No Medico'),

    encaminhamentoOptions: () =>
      Object.entries(ENCAMINHAMENTO).map(([key, value]) => ({
        label: key,
        value: value,
      })),
  },
});
