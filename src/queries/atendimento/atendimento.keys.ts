export const atendimentoKeys = {
  all: ['atendimentos'] as const,
  lists: () => [...atendimentoKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...atendimentoKeys.lists(), filters] as const,
};
