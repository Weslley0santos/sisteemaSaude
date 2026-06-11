import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { AtendimentoService } from 'src/services/atendimentoService';
import { notifyError, notifySuccess } from 'src/helpers/notifyHelper';
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
    mutationFn: (atendimento: AtendimentoCreate) =>
      AtendimentoService.criar({
        ...atendimento,
        criadoEm: atendimento.criadoEm ?? new Date().toISOString(),
      }),
    onSuccess: () => {
      notifySuccess('Atendimento criado com sucesso');
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
    onError: () => {
      notifyError('Erro ao criar atendimento');
    },
  });
}

export function useAtualizarAtendimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, atendimento }: { id: number; atendimento: AtendimentoUpdate }) =>
      AtendimentoService.atualizar(id, atendimento),
    onSuccess: () => {
      notifySuccess('Atendimento atualizado com sucesso');
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
    onError: () => {
      notifyError('Erro ao atualizar atendimento');
    },
  });
}

export function useRemoverAtendimentoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AtendimentoService.remover(id),
    onSuccess: () => {
      notifySuccess('Atendimento removido com sucesso');
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
    onError: () => {
      notifyError('Erro ao remover atendimento');
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
      notifySuccess('Atendimento enviado para consulta');
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
    onError: () => {
      notifyError('Erro ao enviar atendimento para consulta');
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
      notifySuccess('Atendimento finalizado com sucesso');
      void queryClient.invalidateQueries({ queryKey: atendimentoKeys.lists() });
    },
    onError: () => {
      notifyError('Erro ao finalizar atendimento');
    },
  });
}
