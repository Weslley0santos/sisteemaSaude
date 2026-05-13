import { defineStore } from 'pinia';
import type { Atendimento } from 'src/types/atendimento';

export const ESTAGIO = {
  triagem: 'Triagem',
  consulta: 'Consulta',
};

export const STATUS = {
  emAndamento: 'Em andamento',
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
      // Chama a função finalizar atendimento com o parametro senha como string
      const atendimento = this.atendimentos.find((a) => a.senha === senha); //cria uma const atendimento
      //que compara a senha e puxa o atendimento daquela senha

      if (atendimento) {
        //se atendimento for
        atendimento.status = STATUS.concluido;
        //atendimento  muda para concluido
      }
    },
  },

  getters: {
    triagem: (state) => state.atendimentos.filter((a) => a.estagio === ESTAGIO.triagem),

    consulta: (state) => state.atendimentos.filter((a) => a.estagio === ESTAGIO.consulta),

    concluidos: (state) => state.atendimentos.filter((a) => a.status === STATUS.concluido),

    consultaAtiva: (state) =>
      state.atendimentos.filter(
        (a) => a.estagio === ESTAGIO.consulta && a.status === STATUS.emAndamento,
      ),

    encaminhamentoOptions: () =>
      Object.entries(ENCAMINHAMENTO).map(([key, value]) => ({
        label: key,
        value: value,
      })),
  },
});
