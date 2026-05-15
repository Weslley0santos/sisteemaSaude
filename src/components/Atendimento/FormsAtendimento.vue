<template>
  <q-form>
    <p></p>
    <div class="input-conteiner">
      <q-input v-model="atendimento.nome" label="Nome do paciente"></q-input>
    </div>

    <div class="input-conteiner">
      <q-select
        v-model="atendimento.encaminhamento"
        :options="store.encaminhamentoOptions"
        label="Encaminhamento (Opcional)"
        emit-value
        map-options
      />
    </div>

    <ObsAtendimento :observacoes="atendimento.observacoes" />
    <q-btn v-if="!mostrarObs" class="m-2 bg-green-300" @click="mostrarObs = true">
      Adicionar observação
    </q-btn>
    <div v-if="mostrarObs" class="input-conteiner">
      <q-input v-model="novaObs" label="Adicionar observação" type="textarea"></q-input>
    </div>
    <q-btn v-if="mostrarObs" class="m-2 bg-green-300" @click="adicionarObs"
      >Salvar Observação</q-btn
    >
    <q-btn :label="modo === 'edit' ? 'Salvar Alterações' : 'Criar Atendimento'" @click="salvar" />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useAtendimentoStore, ESTAGIO, STATUS } from 'src/stores/atendimentoStore';

const store = useAtendimentoStore();
const props = defineProps<{
  atendimento?: Atendimento;
  modo?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  (e: 'salvar', atendimento: Atendimento): void;
}>();

const atendimento = ref<Atendimento>(
  props.atendimento
    ? { ...props.atendimento }
    : {
        nome: '',
        status: STATUS.emAndamento,
        estagio: ESTAGIO.triagem,
        senha: '',
        encaminhamento: '',
        observacoes: [],
        tempoAtendimento: {
          espera: 0,
          consultando: 0,
          total: 0,
        },
      },
);

const mostrarObs = ref(false);
const novaObs = ref('');

const adicionarObs = () => {
  if (!novaObs.value.trim()) return;

  atendimento.value.observacoes.push({
    texto: novaObs.value,
    estagio: atendimento.value.estagio,
  });
  novaObs.value = '';
  mostrarObs.value = false;
};

const salvar = () => {
  emit('salvar', { ...atendimento.value });
  atendimento.value = {
    nome: '',
    status: STATUS.emAndamento,
    estagio: ESTAGIO.triagem,
    senha: '',
    encaminhamento: '',
    observacoes: [],
    tempoAtendimento: {
      espera: 0,
      consultando: 0,
      total: 0,
    },
  };
};
</script>
<style scoped lang="scss"></style>
