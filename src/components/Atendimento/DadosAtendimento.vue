<template>
  <div class="dados-atendimento">
    <p><strong>Nome:</strong> {{ props.atendimento.nome }}</p>
    <p><strong>Status:</strong> {{ props.atendimento.status }}</p>
    <p><strong>Senha:</strong> {{ props.atendimento.senha }}</p>
    <p><strong>Encaminhamento:</strong> {{ props.atendimento.encaminhamento }}</p>
  </div>
</template>
<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  atendimento: Atendimento;
}>();
</script>

<style lang="scss" scoped></style>
