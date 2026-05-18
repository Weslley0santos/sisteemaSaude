<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>

      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="emit('toggle-menu')"
      />

      <q-toolbar-title class="p-2 font-semibold">
        SaudeS
      </q-toolbar-title>

<q-btn
  flat
  dense
  round
  :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
  @click="toggleDarkMode"
/>

      <q-btn
        flat
        dense
        round
        icon="logout"
        @click="logout"
      />

    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

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