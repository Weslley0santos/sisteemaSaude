<template>
  <q-layout view="hHh Lpr lFf" class="overflow-hidden">
    <AppHeader @toggle-menu="sideMenu" />

    <AppSidebar v-model="drawer" />

    <q-page-container class="px-3 py-4 md:px-6 md:py-6">
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
        color="green"
        unelevated
        class="shadow-lg"
        aria-label="Adicionar atendimento"
        @click="modal.abrirCreate()"
      />
    </q-page-sticky>

    <q-footer class="bg-accent text-white border-t border-white/10 text-xs md:text-sm">
      <div class="py-2 md:py-3 text-center tracking-wide">SaudeS © 2026</div>
    </q-footer>

    <modalAtendimento />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';

import AppHeader from 'src/components/AppHeader.vue';
import AppSidebar from 'src/components/AppSidebar.vue';
import modalAtendimento from 'src/components/Atendimento/modalAtendimento.vue';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useModal } from 'src/composable/useModal';

const $q = useQuasar();

const store = useAtendimentoStore(); // ✅ CORRIGIDO
const modal = useModal();

const drawer = ref(false);

const sideMenu = () => {
  drawer.value = !drawer.value;
};

watch(
  () => $q.dark.isActive,
  (isDark) => {
    document.documentElement.classList.toggle('dark', isDark);
  },
  { immediate: true },
);

onMounted(async () => {
  await store.carregarAtendimentos();
});
</script>
