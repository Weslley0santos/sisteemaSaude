import api from './api';
import type { Atendimento, AtendimentoCreate, AtendimentoUpdate } from 'src/types/atendimento';

export const AtendimentoService = {
  listar: async (): Promise<Atendimento[]> => {
    const { data } = await api.get('/atendimentos');
    return data;
  },

  criar: async (atendimento: AtendimentoCreate): Promise<Atendimento> => {
    const { data } = await api.post('/atendimentos', atendimento);
    return data;
  },

  atualizar: async (id: number, atendimento: AtendimentoUpdate): Promise<Atendimento> => {
    const { data } = await api.patch(`/atendimentos/${id}`, atendimento);
    return data;
  },
  remover: async (id: number): Promise<void> => {
    const { data } = await api.delete(`/atendimentos/${id}`);
    return data;
  },
};
