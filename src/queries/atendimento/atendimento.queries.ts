import { useQuery } from '@tanstack/vue-query';
import { AtendimentoService } from 'src/services/atendimentoService';
import { atendimentoKeys } from './atendimento.keys';

export function useAtendimentosQuery() {
  return useQuery({
    queryKey: atendimentoKeys.lists(),
    queryFn: AtendimentoService.listar,
    retry: 1,
    staleTime: 1000 * 60 * 3,

    //refetchInterval:  1000 * 60 * 3, para atualizar automaticamente, ideal pra mais de um usuario simultaneo
  });
}
