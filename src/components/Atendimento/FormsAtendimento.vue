<template>
  <q-form
    ref="formRef"
    class="w-full min-w-[300px] flex flex-col gap-3 sm:gap-4"
    @submit.prevent="salvar"
  >
    <div class="flex flex-col gap-3">
      <q-input
        v-model="atendimento.nome"
        :label="t('service.name')"
        class="w-full"
        lazy-rules
        :rules="[(val) => !!val?.trim() || t('validation.required')]"
      />

      <q-select
        v-model="atendimento.encaminhamento"
        :options="store.encaminhamentoOptions"
        :label="t('service.forwarding')"
        emit-value
        map-options
        class="w-full"
      />
    </div>

    <div class="border border-black/5 rounded-xl p-3 sm:p-4 bg-surface">
      <ObsAtendimento :observacoes="atendimento.observacoes" />

      <q-btn v-if="!mostrarObs" class="mt-3 w-full sm:w-auto bg-green" @click="mostrarObs = true">
        {{ t('button.addNote') }}
      </q-btn>

      <div v-if="mostrarObs" class="mt-3 flex flex-col gap-2">
        <q-input
          v-model="novaObs"
          :label="t('service.observation')"
          type="textarea"
          autogrow
          class="w-full"
        />

        <q-btn class="bg-green w-full sm:w-auto" @click="adicionarObs">
          {{ t('button.saveNote') }}
        </q-btn>
      </div>
    </div>

    <div class="pt-2 flex flex-col sm:flex-row sm:justify-end gap-2">
      <q-btn
        color="primary"
        :label="modo === 'edit' ? t('button.save') : t('button.create')"
        class="w-full sm:w-auto"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ObsAtendimento from './ObsAtendimento.vue';

import type { Atendimento } from 'src/types/atendimento';

import { useAtendimentoStore, STAGE, STATUS } from 'src/stores/atendimentoStore';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useAtendimentoStore();

const formRef = ref();

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
        status: STATUS.inProgress,
        estagio: STAGE.triage,
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

const salvar = async () => {
  const valido = await formRef.value.validate();

  if (!valido) return;

  emit('salvar', { ...atendimento.value });

  atendimento.value = {
    nome: '',
    status: STATUS.inProgress,
    estagio: STAGE.triage,
    senha: gerarSenha(),
    encaminhamento: '',
    observacoes: [],
    criadoEm: new Date().toISOString(),
    tempoAtendimento: {
      espera: 0,
      consultando: 0,
      total: 0,
    },
  };
};
</script>
