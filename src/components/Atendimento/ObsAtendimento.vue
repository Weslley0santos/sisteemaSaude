<template>
  <div class="flex flex-col gap-2 sm:gap-3">
    <div
      v-for="(obs, index) in props.observacoes"
      :key="index"
      class="rounded-xl bg-surface p-2 sm:p-3"
    >
      <p class="text-sm sm:text-base text-foreground leading-snug border-l-2 pl-2">
        {{ obs.texto }}
      </p>

      <div class="mt-1">
        <span
          class="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-foreground inline-block"
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
