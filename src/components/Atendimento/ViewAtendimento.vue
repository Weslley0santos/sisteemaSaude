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
      <tempoAtendimento :atendimento="props.atendimento" />
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
        class="w-full sm:w-auto"
        aria-label="Excluir atendimento"
        @click="remover"
      />
    </section>
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

const props = defineProps<{
  atendimento: Atendimento;
}>();

const modal = useModal();
const store = useAtendimentoStore();
const { t } = useI18n();

const editar = () => {
  modal.abrirEdit(props.atendimento);
};

const remover = async () => {
  if (!props.atendimento.id) return;

  await store.removerAtendimento(props.atendimento.id);

  modal.fechar();
};
</script>
