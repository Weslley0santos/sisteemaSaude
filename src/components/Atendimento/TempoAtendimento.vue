<template>
  <div class="mt-4">
    <h2 class="text-lg font-semibold mb-2">Tempo de Atendimento</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- ESPERA -->
      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">Espera</p>

        <h3 class="text-xl font-bold text-primary">
          {{ atendimento.tempoAtendimento.espera }} min
        </h3>
      </q-card>

      <!-- CONSULTA -->
      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">Consulta</p>

        <h3 class="text-xl font-bold text-orange">
          {{ atendimento.tempoAtendimento.consultando }} min
        </h3>
      </q-card>

      <!-- TOTAL -->
      <q-card flat bordered class="p-3">
        <p class="text-sm text-gray-500">Total</p>

        <h3 class="text-xl font-bold text-green">{{ atendimento.tempoAtendimento.total }} min</h3>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

defineProps<{
  atendimento: Atendimento;
}>();
</script>
