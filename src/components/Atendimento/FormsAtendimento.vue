<template>
  <q-form ref="formRef" class="w-full min-w-[300px] flex flex-col bg-surface" @submit="salvar">
    <div class="flex-1 p-1">
      <div class="flex flex-col gap-3 text-foreground bg-background p-4 rounded-xl">
        <q-input
          v-model="formData.nome"
          :label="t('service.name')"
          class="w-full"
          lazy-rules
          :rules="[(val) => !!val?.trim() || t('validation.required')]"
        />

        <q-select
          v-model="formData.encaminhamento"
          :options="encaminhamentoOptions"
          :label="t('service.forwarding')"
          emit-value
          map-options
          class="w-full"
          outlined
          popup-content-class="bg-surface text-foreground"
        />

        <q-btn color="accent" icon="add" :label="t('button.addNote')" @click="abrirObs" />

        <ModalObservaoes ref="modalObsRef" @salvar="adicionarObs" />
        <ObsAtendimento :observacoes="formData.observacoes" class="rounded-xl w-full" />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ModalObservaoes from './ModalObservaoes.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento, AtendimentoCreate } from 'src/types/atendimento';
import { REFERRAL, STAGE, STATUS } from 'src/types/enums/atendimentoEnums';
import { useI18n } from 'vue-i18n';
import { gerarSenha } from 'src/utils/gerarSenhaUtils';

defineOptions({
  name: 'FormsAtendimento',
});

const props = defineProps<{
  atendimento?: Atendimento;
}>();

const emit = defineEmits<{
  (e: 'salvar', atendimento: AtendimentoCreate): void;
}>();

const { t } = useI18n();

const formRef = ref();
const modalObsRef = ref();

const criarAtendimentoInicial = (): AtendimentoCreate => ({
  nome: '',
  status: STATUS.IN_PROGRESS,
  estagio: STAGE.TRIAGE,
  senha: gerarSenha(),
  encaminhamento: '',
  observacoes: [],
  tempoAtendimento: {
    espera: 0,
    consultando: 0,
    total: 0,
  },
});

const formData = ref<AtendimentoCreate>(criarAtendimentoInicial());

watch(
  () => props.atendimento,
  (newValue) => {
    if (newValue) {
      formData.value = { ...newValue };
    }
  },
  { immediate: true },
);

const encaminhamentoOptions = computed(() => [
  { label: t('referral.general_clinic'), value: REFERRAL.GENERAL_CLINIC },
  { label: t('referral.cardiology'), value: REFERRAL.CARDIOLOGY },
  { label: t('referral.orthopedics'), value: REFERRAL.ORTHOPEDICS },
  { label: t('referral.pediatrics'), value: REFERRAL.PEDIATRICS },
]);

const abrirObs = () => {
  modalObsRef.value?.abrir();
};

const adicionarObs = (texto: string) => {
  formData.value.observacoes.push({
    texto,
    estagio: formData.value.estagio,
  });
};

const salvar = async () => {
  const valido = await formRef.value.validate();

  if (!valido) return;

  emit('salvar', { ...formData.value });

  formData.value = criarAtendimentoInicial();
};

defineExpose({
  abrirObs,
  salvar,
});
</script>
