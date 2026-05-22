<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100">
    <q-card class="w-full max-w-md p-6 rounded-2xl shadow-lg">
      <div class="flex flex-col items-center mb-6">
        <q-img :src="logo" class="w-24 h-24" />

        <p class="text-gray-500">Sistema Hospitalar</p>
      </div>

      <q-form class="flex flex-col gap-4" @submit.prevent="login">
        <q-input v-model="email" label="E-mail" outlined type="email" />

        <q-input v-model="senha" label="Senha" outlined type="password" />

        <q-btn label="Entrar" color="primary" type="submit" class="w-full" />
      </q-form>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import logo from 'src/assets/logo-saude.png';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const senha = ref('');

const login = () => {
  auth.login();

  void router.push('/dashboard');
};
</script>
