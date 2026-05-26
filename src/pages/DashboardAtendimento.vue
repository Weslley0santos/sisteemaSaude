<template>
  <q-page class="p-3 md:p-4 lg:p-6 bg-background">
    <div class="mb-3 md:mb-4">
      <h1 class="text-xl md:text-2xl font-bold text-text-primary">
        {{ t('dashboard.title') }}
      </h1>
    </div>
    <DashboardCards :rows="atendimentosFiltrados" />

    <DashboardAnalytics
      :dataSelecionada="dataSelecionada"
      @update:dataSelecionada="dataSelecionada = $event"
    />
    <DashboardTabs :tab="tab" @update:tab="tab = $event" />
    <DashboardTable
      :rows="atendimentosFiltrados"
      :tab="tab"
      @abrir-atendimento="abrirAtendimento"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';
import type { Atendimento } from 'src/types/atendimento';

import DashboardCards from 'src/components/Dashboard/DashboardCards.vue';
import DashboardAnalytics from 'src/components/Dashboard/DashboardAnalytics.vue';
import DashboardTable from 'src/components/Dashboard/DashboardTable.vue';
import DashboardTabs from 'src/components/Dashboard/DashboardTabs.vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useAtendimentoStore();
const modal = useModal();
const tab = ref('todos');
const dataSelecionada = ref('');

const atendimentosFiltrados = computed(() => {
  let dados: Atendimento[] = [];

  if (tab.value === 'todos') {
    dados = store.atendimentos;
  }

  if (tab.value === 'triagem') {
    dados = store.triagem;
  }

  if (tab.value === 'consulta') {
    dados = store.consulta;
  }

  if (tab.value === 'finalizados') {
    dados = store.concluidos;
  }

  if (dataSelecionada.value) {
    const dataFormatada = dataSelecionada.value.replaceAll('/', '-');

    dados = dados.filter((a) => a.criadoEm?.startsWith(dataFormatada));
  }

  return dados;
});

const abrirAtendimento = (atendimento: Atendimento) => {
  modal.abrirView(atendimento);
};
console.log(store.atendimentos.map((a) => a.estagio));
onMounted(async () => {
  await store.carregarAtendimentos();
});
</script>
