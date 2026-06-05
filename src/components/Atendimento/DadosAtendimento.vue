<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
    <div class="rounded-xl p-2 md:p-3 bg-surface">
      <p class="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
        {{ $t('service.patient') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-foreground">
        {{ props.atendimento.nome }}
      </p>
    </div>

    <div class="rounded-xl p-2 md:p-3 bg-surface">
      <p class="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
        {{ $t('service.status') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-foreground">
        {{ $t(`status.${props.atendimento.status}`) }}
      </p>
    </div>

    <div class="rounded-xl p-2 md:p-3 bg-surface">
      <p class="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
        {{ $t('service.password') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-foreground">
        {{ props.atendimento.senha }}
      </p>
    </div>

    <div class="rounded-xl p-2 md:p-3 bg-surface">
      <p class="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
        {{ $t('service.forwarding') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-foreground">
        {{
          props.atendimento.encaminhamento
            ? $t(`referral.${props.atendimento.encaminhamento}`)
            : $t('service.notInformed')
        }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  atendimento: Atendimento;
}>();
console.log(props.atendimento.encaminhamento);
</script>
