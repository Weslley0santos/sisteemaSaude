<template>
  <div>
    <div v-if="$q.screen.lt.md" class="flex flex-col gap-3">
      <q-card
        v-for="row in rows"
        :key="row.senha"
        class="p-3 cursor-pointer"
        clickable
        v-ripple
        @click="abrirAtendimento(row)"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="text-xs text-gray-500">Senha</p>
            <p class="font-bold">{{ row.senha }}</p>
          </div>

          <q-badge color="primary">
            {{ row.status }}
          </q-badge>
        </div>

        <div class="mt-2 text-sm text-gray-600">
          {{ row.nome }}
        </div>
      </q-card>
    </div>

    <q-table
      v-else
      :title="t('common.appointments')"
      :rows="rows"
      :columns="columns"
      row-key="senha"
      flat
      bordered
      @row-click="(_, row) => abrirAtendimento(row)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineProps<{
  rows: Atendimento[];
}>();

const emit = defineEmits<{
  (e: 'abrir-atendimento', atendimento: Atendimento): void;
}>();

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
  },

  {
    name: 'status',
    label: t('service.status'),
    field: 'status',
    align: 'left' as const,
  },
];

const abrirAtendimento = (atendimento: Atendimento) => {
  emit('abrir-atendimento', atendimento);
};
</script>
