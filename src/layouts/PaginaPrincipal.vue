<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader @toggle-menu="sideMenu" />

    <AppSidebar v-model="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- BOTÃO FAB -->
    <q-page-sticky
      v-if="$route.meta.showBotaoAdd"
      position="bottom-right"
      :offset="[18, 18]"
      class="z-50"
    >
      <q-btn
        fab
        icon="add"
        color="accent"
        @click="modal.abrirCreate()"
      />
    </q-page-sticky>

    <!-- FOOTER -->
    <q-footer class="bg-primary text-white">
      <div class="p-2 text-center">
        SaudeS © 2026
      </div>
    </q-footer>

    <modalAtendimento />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AppHeader from 'src/components/AppHeader.vue';
import AppSidebar from 'src/components/AppSidebar.vue';

import modalAtendimento from 'src/components/Atendimento/modalAtendimento.vue';

import { useModal } from 'src/composable/useModal';
import { useQuasar } from 'quasar';
import { watch } from 'vue';

const $q = useQuasar();

watch(
  () => $q.dark.isActive,
  (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
  },
  { immediate: true }
);

const modal = useModal();

const drawer = ref(false);

const sideMenu = () => {
  drawer.value = !drawer.value;
};
</script>