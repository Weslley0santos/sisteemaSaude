<template>
  <q-table
    :title="t('common.appointments')"
    :rows="rows"
    :columns="columns"
    row-key="senha"
    flat
    bordered
    @row-click="abrirAtendimento"
  />
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
    label: t('service.status'),
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

const abrirAtendimento = (event: Event, atendimento: Atendimento) => {
  emit('abrir-atendimento', atendimento);
};
</script>
