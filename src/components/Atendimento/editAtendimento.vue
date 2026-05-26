<template>
  <div class="p-3 md:p-4 lg:p-6">
    <h2 class="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-textPrimary">
      {{ t('button.edit') }}
    </h2>

    <div>
      <FormsAtendimento :atendimento="props.atendimento" modo="edit" @salvar="salvarEdicao" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormsAtendimento from './FormsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';

import { useI18n } from 'vue-i18n';

const props = defineProps<{
  atendimento: Atendimento;
}>();
const { t } = useI18n();
const store = useAtendimentoStore();

const modal = useModal();

const salvarEdicao = async (atendimentoEditado: Atendimento) => {
  await store.atualizarAtendimento(atendimentoEditado);
  modal.fechar();
};
</script>
