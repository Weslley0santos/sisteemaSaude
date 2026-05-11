<template>
  <div class="card-atendimento">
    <DadosAtendimento :atendimento="props.atendimento" />
    <TempoAtendimento :tempoAtendimento="props.atendimento.tempoAtendimento" />
    <ObsAtendimento />
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';

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

const props = defineProps<{
  atendimento: Atendimento;
  observacoes: Observacoes;
}>();
</script>

<style lang="scss" scoped>
.card-atendimento {
  background-color: #64e264;
  border-radius: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5px;
  font-size: 15px;
}
</style>
