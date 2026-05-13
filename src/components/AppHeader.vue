<template>
  <q-header elevated class="bg-primary text-white">
    <q-btn flat dense round icon="menu" @click="emit('toggle-menu')"></q-btn>
    <q-toolbar-title class="sistem-title"> SaudeS </q-toolbar-title>
  </q-header>
</template>
<script setup lang="ts">
const emit = defineEmits(['toggle-menu']);
</script>

<style lang="scss" scoped>
* {
  background-color: #64e264;
  height: 60px;
}

.sistem-title {
  padding: 15px;
}
</style>
