<template>
  <div class="grid gap-4">
    <DadosAtendimento :atendimento="props.atendimento" />

    <div v-if="atendimento.observacoes?.length">
      <p class="font-semibold mb-2">Observações</p>

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </div>
    <div>
      <tempoAtendimento :tempoAtendimento="props.atendimento.tempoAtendimento" />
    </div>
    <div class="flex justify-end">
      <q-btn color="primary" label="Editar" @click="editar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';
import { useModal } from 'src/composable/useModal';

import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';

const props = defineProps<{
  atendimento: Atendimento;
}>();

const modal = useModal();

const editar = () => {
  modal.abrirEdit(props.atendimento);
};
</script>
