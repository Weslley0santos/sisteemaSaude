<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">Paciente</p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.nome }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">Status</p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.status }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">Senha</p>

      <p class="mt-1 text-base font-semibold text-primary">
        {{ props.atendimento.senha }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">Encaminhamento</p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.encaminhamento || 'Não informado' }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  atendimento: Atendimento;
}>();
</script>

<style lang="scss" scoped></style>
