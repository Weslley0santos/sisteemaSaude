<template>
  <div class="bg-surface rounded-xl p-3 min-h-[300px] md:min-h-[450px]">
    <DashboardTabs v-model:tab="tab" />
    <div
      v-if="!rowsFiltradas.length"
      class="flex items-center justify-center h-[300px] text-foreground-secondary"
    >
      <p>
        {{ $t('dashboard.noAppointments') }}
      </p>
    </div>
    <template v-else>
      <div v-if="$q.screen.lt.md" class="flex flex-col gap-3">
        <q-btn
          v-for="row in rowsFiltradas"
          :key="row.senha"
          flat
          no-caps
          class="p-0"
          @click="abrirAtendimento(row)"
        >
          <q-card class="p-3 cursor-pointer bg-surface w-full">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-xs text-foreground-secondary">
                  {{ $t('service.password') }}
                </p>

                <p class="font-bold">
                  {{ row.senha }}
                </p>
              </div>

              <q-badge color="secondary">
                {{ row.status }}
              </q-badge>
            </div>

            <div class="mt-2 text-sm text-foreground-secondary text-left">
              {{ row.nome }}
            </div>
          </q-card>
        </q-btn>
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
import type { QTableColumn } from 'quasar';

defineOptions({
  name: 'DashboardTable',
});
const props = defineProps<{
  rows: Atendimento[];
}>();

const emit = defineEmits<{
  (e: 'abrir-atendimento', atendimento: Atendimento): void;
}>();

const { t: $t } = useI18n();

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

const columns = computed<QTableColumn[]>(() => [
  {
    name: 'nome',
    label: $t('service.patient'),
    field: 'nome',
    align: 'left',
  },

  {
    name: 'senha',
    label: $t('service.password'),
    field: 'senha',
    align: 'left',
  },

  {
    name: 'estagio',
    label: $t('service.stage'),
    field: 'estagio',
    align: 'left',
    format: (val) => $t(`stage.${val}`),
  },

  {
    name: 'status',
    label: $t('service.status'),
    field: 'status',
    align: 'left',
    format: (val) => $t(`status.${val}`),
  },
]);

const abrirAtendimento = (atendimento: Atendimento) => {
  emit('abrir-atendimento', atendimento);
};
</script>
