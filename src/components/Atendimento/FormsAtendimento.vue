<template>
  <q-form
    ref="formRef"
    class="w-full min-w-[300px] h-[70vh] flex flex-col overflow-hidden bg-yellow"
    @submit.prevent="salvar"
  >
    <div class="flex-1 p-1">
      <div class="flex flex-col gap-3 text-textPrimary bg-slate-500 p-4 rounded-xl">
        <q-input
          v-model="atendimento.nome"
          :label="t('service.name')"
          class="w-full"
          lazy-rules
          :rules="[(val) => !!val?.trim() || t('validation.required')]"
        />

        <q-select
          v-model="atendimento.encaminhamento"
          :options="encaminhamentoOptions"
          :label="t('service.forwarding')"
          emit-value
          map-options
          class="w-full"
        />

        <!-- INPUT OBS -->
        <div v-if="mostrarObs" class="mt-2">
          <q-input
            v-model="novaObs"
            :label="t('service.observation')"
            type="textarea"
            autogrow
            class="w-full"
          />
        </div>

        <!-- LISTA OBS -->
        <ObsAtendimento :observacoes="atendimento.observacoes" class="bg-red rounded-xl" />
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <!-- ESQUERDA -->

          <!-- DIREITA -->
          <div class="flex flex-col sm:flex-row gap-2 sm:ml-auto">
            <q-btn
              v-if="mostrarObs"
              flat
              :label="t('common.cancel')"
              color="white"
              class="bg-red"
              @click="mostrarObs = false"
            />

            <q-btn
              v-if="mostrarObs"
              color="blue"
              :label="t('button.saveNote')"
              @click="adicionarObs"
            />
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import ObsAtendimento from './ObsAtendimento.vue';

import type { Atendimento } from 'src/types/atendimento';

import { REFERRAL, STAGE, STATUS } from 'src/stores/atendimentoStore';

import { useI18n } from 'vue-i18n';

const props = defineProps<{
  atendimento?: Atendimento;
  modo?: 'create' | 'edit';
}>();

const emit = defineEmits<{
  (e: 'salvar', atendimento: Atendimento): void;
}>();

const { t } = useI18n();
const formRef = ref();
const mostrarObs = ref(false);
const novaObs = ref('');

const encaminhamentoOptions = computed(() => [
  {
    label: t('referral.general_clinic'),
    value: REFERRAL.GENERAL_CLINIC,
  },

  {
    label: t('referral.cardiology'),
    value: REFERRAL.CARDIOLOGY,
  },

  {
    label: t('referral.orthopedics'),
    value: REFERRAL.ORTHOPEDICS,
  },

  {
    label: t('referral.pediatrics'),
    value: REFERRAL.PEDIATRICS,
  },
]);

const gerarSenha = () => {
  const numero = Math.floor(100 + Math.random() * 900);

  return `A-${numero}`;
};

const atendimento = ref<Atendimento>(
  props.atendimento
    ? { ...props.atendimento }
    : {
        nome: '',
        status: STATUS.IN_PROGRESS,
        estagio: STAGE.TRIAGE,
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
    status: STATUS.IN_PROGRESS,
    estagio: STAGE.TRIAGE,
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

const abrirObs = () => {
  mostrarObs.value = true;
};

defineExpose({
  abrirObs,
  adicionarObs,
  salvar,
  mostrarObs,
});
</script>
