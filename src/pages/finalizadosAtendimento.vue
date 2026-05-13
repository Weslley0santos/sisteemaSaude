<template>
  <p>Finalizados</p>
  <cardAtendimento
    v-for="item in store.concluidos"
    :key="item.senha"
    :atendimento="item"
    tipo="finalizados"
  />
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
const store = useAtendimentoStore();
</script>
