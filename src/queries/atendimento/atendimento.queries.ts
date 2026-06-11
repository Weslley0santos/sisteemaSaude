import { useQuery } from '@tanstack/vue-query';
import { AtendimentoService } from 'src/services/atendimentoService';
import { atendimentoKeys } from './atendimento.keys';

export function useAtendimentosQuery() {
  return useQuery({
    queryKey: atendimentoKeys.lists(),
    queryFn: AtendimentoService.listar,
  });
}
