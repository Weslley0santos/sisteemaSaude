import api from './api';
import type { Atendimento } from 'src/types/atendimento';

export const AtendimentoService = {
  listar: async () => {
    const { data } = await api.get('/atendimentos');
    return data;
  },

  criar: async (atendimento: Atendimento) => {
    const { data } = await api.post('/atendimentos', atendimento);
    return data;
  },

  atualizar: async (id: number, atendimento: Atendimento) => {
    const { data } = await api.put(`/atendimentos/${id}`, atendimento);
    return data;
  },
  remover: async (id: number) => {
    const { data } = await api.delete(`/atendimentos/${id}`);
    return data;
  },
};
