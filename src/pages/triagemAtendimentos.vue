<template>
  <h1 class="text-primary font-bold text-3xl">Triagem</h1>
  <cardAtendimento
    v-for="item in store.triagem"
    :key="item.senha"
    :atendimento="item"
    tipo="triagem"
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
