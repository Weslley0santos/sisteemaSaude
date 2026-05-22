<template>
  <q-dialog v-model="aberto" transition-show="scale" transition-hide="scale">
    <q-card
      class="bg-surface text-textPrimary rounded-3xl shadow-2xl overflow-hidden w-full min-w-[300px] sm:min-w-[640px] md:min-w-[720px] max-w-[95vw] max-h-[90vh]"
    >
      <q-card-section
        class="flex justify-between items-center bg-accent text-white px-4 sm:px-6 py-3 sm:py-4"
      >
        <h2 class="text-base sm:text-lg font-bold tracking-wide truncate">
          {{ t(`common.${atendimentoAtual?.estagio ?? 'form'}`) }}
        </h2>

        <q-btn
          flat
          round
          dense
          icon="close"
          aria-label="Fechar modal"
          class="hover:bg-white/10"
          @click="fechar()"
        />
      </q-card-section>

      <q-card-section
        class="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto"
        style="max-height: calc(90vh - 140px)"
      >
        <div class="space-y-4">
          <FormsAtendimento v-if="modo === 'create'" @salvar="criarAtendimento" />

          <ViewAtendimento
            v-if="modo === 'view' && atendimentoAtual"
            :atendimento="atendimentoAtual"
          />

          <editAtendimento
            v-if="modo === 'edit' && atendimentoAtual"
            :atendimento="atendimentoAtual"
          />
        </div>
      </q-card-section>

      <q-card-section
        v-if="atendimentoAtual"
        class="border-t border-black/5 bg-background px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-end gap-2"
      >
        <q-btn
          v-if="atendimentoAtual.estagio === STAGE.triage"
          :label="t('button.send')"
          color="primary"
          unelevated
          rounded
          class="w-full sm:w-auto px-6"
          @click="enviarConsulta"
        />

        <q-btn
          v-if="
            atendimentoAtual.estagio === STAGE.consultation &&
            atendimentoAtual.status === STATUS.inProgress
          "
          :label="t('button.finish')"
          color="positive"
          unelevated
          rounded
          class="w-full sm:w-auto px-6"
          @click="finalizarAtendimento"
        />
      </q-card-section>
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
