<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle-menu="sideMenu" />
    <AppSidebar :drawer="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from 'src/components/AppHeader.vue';
import AppSidebar from 'src/components/AppSidebar.vue';

const drawer = ref(false);

const sideMenu = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped></style>
