<template>
  <q-page>
    <div class="topo-pag">
      <h1 class="titulo"><strong>Em Atendimento </strong></h1>

      <q-btn label="Novo Atendimento" @click="mostrarFormulario = true"></q-btn>
    </div>
    <div class="container">
      <FormsAtendimento v-if="mostrarFormulario" @criar-atendimento="adicionarAtendimento" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormsAtendimento from 'src/components/Atendimento/FormsAtendimento.vue';
//import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';

interface Atendimento {
  nome: string;
  status: string;
  estagio: string;
  senha: string;
  encaminhamento: string;
  observacoes: Observacoes;
  tempoAtendimento: TempoAtendimento;
}

interface Observacoes {
  texto: string;
  estagio: string;
}

interface TempoAtendimento {
  espera: number;
  consultando: number;
  total: number;
}

const mostrarFormulario = ref(false);
const atendimentos = ref<Atendimento[]>([]);

const adicionarAtendimento = (novoAtendimento: Atendimento) => {
  atendimentos.value.push(novoAtendimento);

  mostrarFormulario.value = false;
};
</script>
<style lang="scss" scoped>
.titulo {
  color: rgb(0, 139, 7);
  text-align: center;
  margin: 10px;
  font-size: 32px;
}

.container {
  padding: 20px;
}

.topo-pag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
