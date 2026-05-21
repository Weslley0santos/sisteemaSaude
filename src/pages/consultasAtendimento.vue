<template>
  <h1 class="text-primary font-bold text-3xl">{{ t('common.consultation') }}</h1>
  <cardAtendimento
    v-for="item in store.consulta"
    :key="item.senha"
    :atendimento="item"
    tipo="consulta"
    @finalizar-atendimento="finalizarAtendimento"
  />
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
