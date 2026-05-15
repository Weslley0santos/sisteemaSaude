<template>
  <q-dialog v-model="aberto">
    <q-card class="min-w-[100px] sm:min-w-[700px]">
      <q-card-section class="flex justify-between items-center">
        <h2 class="text-xl font-bold">{{ atendimentoAtual?.estagio }}</h2>

        <q-btn flat round dense icon="close" @click="fechar()" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <FormsAtendimento v-if="modo === 'create'" @salvar="criarAtendimento" />

        <ViewAtendimento
          v-if="modo === 'view' && atendimentoAtual"
          :atendimento="atendimentoAtual"
        />
        <editAtendimento
          v-if="modo === 'edit' && atendimentoAtual"
          :atendimento="atendimentoAtual"
        />
      </q-card-section>
      <div>
        <q-btn
          v-if="atendimentoAtual && atendimentoAtual.estagio === ESTAGIO.triagem"
          label="Enviar para Consulta"
          class="w-full"
          @click="enviarConsulta"
        />

        <q-btn
          v-if="
            atendimentoAtual &&
            atendimentoAtual.estagio === ESTAGIO.consulta &&
            atendimentoAtual.status === STATUS.emAndamento
          "
          label="Finalizar Atendimento"
          class="w-full"
          @click="finalizarAtendimento"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useModal } from 'src/composable/useModal';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
import { STATUS, ESTAGIO } from 'src/stores/atendimentoStore';

import FormsAtendimento from './FormsAtendimento.vue';
import ViewAtendimento from './ViewAtendimento.vue';
import editAtendimento from './editAtendimento.vue';

const { aberto, modo, atendimentoAtual, fechar } = useModal();
const store = useAtendimentoStore();

const criarAtendimento = (novoAtendimento: Atendimento) => {
  store.adicionarAtendimento(novoAtendimento);

  fechar();
};
const enviarConsulta = () => {
  if (!atendimentoAtual.value) return;

  store.avancarParaConsulta(atendimentoAtual.value.senha);

  fechar();
};

const finalizarAtendimento = () => {
  if (!atendimentoAtual.value) return;

  store.finalizarAtendimento(atendimentoAtual.value.senha);

  fechar();
};
</script>
