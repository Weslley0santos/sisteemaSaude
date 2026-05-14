<template>
  <div class="grid grid-cols-2">
    <p class="border-l-4 border-secondary p-1 mb-1">Nome: {{ props.atendimento.nome }}</p>
    <p class="border-l-4 border-secondary p-1 mb-1">Status: {{ props.atendimento.status }}</p>
    <p class="border-l-4 border-secondary p-1 mb-1">Senha: {{ props.atendimento.senha }}</p>
    <p class="border-l-4 border-secondary p-1 mb-1">
      Encaminhamento: {{ props.atendimento.encaminhamento }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  atendimento: Atendimento;
}>();
</script>

<style lang="scss" scoped></style>
