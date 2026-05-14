<template>
  <q-header elevated class="bg-primary text-white flex">
    <q-btn flat dense round icon="menu" @click="emit('toggle-menu')"></q-btn>
    <q-toolbar-title class="p-2 font-semibold"> SaudeS </q-toolbar-title>
  </q-header>
</template>
<script setup lang="ts">
const emit = defineEmits(['toggle-menu']);
</script>

<style lang="scss" scoped></style>
