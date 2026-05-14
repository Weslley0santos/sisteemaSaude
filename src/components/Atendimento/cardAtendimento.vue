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
    <div class="">
      <q-btn
        v-if="props.atendimento.estagio === ESTAGIO.triagem"
        label="Enviar para Consulta"
        @click.stop="emit('enviar-consulta', props.atendimento)"
        class="w-full"
      ></q-btn>
      <q-btn
        v-if="
          props.atendimento.estagio === ESTAGIO.consulta &&
          props.atendimento.status === STATUS.emAndamento
        "
        label="Finalizar Atendimento"
        class="w-full"
        @click.stop="emit('finalizar-atendimento', props.atendimento)"
      ></q-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { STATUS, ESTAGIO } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';

const props = defineProps<{
  atendimento: Atendimento;
  tipo?: 'dashboard' | 'triagem' | 'consulta' | 'finalizados';
}>();

const emit = defineEmits<{
  (e: 'enviar-consulta', atendimento: Atendimento): void;
  (e: 'finalizar-atendimento', atendimento: Atendimento): void;
  (e: 'editar', atendimento: Atendimento): void;
}>();

const modal = useModal();
</script>
