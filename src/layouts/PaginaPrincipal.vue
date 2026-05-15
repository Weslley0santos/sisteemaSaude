<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle-menu="sideMenu" />
    <AppSidebar v-model="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      v-if="$route.meta.showBotaoAdd"
      position="bottom-right"
      :offset="[18, 18]"
      class="z-50"
    >
      <q-btn fab icon="add" color="accent" @click="modal.abrirCreate()" />
    </q-page-sticky>
    <modalAtendimento />
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from 'src/components/AppHeader.vue';
import AppSidebar from 'src/components/AppSidebar.vue';
import { useModal } from 'src/composable/useModal';
import modalAtendimento from 'src/components/Atendimento/modalAtendimento.vue';

const modal = useModal();
const drawer = ref(false);

const sideMenu = () => {
  drawer.value = !drawer.value;
};
</script>
