<template>
  <q-form>
    <div class="input-conteiner">
      <q-input v-model="atendimento.nome" :label="t('service.name')" />
    </div>

    <div class="input-conteiner">
      <q-select
        v-model="atendimento.encaminhamento"
        :options="store.encaminhamentoOptions"
        :label="t('service.forwarding')"
        emit-value
        map-options
      />
    </div>

    <ObsAtendimento :observacoes="atendimento.observacoes" />

    <q-btn v-if="!mostrarObs" class="m-2 bg-green-300" @click="mostrarObs = true">
      {{ t('button.addNote') }}
    </q-btn>

    <div v-if="mostrarObs" class="input-conteiner">
      <q-input v-model="novaObs" :label="t('service.observation')" type="textarea" />
    </div>

    <q-btn v-if="mostrarObs" class="m-2 bg-green-300" @click="adicionarObs">
      {{ t('button.saveNote') }}
    </q-btn>

    <q-btn
      :label="modo === 'edit' ? t('button.saveChanges') : t('button.create')"
      @click="salvar"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useAtendimentoStore, ESTAGIO, STATUS } from 'src/stores/atendimentoStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAtendimentoStore();
const props = defineProps<{
  atendimento?: Atendimento;
  modo?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  (e: 'salvar', atendimento: Atendimento): void;
}>();

const gerarSenha = () => {
  const numero = Math.floor(100 + Math.random() * 900);
  return `A-${numero}`;
};

const atendimento = ref<Atendimento>(
  props.atendimento
    ? { ...props.atendimento }
    : {
        nome: '',
        status: STATUS.emAndamento,
        estagio: ESTAGIO.triagem,
        senha: gerarSenha(),
        encaminhamento: '',
        observacoes: [],
        criadoEm: new Date().toISOString(),
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
    criadoEm: '',
    tempoAtendimento: {
      espera: 0,
      consultando: 0,
      total: 0,
    },
  };
};
</script>
