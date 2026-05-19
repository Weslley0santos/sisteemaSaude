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
      <q-btn fab icon="add" color="accent" @click="modal.abrirCreate()" />
    </q-page-sticky>

    <!-- FOOTER -->
    <q-footer class="bg-primary text-white">
      <div class="p-2 text-center">SaudeS © 2026</div>
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
