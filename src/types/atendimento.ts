import type { Stage } from 'src/stores/atendimentoStore';

export interface Atendimento {
  id?: number;
  nome: string;
  status: string;
  estagio: Stage;
  senha: string;
  encaminhamento: string;
  observacoes: Observacoes[];
  criadoEm: string;
  inicioConsulta?: string;
  finalizadoEm?: string;
  tempoAtendimento: TempoAtendimento;
}
export type AtendimentoUpdate = Partial<Atendimento> & {
  id: number;
};

export interface Observacoes {
  texto: string;
  estagio: string;
}

export interface TempoAtendimento {
  espera: number;
  consultando: number;
  total: number;
}
