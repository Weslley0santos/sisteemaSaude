<template>
  <q-tabs
    :model-value="tab"
    @update:model-value="emit('update:tab', $event)"
    class="text-primary mb-3"
    active-color="primary"
    indicator-color="primary"
    align="left"
  >
    <q-tab name="todos" :label="t('dashboard.all')" />

    <q-tab name="triagem" :label="t('common.triagem')" />

    <q-tab name="consulta" :label="t('common.consultation')" />

    <q-tab name="finalizados" :label="t('common.completed')" />
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
