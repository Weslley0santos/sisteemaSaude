<template>
  <div class="p-3 md:p-4 lg:p-6">
    <FormsAtendimento
      ref="formRef"
      :atendimento="props.atendimento"
      modo="edit"
      @salvar="salvarEdicao"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import FormsAtendimento from './FormsAtendimento.vue';

import type { Atendimento } from 'src/types/atendimento';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';

const props = defineProps<{
  atendimento: Atendimento;
}>();

const store = useAtendimentoStore();

const modal = useModal();

const formRef = ref();

const salvarEdicao = async (atendimentoEditado: Atendimento) => {
  await store.atualizarAtendimento(atendimentoEditado);

  modal.fechar();
};

defineExpose({
  salvar: () => formRef.value?.salvar(),
  abrirObs: () => formRef.value?.abrirObs(),
  mostrarObs: computed(() => formRef.value?.mostrarObs?.value),
});
</script>
