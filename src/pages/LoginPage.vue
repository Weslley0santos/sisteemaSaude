<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-dark p-4">
    <q-card class="w-full max-w-md p-6 rounded-2xl shadow-lg">
      <div class="flex flex-col items-center mb-6">
        <q-img :src="logo" class="w-24 h-24" fit="contain" alt="Logo SaudeS" />

        <p class="text-gray-500 dark:text-gray-300">
          {{ t('auth.welcome') }}
        </p>
      </div>

      <q-form class="flex flex-col gap-4" @submit.prevent="login">
        <q-input
          v-model="email"
          :label="t('auth.email')"
          outlined
          type="email"
          lazy-rules
          :rules="[(val) => !!val || t('validation.required')]"
          aria-label="Campo de e-mail"
        />

        <q-input
          v-model="senha"
          :label="t('auth.password')"
          outlined
          :type="mostrarSenha ? 'text' : 'password'"
          lazy-rules
          :rules="[(val) => !!val || t('validation.required')]"
          aria-label="Campo de senha"
        >
          <template #append>
            <q-icon
              :name="mostrarSenha ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="mostrarSenha = !mostrarSenha"
            />
          </template>
        </q-input>

        <q-btn
          :label="t('button.login')"
          color="primary"
          type="submit"
          class="w-full"
          aria-label="Entrar no sistema"
        />
      </q-form>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from 'src/stores/authStore';

import logo from 'src/assets/logo-saude.png';

const router = useRouter();
const auth = useAuthStore();

const { t } = useI18n();

const email = ref('');
const senha = ref('');
const mostrarSenha = ref(false);

const login = () => {
  if (!email.value || !senha.value) return;

  auth.login();

  void router.push('/dashboard');
};
</script>
