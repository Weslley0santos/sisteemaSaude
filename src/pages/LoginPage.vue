<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100">

    <q-card class="w-full max-w-md p-6 rounded-2xl shadow-lg">

      <div class="flex flex-col items-center mb-6">

        <q-img
          src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
          class="w-24 h-24"
        />

        <h1 class="text-3xl font-bold text-primary mt-4">
          SaudeS
        </h1>

        <p class="text-gray-500">
          Sistema Hospitalar
        </p>

      </div>

      <q-form
        class="flex flex-col gap-4"
        @submit.prevent="login"
      >

        <q-input
          v-model="email"
          label="E-mail"
          outlined
          type="email"
        />

        <q-input
          v-model="senha"
          label="Senha"
          outlined
          type="password"
        />

        <q-btn
          label="Entrar"
          color="primary"
          type="submit"
          class="w-full"
        />

      </q-form>

    </q-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const senha = ref('');

const login = () => {
  const fakeToken = 'token_fake';

  localStorage.setItem('token', fakeToken);

  void router.push('/dashboard');
};
</script>