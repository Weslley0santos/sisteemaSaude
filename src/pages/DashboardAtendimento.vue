<template>
  <q-page>
    <div class="p-5 flex">
      <h1 class="text-primary font-bold text-3xl m-5">Atendimentos</h1>
    </div>
    <div class="m-1">
      <cardAtendimento
        v-for="item in store.atendimentos"
        :key="item.senha"
        :atendimento="item"
        tipo="dashboard"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';

const store = useAtendimentoStore();
</script>
