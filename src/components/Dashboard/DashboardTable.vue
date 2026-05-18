<template>
  <q-table
    title="Atendimentos"
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

defineProps<{
  rows: Atendimento[];
}>();

const emit = defineEmits<{
  (
    e: 'abrir-atendimento',
    atendimento: Atendimento
  ): void;
}>();

const columns = [
  {
    name: 'nome',
    label: 'Paciente',
    field: 'nome',
    align: 'left' as const,
  },

  {
    name: 'senha',
    label: 'Senha',
    field: 'senha',
    align: 'left' as const,
  },

  {
    name: 'estagio',
    label: 'Estágio',
    field: 'estagio',
    align: 'left' as const,
  },

  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left' as const,
  },
];

const abrirAtendimento = (
  event: Event,
  atendimento: Atendimento
) => {
  emit('abrir-atendimento', atendimento);
};
</script>