<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.patient') }}
      </p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.nome }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.status') }}
      </p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.status }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.password') }}
      </p>

      <p class="mt-1 text-base font-semibold text-primary">
        {{ props.atendimento.senha }}
      </p>
    </div>

    <div class="rounded-xl bg-background p-3 border border-black/5">
      <p class="text-xs font-medium uppercase tracking-wide text-textSecondary">
        {{ t('service.forwarding') }}
      </p>

      <p class="mt-1 text-base font-semibold text-textPrimary">
        {{ props.atendimento.encaminhamento || t('service.notInformed') }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  atendimento: Atendimento;
}>();
</script>

<style lang="scss" scoped></style>
