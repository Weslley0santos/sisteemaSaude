<template>
  <q-layout view="hHh lpR fFf" class="bg-background text-textPrimary min-h-screen">
    <AppHeader @toggle-menu="sideMenu" />

    <AppSidebar v-model="drawer" />

    <q-page-container class="px-4 py-6">
      <router-view />
    </q-page-container>

    <q-page-sticky
      v-if="$route.meta.showBotaoAdd"
      position="bottom-right"
      :offset="[24, 24]"
      class="z-50"
    >
      <q-btn
        fab
        icon="add"
        color="primary"
        unelevated
        class="shadow-lg"
        label="adiconar atendimento"
        @click="modal.abrirCreate()"
      />
    </q-page-sticky>

    <q-footer class="bg-accent text-white border-t border-white/10">
      <div class="py-3 text-center text-sm tracking-wide">SaudeS © 2026</div>
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
