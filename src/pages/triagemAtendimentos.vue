<template>
  <div class="p-3 md:p-4 lg:p-6">
    <!-- Título -->
    <h1 class="text-primary font-bold text-xl md:text-2xl lg:text-3xl mb-4">
      {{ t('common.triage') }}
    </h1>

    <!-- Lista -->
    <div class="flex flex-col gap-3">
      <cardAtendimento
        v-for="item in store.triagem"
        :key="item.senha"
        :atendimento="item"
        tipo="triagem"
        @enviar-consulta="enviarParaConsulta"
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

const enviarParaConsulta = async (atendimento: Atendimento) => {
  if (!atendimento.id) return;

  await store.avancarParaConsulta(atendimento.id);
};
</script>
