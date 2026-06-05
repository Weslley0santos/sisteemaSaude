<template>
  <q-layout view="hHh LpR lff" class="min-h-screen flex flex-col overflow-hidden">
    <AppHeader @toggle-menu="sideMenu" />

    <AppSidebar v-model="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-page-sticky
      v-if="$route.meta.showBotaoAdd"
      position="bottom-right"
      :offset="$q.screen.lt.md ? [16, 16] : [24, 24]"
      class="z-50"
    >
      <q-btn
        fab
        icon="add"
        color="accent"
        unelevated
        class="shadow-lg"
        aria-label="Adicionar atendimento"
        @click="modal.abrirCreate()"
      />
    </q-page-sticky>
    <div
      class="mt-auto border-t border-border dark:border-white/10 bg-primary text-white text-xs md:text-sm"
    >
      <div class="py-2 md:py-3 text-center tracking-wide">SaudeS © 2026</div>
    </div>

    <modalAtendimento />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import AppHeader from 'src/components/AppHeader.vue';
import AppSidebar from 'src/components/AppSidebar.vue';
import ModalAtendimento from 'src/components/Atendimento/modalAtendimento.vue';

import { useTheme } from 'src/composable/useTheme';
import { useModal } from 'src/composable/useModal';

const { carregarTema } = useTheme();

const modal = useModal();

const drawer = ref(false);

const sideMenu = () => {
  drawer.value = !drawer.value;
};

onMounted(() => {
  carregarTema();
});
</script>
