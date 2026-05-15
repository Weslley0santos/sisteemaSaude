<template>
  <div
    class="bg-primary rounded-xl p-3 grid m-2 gap-4 shadow-md cursor-pointer"
    @click="modal.abrirView(props.atendimento)"
  >
    <div><DadosAtendimento :atendimento="props.atendimento" /></div>

    <div v-if="props.atendimento.observacoes?.length">
      <p class="font-semibold">Observações:</p>
      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </div>
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useModal } from 'src/composable/useModal';

const props = defineProps<{
  atendimento: Atendimento;
  tipo?: 'dashboard' | 'triagem' | 'consulta' | 'finalizados';
}>();

const modal = useModal();
</script>
