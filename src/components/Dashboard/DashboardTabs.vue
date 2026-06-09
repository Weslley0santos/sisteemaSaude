<template>
  <q-tabs
    v-model="tab"
    class="text-foreground mb-3 text-sm md:text-base overflow-x-auto"
    active-color="secondary"
    indicator-color="secondary"
    align="left"
    shrink
  >
    <q-tab name="todos" :label="$t('dashboard.all')" />

    <q-tab name="triagem" :label="$t('stage.triage')" />

    <q-tab name="consulta" :label="$t('stage.consultation')" />

    <q-tab name="finalizados" :label="$t('status.completed')" />
  </q-tabs>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DashboardTabs',
});
const tab = defineModel<string>();
</script>
