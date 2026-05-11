<template>
  <div class="dados-atendimento">
    <p>Nome: {{ props.atendimento.nome }}</p>
    <p>Status: {{ props.atendimento.status }}</p>
    <p>Senha {{ props.atendimento.senha }}</p>
    <p>Encaminhamento {{ props.atendimento.encaminhamento }}</p>
  </div>
</template>
<script setup lang="ts">
interface Atendimento {
  nome: string;
  status: string;
  estagio: string;
  senha: string;
  encaminhamento: string;
}

const props = defineProps<{
  atendimento: Atendimento;
}>();
</script>

<style lang="scss" scoped></style>
