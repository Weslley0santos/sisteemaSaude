<template>
  <q-header bordered class="bg-accent text-white backdrop-blur-md">
    <q-toolbar class="h-14 px-3 md:h-16 md:px-4">
      <!-- Menu -->
      <q-btn flat dense round icon="menu" class="mr-2" @click="emit('toggle-menu')" />

      <!-- Título -->
      <q-toolbar-title class="flex items-center gap-2">
        <q-img :src="logo" class="w-8 h-8" />
        <span class="text-base md:text-xl font-bold tracking-wide">
          {{ t('common.nameApp') }}
        </span>
      </q-toolbar-title>

      <!-- Ações (agrupadas no mobile) -->
      <div class="flex items-center gap-1 md:gap-2">
        <!-- Dark mode sempre visível -->
        <q-btn
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
        />

        <!-- Logout só no desktop -->
        <q-btn v-if="$q.screen.md" flat round dense icon="logout" @click="logout" />

        <!-- Mobile: menu secundário (opcional futuro) -->
        <q-btn v-else flat round dense icon="more_vert" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import logo from 'src/assets/logo-saude.png';

const { t } = useI18n();

const router = useRouter();

const emit = defineEmits(['toggle-menu']);
import { useQuasar } from 'quasar';

const $q = useQuasar();

const toggleDarkMode = () => {
  $q.dark.toggle();
};

const logout = () => {
  localStorage.removeItem('token');

  void router.push('/login');
};
</script>
