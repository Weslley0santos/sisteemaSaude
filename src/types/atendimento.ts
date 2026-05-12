export interface Atendimento {
  nome: string;
  status: string;
  estagio: string;
  senha: string;
  encaminhamento: string;
  observacoes: Observacoes[];
  tempoAtendimento: TempoAtendimento;
}

export interface Observacoes {
  texto: string;
  estagio: string;
}

export interface TempoAtendimento {
  espera: number;
  consultando: number;
  total: number;
}
