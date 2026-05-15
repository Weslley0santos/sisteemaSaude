<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Editar Atendimento</h2>

    <FormsAtendimento :atendimento="props.atendimento" modo="edit" @salvar="salvarEdicao" />
  </div>
</template>

<script setup lang="ts">
import FormsAtendimento from './FormsAtendimento.vue';

import type { Atendimento } from 'src/types/atendimento';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';

import { useModal } from 'src/composable/useModal';

const props = defineProps<{
  atendimento: Atendimento;
}>();

const store = useAtendimentoStore();

const modal = useModal();

const salvarEdicao = (atendimentoEditado: Atendimento) => {
  store.atualizarAtendimento(atendimentoEditado);

  modal.fechar();
};
</script>
