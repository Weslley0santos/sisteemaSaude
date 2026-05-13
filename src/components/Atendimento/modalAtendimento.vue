<template>
  <q-dialog :model-value="props.modelValue" class="p-20">
    <q-card v-if="props.atendimento">
      <DadosAtendimento :atendimento="props.atendimento" />

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />

      <tempoAtendimento :tempoAtendimento="props.atendimento.tempoAtendimento" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  modelValue: boolean;
  atendimento: Atendimento | null;
}>();
</script>
