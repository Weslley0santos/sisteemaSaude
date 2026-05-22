<template>
  <q-dialog v-model="aberto">
    <q-card class="min-w-[100px] sm:min-w-[700px]">
      <q-card-section class="flex justify-between items-center">
        <h2 class="text-xl font-bold">{{ t(`common.${atendimentoAtual?.estagio ?? 'form'}`) }}</h2>

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
          v-if="atendimentoAtual && atendimentoAtual.estagio === STAGE.triage"
          label="Enviar para Consulta"
          class="w-full"
          @click="enviarConsulta"
        />

        <q-btn
          v-if="
            atendimentoAtual &&
            atendimentoAtual.estagio === STAGE.consultation &&
            atendimentoAtual.status === STATUS.inProgress
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
import { STATUS, STAGE } from 'src/stores/atendimentoStore';

import FormsAtendimento from './FormsAtendimento.vue';
import ViewAtendimento from './ViewAtendimento.vue';
import editAtendimento from './editAtendimento.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { aberto, modo, atendimentoAtual, fechar } = useModal();
const store = useAtendimentoStore();

const criarAtendimento = async (novoAtendimento: Atendimento) => {
  await store.adicionarAtendimento(novoAtendimento);

  fechar();
};
const enviarConsulta = async () => {
  if (!atendimentoAtual.value) return;
  if (!atendimentoAtual.value.id) return;

  await store.avancarParaConsulta(atendimentoAtual.value.id);

  fechar();
};

const finalizarAtendimento = async () => {
  if (!atendimentoAtual.value) return;
  if (!atendimentoAtual.value.id) return;

  await store.finalizarAtendimento(atendimentoAtual.value.id);

  fechar();
};
</script>
