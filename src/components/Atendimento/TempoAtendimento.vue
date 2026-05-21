<template>
  <div class="mt-4">
    <h2 class="text-lg font-semibold mb-2">{{ t('service.time') }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">{{ t('service.waitingTime') }}</p>

        <h3 class="text-xl font-bold text-primary">
          {{ atendimento.tempoAtendimento.espera }} min
        </h3>
      </q-card>

      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">{{ t('service.consultationTime') }}</p>

        <h3 class="text-xl font-bold text-orange">
          {{ atendimento.tempoAtendimento.consultando }} min
        </h3>
      </q-card>

      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">{{ t('service.totalTime') }}</p>

        <h3 class="text-xl font-bold text-green">{{ atendimento.tempoAtendimento.total }} min</h3>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
  atendimento: Atendimento;
}>();
</script>
