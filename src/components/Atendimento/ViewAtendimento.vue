<template>
  <div class="grid gap-4">
    <DadosAtendimento :atendimento="props.atendimento" />

    <div v-if="atendimento.observacoes?.length">
      <p class="font-semibold mb-2">{{ t('service.observation') }}</p>

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </div>
    <div>
      <tempoAtendimento :atendimento="props.atendimento" />
    </div>
    <div class="flex justify-end">
      <q-btn color="primary" :label="t('button.edit')" @click="editar" />
      <q-btn icon="delete" color="negative" flat @click="remover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

import { useModal } from 'src/composable/useModal';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';

import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
  atendimento: Atendimento;
}>();

const modal = useModal();
const store = useAtendimentoStore();

const editar = () => {
  modal.abrirEdit(props.atendimento);
};

const remover = async () => {
  if (!props.atendimento.id) return;

  await store.removerAtendimento(props.atendimento.id);

  modal.fechar();
};
</script>
