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

    <div class="input-conteiner">
      <q-input v-model="novaObs" label="Adicionar observação" type="textarea"></q-input>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

const atendimento = {
  nome: '',
  status: STATUS.esperando,
  estagio: ESTAGIO.triagem,
  senha: '',
  encaminhamento: '',
  observacoes: [
    {
      texto: '',
      data: '',
    },
  ],
  tempo: {
    espera: 0,
    atendimento: 0,
    total: 0,
  },
};

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

const novaObs = ref('');

const adicionarObs = () => {
  if (!novaObs.value.trim()) return;

  atendimento.observacoes.push({
    texto: novaObs.value,
    data: new Date(),
    estagio: atendimento.estagio,
  });
};
</script>
