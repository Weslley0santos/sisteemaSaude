<template>
  <div class="bg-surface rounded-xl p-3 min-h-[300px] md:min-h-[450px]">
    <DashboardTabs v-model:tab="tab" />
    <div
      v-if="!rowsFiltradas.length"
      class="flex items-center justify-center h-[300px] text-textSecondary"
    >
      <p>
        {{ t('dashboard.noAppointments') }}
      </p>
    </div>
    <template v-else>
      <div v-if="$q.screen.lt.md" class="flex flex-col gap-3">
        <q-card
          v-for="row in rowsFiltradas"
          :key="row.senha"
          class="p-3 cursor-pointer bg-surface"
          clickable
          v-ripple
          @click="abrirAtendimento(row)"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-xs text-textSecondary">
                {{ t('service.password') }}
              </p>

              <p class="font-bold">
                {{ row.senha }}
              </p>
            </div>

            <q-badge color="secondary">
              {{ row.status }}
            </q-badge>
          </div>

          <div class="mt-2 text-sm text-textSecondary">
            {{ row.nome }}
          </div>
        </q-card>
      </div>

      <q-table
        v-else
        :rows="rowsFiltradas"
        :columns="columns"
        row-key="senha"
        flat
        class="p-3 bg-surface"
        @row-click="(_, row) => abrirAtendimento(row)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { Atendimento } from 'src/types/atendimento';

import DashboardTabs from './DashboardTabs.vue';

import { STATUS, STAGE } from 'src/stores/atendimentoStore';

const props = defineProps<{
  rows: Atendimento[];
}>();

const emit = defineEmits<{
  (e: 'abrir-atendimento', atendimento: Atendimento): void;
}>();

const { t } = useI18n();

const tab = ref('todos');

const rowsFiltradas = computed(() => {
  if (tab.value === 'triagem') {
    return props.rows.filter((a) => a.estagio === STAGE.TRIAGE);
  }

  if (tab.value === 'consulta') {
    return props.rows.filter(
      (a) => a.estagio === STAGE.CONSULTATION && a.status === STATUS.IN_PROGRESS,
    );
  }

  if (tab.value === 'finalizados') {
    return props.rows.filter((a) => a.status === STATUS.COMPLETED);
  }

  return props.rows;
});

const columns = [
  {
    name: 'nome',
    label: t('service.patient'),
    field: 'nome',
    align: 'left' as const,
  },

  {
    name: 'senha',
    label: t('service.password'),
    field: 'senha',
    align: 'left' as const,
  },

  {
    name: 'estagio',
    label: t('service.stage'),
    field: 'estagio',
    align: 'left' as const,

    format: (val: string) => t(`stage.${val}`),
  },

  {
    name: 'status',
    label: t('service.status'),
    field: 'status',
    align: 'left' as const,

    format: (val: string) => t(`status.${val}`),
  },
];

const abrirAtendimento = (atendimento: Atendimento) => {
  emit('abrir-atendimento', atendimento);
};
</script>
