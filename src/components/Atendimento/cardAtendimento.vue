<template>
  <div class="card-atendimento" @click="emit('editar', props.atendimento)">
    <DadosAtendimento :atendimento="props.atendimento" />

    <div>
      <p>Observações:</p>
      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </div>
    <q-btn
      v-if="props.atendimento.estagio === ESTAGIO.triagem"
      label="Enviar para Consulta"
      @click.stop="emit('enviar-consulta', props.atendimento)"
    ></q-btn>
    <q-btn
      v-if="
        props.atendimento.estagio === ESTAGIO.consulta &&
        props.atendimento.status === STATUS.emAndamento
      "
      label="Finalizar Atendimento"
      @click.stop="emit('finalizar-atendimento', props.atendimento)"
    ></q-btn>
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { STATUS, ESTAGIO } from 'src/stores/atendimentoStore';

const props = defineProps<{
  atendimento: Atendimento;
  tipo?: 'dashboard' | 'triagem' | 'consulta' | 'finalizados';
}>();

const emit = defineEmits<{
  (e: 'enviar-consulta', atendimento: Atendimento): void;
  (e: 'finalizar-atendimento', atendimento: Atendimento): void;
  (e: 'editar', atendimento: Atendimento): void;
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
