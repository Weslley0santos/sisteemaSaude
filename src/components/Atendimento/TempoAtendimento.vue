<template>
  <div class="mt-4">
    <h2 class="text-base md:text-lg font-semibold mb-2">
      {{ t('service.time') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
      <q-card flat bordered class="p-2 sm:p-3">
        <p class="text-xs sm:text-sm text-textSecondary">
          {{ t('service.waitingTime') }}
        </p>

        <h3 class="text-lg sm:text-xl font-bold text-primary">
          {{ atendimento.tempoAtendimento.espera }} min
        </h3>
      </q-card>

      <q-card flat bordered class="p-2 sm:p-3">
        <p class="text-xs sm:text-sm text-textSecondary">
          {{ t('service.consultationTime') }}
        </p>

        <h3 class="text-lg sm:text-xl font-bold text-orange">
          {{ atendimento.tempoAtendimento.consultando }} min
        </h3>
      </q-card>

      <q-card flat bordered class="p-2 sm:p-3">
        <p class="text-xs sm:text-sm text-textSecondary">
          {{ t('service.totalTime') }}
        </p>

        <h3 class="text-lg sm:text-xl font-bold text-green">
          {{ atendimento.tempoAtendimento.total }} min
        </h3>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';
import { useI18n } from 'vue-i18n';

defineProps<{
  atendimento: Atendimento;
}>();

const { t } = useI18n();
</script>
