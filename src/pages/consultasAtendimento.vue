<template>
  <h1 class="text-primary font-bold text-3xl">Consultas</h1>
  <cardAtendimento
    v-for="item in store.consultaAtiva"
    :key="item.senha"
    :atendimento="item"
    tipo="consulta"
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
