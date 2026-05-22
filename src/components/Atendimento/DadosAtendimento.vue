<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
    <div class="rounded-xl bg-background p-2 md:p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.patient') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-textPrimary">
        {{ props.atendimento.nome }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-2 md:p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.status') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-textPrimary">
        {{ props.atendimento.status }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-2 md:p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.password') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-primary">
        {{ props.atendimento.senha }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-2 md:p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.forwarding') }}
      </p>

      <p class="mt-1 text-sm md:text-base font-semibold text-textPrimary">
        {{ props.atendimento.encaminhamento || t('service.notInformed') }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  atendimento: Atendimento;
}>();
const { t } = useI18n();
</script>
