<template>
  <p>triagem</p>
  <cardAtendimento
    v-for="item in store.triagem"
    :key="item.senha"
    :atendimento="item"
    @enviar-consulta="enviarParaConsulta"
  />
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
const store = useAtendimentoStore();

const enviarParaConsulta = (atendimento: Atendimento) => {
  store.avancarParaConsulta(atendimento.senha);
};
</script>
