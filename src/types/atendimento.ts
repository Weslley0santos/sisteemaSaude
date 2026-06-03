import type { Stage } from 'src/stores/atendimentoStore';

interface AtendimentoBase {
  nome: string;
  status: string;
  estagio: Stage;
  senha: string;
  encaminhamento: string;
  observacoes: Observacoes[];
  inicioConsulta?: string;
  finalizadoEm?: string;
  tempoAtendimento: TempoAtendimento;
}

export interface Atendimento extends AtendimentoBase {
  id: number;
  criadoEm: string;
}

export type AtendimentoCreate = AtendimentoBase;

export type AtendimentoUpdate = Partial<AtendimentoBase> & {
  id: number;
};

export interface Observacoes {
  texto: string;
  estagio: Stage;
}

export interface TempoAtendimento {
  espera: number;
  consultando: number;
  total: number;
}
