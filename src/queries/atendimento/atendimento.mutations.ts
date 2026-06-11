import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AtendimentoService } from 'src/services/atendimentoService';
import {
  calcularConsulta,
  calcularEspera,
  calcularTotal,
} from 'src/helpers/tempoAtendimentoHelper';
import type { Atendimento, AtendimentoCreate, AtendimentoUpdate } from 'src/types/atendimento';
import { STAGE, STATUS } from 'src/types/enums/atendimentoEnums';
import { atendimentoKeys } from './atendimento.keys';

export function useCriarAtendimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (atendimento: AtendimentoCreate) => AtendimentoService.criar(atendimento),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
  });
}

export function useAtualizarAtendimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, atendimento }: { id: number; atendimento: AtendimentoUpdate }) =>
      AtendimentoService.atualizar(id, atendimento),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
  });
}

export function useRemoverAtendimentoMutation() {
  // exporta a função removerAtendimento
  const queryClient = useQueryClient(); // da aceso a cache

  return useMutation({
    // retorna o mutation
    mutationFn: (id: number) => AtendimentoService.remover(id), // chama a função remover atendimento no service
    onSuccess: () => {
      //se sucesso
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() }); // avisa que a lista de atendimentos esta desatualizada
    },
  });
}

export function useAvancarParaConsultaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (atendimento: Atendimento) => {
      const inicioConsulta = new Date().toISOString();

      return AtendimentoService.atualizar(atendimento.id, {
        estagio: STAGE.CONSULTATION,
        inicioConsulta,
        tempoAtendimento: {
          ...atendimento.tempoAtendimento,
          espera: calcularEspera(atendimento, inicioConsulta),
        },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
  });
}

export function useFinalizarAtendimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (atendimento: Atendimento) => {
      const finalizadoEm = new Date().toISOString();
      const consultando = calcularConsulta(atendimento.inicioConsulta || '', finalizadoEm);

      return AtendimentoService.atualizar(atendimento.id, {
        status: STATUS.COMPLETED,
        finalizadoEm,
        tempoAtendimento: {
          ...atendimento.tempoAtendimento,
          consultando,
          total: calcularTotal(atendimento.tempoAtendimento.espera, consultando),
        },
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
  });
}
