<template>
  <q-page class="p-3 md:p-4 lg:p-6 bg-background">
    <div class="mb-3 md:mb-4">
      <h1 class="text-xl md:text-2xl font-bold text-text-primary">
        {{ $t('dashboard.title') }}
      </h1>
    </div>
    <DashboardCards :rows="atendimentosFiltrados" />

    <DashboardAnalytics
      :rows="atendimentos"
      :dataSelecionada="dataSelecionada"
      @update:dataSelecionada="dataSelecionada = $event"
    />
    <DashboardTable :rows="atendimentosFiltrados" @abrir-atendimento="abrirAtendimento" />
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModal } from 'src/composable/useModal';
import type { Atendimento } from 'src/types/atendimento';
import DashboardCards from 'src/components/Dashboard/DashboardCards.vue';
import DashboardAnalytics from 'src/components/Dashboard/DashboardAnalytics.vue';
import DashboardTable from 'src/components/Dashboard/DashboardTable.vue';
import { useAtendimentosQuery } from 'src/queries/atendimento/atendimento.queries';

defineOptions({
  name: 'DashboardAtendimento',
});

const modal = useModal();
const dataSelecionada = ref('');
const { data } = useAtendimentosQuery();

const atendimentos = computed(() => data.value ?? []);

const atendimentosFiltrados = computed(() => {
  let dados: Atendimento[] = atendimentos.value;

  if (dataSelecionada.value) {
    const dataFormatada = dataSelecionada.value.replaceAll('/', '-');

    dados = dados.filter((a) => a.criadoEm?.startsWith(dataFormatada));
  }

  return dados;
});

const abrirAtendimento = (atendimento: Atendimento) => {
  modal.abrirView(atendimento);
};
</script>
