<template>
  <q-header bordered class="bg-primary text-white backdrop-blur-md">
    <q-toolbar class="h-8 px-3 md:h-12 md:px-4">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Abrir menu"
        class="mr-2"
        @click="emit('toggle-menu')"
      />

      <q-toolbar-title class="flex felx-nowrap items-center gap-2">
        <q-img :src="logo" alt="Logo do sistema SaudeS" class="w-8 h-8" />
        <span class="text-base md:text-xl font-bold tracking-wide">
          {{ $t('common.nameApp') }}
        </span>
      </q-toolbar-title>

      <div class="flex items-center gap-1 md:gap-2">
        <q-btn
          flat
          round
          dense
          aria-label="Modo escuro"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
        />

        <q-btn
          v-if="$q.screen.md"
          flat
          round
          dense
          icon="logout"
          aria-label="Sair do sistema"
          @click="logout"
        />

        <q-btn v-else flat round dense icon="more_vert" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import logo from 'src/assets/logo-saude.png';
import { useTheme } from 'src/composable/useTheme';

const emit = defineEmits(['toggle-menu']);

const router = useRouter();

const { toggleDarkMode } = useTheme();

const logout = () => {
  localStorage.removeItem('token');

  void router.push('/login');
};
</script>
