<template>
  <q-tabs
    :model-value="tab"
    @update:model-value="
      emit('update:tab', $event)
    "
    class="text-primary mb-3"
    active-color="primary"
    indicator-color="primary"
    align="left"
  >
    <q-tab
      name="todos"
      label="Todos"
    />

    <q-tab
      name="triagem"
      label="Triagem"
    />

    <q-tab
      name="consulta"
      label="Consulta"
    />

    <q-tab
      name="finalizados"
      label="Finalizados"
    />
  </q-tabs>
</template>

<script setup lang="ts">
defineProps<{
  tab: string;
}>();

const emit = defineEmits<{
  (
    e: 'update:tab',
    value: string
  ): void;
}>();
</script>