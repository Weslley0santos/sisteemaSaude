import type { STAGE } from 'src/stores/atendimentoStore';
//interface minima do aatendimento
interface AtendimentoBase {
  nome: string;
  status: string;
  estagio: STAGE;
  senha: string;
  encaminhamento: string;
  observacoes: Observacoes[];
  inicioConsulta?: string;
  finalizadoEm?: string;
  tempoAtendimento: TempoAtendimento;
}
//atendimento completo extendendo os atributos do atendimento base
export interface Atendimento extends AtendimentoBase {
  id: number;
  criadoEm: string;
}
// manipula um atendimento como um tipo create tendo referencia um atendimento base
export type AtendimentoCreate = AtendimentoBase;
// mesma coisa, só que parcialmente, pois não precisamos atualizar todos os atributos para salvar um atendimento
export type AtendimentoUpdate = Partial<AtendimentoBase>;

export interface Observacoes {
  texto: string;
  estagio: STAGE;
}

export interface TempoAtendimento {
  espera: number;
  consultando: number;
  total: number;
}
