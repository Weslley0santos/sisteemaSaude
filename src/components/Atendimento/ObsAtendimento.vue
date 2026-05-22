<template>
  <div class="flex flex-col gap-2 sm:gap-3">
    <div
      v-for="(obs, index) in props.observacoes"
      :key="index"
      class="rounded-xl border border-black/5 bg-background p-2 sm:p-3"
    >
      <p class="text-sm sm:text-base text-textPrimary leading-snug">
        {{ obs.texto }}
      </p>

      <div class="mt-1">
        <span
          class="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary inline-block"
        >
          {{ obs.estagio }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Observacoes } from 'src/types/atendimento';

const props = defineProps<{
  observacoes: Observacoes[];
}>();
</script>
