<template>
  <q-dialog v-model="aberto">
    <q-card class="min-w-[700px]">
      <q-card-section class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Atendimento</h2>

        <q-btn flat round dense icon="close" @click="fechar()" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <FormsAtendimento v-if="modo === 'create'" />

        <ViewAtendimento v-if="modo === 'view'" :atendimento="atendimentoAtual" />

        <EditAtendimento v-if="modo === 'edit'" :atendimento="atendimentoAtual" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useModal } from 'src/composable/useModal';

import FormsAtendimento from './FormsAtendimento.vue';
const { aberto, modo, atendimentoAtual, fechar } = useModal();
</script>
