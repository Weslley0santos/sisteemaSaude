<template>
  <h1 class="text-primary font-bold text-3xl">Finalizados</h1>
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
