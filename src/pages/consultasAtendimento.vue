<template>
  <p>Consultas</p>
  <cardAtendimento
    v-for="item in store.consulta"
    :key="item.senha"
    :atendimento="item"
    @finalizar-atendimento="finalizarAtendimento"
  />
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
const store = useAtendimentoStore();

const finalizarAtendimento = (atendimento: Atendimento) => {
  store.finalizarAtendimento(atendimento.senha);
};
</script>
