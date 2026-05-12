<template>
  <div>
    <div v-for="(obs, index) in props.observacoes" :key="index">
      <p>{{ obs.texto }}</p>
      <small>{{ obs.estagio }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Observacoes } from 'src/types/atendimento';

const props = defineProps<{
  observacoes: Observacoes[];
}>();
</script>
