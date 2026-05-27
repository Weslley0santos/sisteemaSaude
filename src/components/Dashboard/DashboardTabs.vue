<template>
  <q-tabs
    :model-value="tab"
    @update:model-value="emit('update:tab', $event)"
    class="text-textPrimary mb-3 text-sm md:text-base overflow-x-auto"
    active-color="secondary"
    indicator-color="secondary"
    align="left"
    shrink
  >
    <q-tab name="todos" :label="t('dashboard.all')" />

    <q-tab name="triagem" :label="t('stage.triage')" />

    <q-tab name="consulta" :label="t('stage.consultation')" />

    <q-tab name="finalizados" :label="t('status.completed')" />
  </q-tabs>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
  tab: string;
}>();

const emit = defineEmits<{
  (e: 'update:tab', value: string): void;
}>();

const { t } = useI18n();
</script>
