<template>
  <q-form>
    <p></p>
    <div class="input-conteiner">
      <q-input v-model="atendimento.nome" label="Nome do paciente"></q-input>
    </div>

    <div class="input-conteiner">
      <q-select
        v-model="atendimento.encaminhamento"
        :options="encaminhamentoOptions"
        label="Encaminhamento (Opcional)"
      ></q-select>
    </div>

    <div v-for="(novaObs, index) in atendimento.observacoes" :key="index" class="observação-card">
      <p>{{ novaObs.texto }}</p>
      <small>{{ novaObs.estagio }}</small>
    </div>
    <q-btn v-if="!mostrarObs" class="adicionar-obs" @click="mostrarObs = true">
      Adicionar observação
    </q-btn>
    <div v-if="mostrarObs" class="input-conteiner">
      <q-input v-model="novaObs" label="Adicionar observação" type="textarea"></q-input>
    </div>
    <q-btn v-if="mostrarObs" class="salvar-obs" @click="adicionarObs">Salvar Observação</q-btn>
    <q-btn label="Criar Atendimento" @click="criarAtendimento"></q-btn>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['criar-atendimento']);

interface Observacoes {
  texto: string;
  estagio: string;
}
const ESTAGIO = {
  triagem: 'Triagem',
  esperando_consulta: 'Esperando Consulta',
  No_medico: 'No Medico',
};

const STATUS = {
  esperando: 'Esperando',
  consultado: 'Consultando',
  concluido: 'Concluido',
};

const atendimento = ref({
  nome: '',
  status: STATUS.esperando,
  estagio: ESTAGIO.triagem,
  senha: '',
  encaminhamento: '',
  observacoes: [] as Observacoes[],
  tempoAtendimento: {
    espera: 0,
    consultando: 0,
    total: 0,
  },
});

const encaminhamento = {
  clinico_geral: 'clinico_geral',
  cardiologia: 'cardiologia',
  ortopedista: 'ortopedista',
  pediatria: 'pediatria',
};

const encaminhamentoOptions = [
  { label: 'Clinico Geral', value: encaminhamento.clinico_geral },
  { label: 'Cardiologia', value: encaminhamento.cardiologia },
  { label: 'Ortopedista', value: encaminhamento.ortopedista },
  { label: 'Pediatria', value: encaminhamento.pediatria },
];

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

const criarAtendimento = () => {
  emit('criar-atendimento', {
    ...atendimento.value,
  });
  atendimento.value.nome = '';
  atendimento.value.encaminhamento = '';
  atendimento.value.observacoes = [];
  atendimento.value.senha = '';
};
</script>
<style scoped lang="scss">
.adicionar-obs {
  margin: 15px;
  padding: 10px;
  background-color: aqua;
}

.salvar-obs {
  margin: 15px;
  padding: 10px;
  background-color: aqua;
}
</style>
