<template>
  <h1 class="text-primary font-bold text-3xl">{{ t('common.completed') }}</h1>
  <cardAtendimento
    v-for="item in store.concluidos"
    :key="item.id ?? item.senha"
    :atendimento="item"
    tipo="finalizados"
  />
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAtendimentoStore();
</script>
