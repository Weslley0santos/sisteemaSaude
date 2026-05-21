<template>
  <q-header bordered class="bg-accent text-white backdrop-blur-md">
    <q-toolbar class="h-16 px-4">
      <q-btn flat dense round icon="menu" class="mr-2" @click="emit('toggle-menu')" />

      <q-toolbar-title class="text-xl font-bold tracking-wide">
        {{ t('common.nameApp') }}
      </q-toolbar-title>

      <q-btn
        flat
        round
        dense
        :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
        class="mr-1"
        @click="toggleDarkMode"
      />

      <q-btn flat round dense icon="logout" @click="logout" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

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
