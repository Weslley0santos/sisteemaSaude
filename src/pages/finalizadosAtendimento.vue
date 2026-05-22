<template>
  <div class="w-full min-w-[300px] p-3 sm:p-4 lg:p-6">
    <h1 class="text-primary font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
      {{ t('common.completed') }}
    </h1>

    <div class="flex flex-col gap-3 sm:gap-4">
      <cardAtendimento
        v-for="item in store.concluidos"
        :key="item.id ?? item.senha"
        :atendimento="item"
        tipo="finalizados"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAtendimentoStore();
</script>
