<template>
  <q-page class="p-4">

    <div class="mb-4">
      <h1 class="text-2xl font-bold text-primary">
        Dashboard
      </h1>
    </div>

    <DashboardCards />

    <DashboardAnalytics
      :dataSelecionada="dataSelecionada"
      @update:dataSelecionada="
        dataSelecionada = $event
      "
    />

    <DashboardTabs
      :tab="tab"
      @update:tab="tab = $event"
    />

    <DashboardTable
      :rows="atendimentosFiltrados"
      @abrir-atendimento="abrirAtendimento"
    />

  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';

import type { Atendimento } from 'src/types/atendimento';

import DashboardCards from 'src/components/Dashboard/DashboardCards.vue';
import DashboardAnalytics from 'src/components/Dashboard/DashboardAnalytics.vue';
import DashboardTable from 'src/components/Dashboard/DashboardTable.vue';
import DashboardTabs from 'src/components/Dashboard/DashboardTabs.vue';

const store = useAtendimentoStore();

const modal = useModal();

const tab = ref('todos');

const dataSelecionada = ref('');

const atendimentosFiltrados = computed(() => {
  if (tab.value === 'todos') {
    return store.atendimentos;
  }

  if (tab.value === 'finalizados') {
    return store.concluidos;
  }

  return store.atendimentos.filter(
    (atendimento) =>
      atendimento.estagio.toLowerCase() === tab.value
  );
});

const abrirAtendimento = (
  atendimento: Atendimento
) => {
  modal.abrirView(atendimento);
};
</script>