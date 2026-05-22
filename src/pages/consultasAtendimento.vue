<template>
  <div class="w-full min-w-[300px] p-3 sm:p-4 lg:p-6">
    <h1 class="text-primary font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
      {{ t('common.consultation') }}
    </h1>

    <div class="flex flex-col gap-3 sm:gap-4">
      <cardAtendimento
        v-for="item in store.consulta"
        :key="item.senha"
        :atendimento="item"
        tipo="consulta"
        @finalizar-atendimento="finalizarAtendimento"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAtendimentoStore();

const finalizarAtendimento = async (atendimento: Atendimento) => {
  if (!atendimento.id) return;

  await store.finalizarAtendimento(atendimento.id);
};
</script>
