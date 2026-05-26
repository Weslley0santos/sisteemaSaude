<template>
  <div class="flex flex-col gap-3 sm:gap-4 w-full min-w-[300px]">
    <section>
      <DadosAtendimento :atendimento="props.atendimento" />
    </section>

    <section v-if="props.atendimento.observacoes?.length">
      <p class="text-sm sm:text-base font-semibold mb-2">
        {{ t('service.observation') }}
      </p>

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </section>

    <section>
      <TempoAtendimento :atendimento="props.atendimento" />
    </section>

    <section class="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
      <q-btn
        color="primary"
        :label="t('button.edit')"
        class="w-full sm:w-auto"
        aria-label="Editar atendimento"
        @click="editar"
      />

      <q-btn
        icon="delete"
        color="negative"
        flat
        type="button"
        class="w-full sm:w-auto bg-primary border-4 border-border"
        aria-label="Excluir atendimento"
        @click.stop.prevent="abrirConfirmacao"
      />
    </section>

    <ConfirmDelete v-model="confirmarDelete" @confirmar="remover" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Atendimento } from 'src/types/atendimento';

import { useModal } from 'src/composable/useModal';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';

import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';
import ConfirmDelete from './ConfirmDelete.vue';

import { useI18n } from 'vue-i18n';

const props = defineProps<{
  atendimento: Atendimento;
}>();

const { t } = useI18n();
const modal = useModal();
const store = useAtendimentoStore();
const confirmarDelete = ref(false);

const editar = () => {
  modal.abrirEdit(props.atendimento);
};

const abrirConfirmacao = () => {
  confirmarDelete.value = true;
};

const remover = async () => {
  if (!props.atendimento.id) return;

  await store.removerAtendimento(props.atendimento.id);

  confirmarDelete.value = false;

  modal.fechar();
};
</script>
