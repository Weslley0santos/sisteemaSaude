<template>
  <q-page>
    <div class="p-5 flex">
      <h1 class="text-primary font-bold text-3xl m-5">Dashboard</h1>

      <q-btn label="Novo Atendimento" @click="mostrarFormulario = true"></q-btn>
    </div>
    <div class="m-1">
      <FormsAtendimento
        v-if="mostrarFormulario"
        @criar-atendimento="adicionarAtendimento"
        class="bg-slate-100 p-2 rounded-md m-2"
      />

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
import { ref } from 'vue';
import FormsAtendimento from 'src/components/Atendimento/FormsAtendimento.vue';
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';

const store = useAtendimentoStore();
const mostrarFormulario = ref(false);
const atendimentos = ref<Atendimento[]>([]);

const adicionarAtendimento = (novoAtendimento: Atendimento) => {
  atendimentos.value.push(novoAtendimento);

  mostrarFormulario.value = false;
};
</script>
