<template>
  <q-dialog v-model="aberto" persistent transition-show="scale" transition-hide="scale">
    <q-card
      class="bg-surface text-textPrimary rounded-3xl shadow-2xl overflow-hidden w-full min-w-[300px] sm:min-w-[640px] md:min-w-[720px] max-w-[95vw] max-h-[90vh]"
    >
      <q-card-section
        class="flex justify-between items-center bg-accent text-white px-4 sm:px-6 py-3 sm:py-4"
      >
        <h2 class="text-base sm:text-lg font-bold tracking-wide truncate">
          {{ t(`stage.${atendimentoAtual?.estagio ?? 'form'}`) }}
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
        v-if="atendimentoAtual && modo === 'view'"
        class="border-t border-border bg-accent px-4 sm:px-6 py-4"
      >
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div class="flex flex-col sm:flex-row gap-2">
            <q-btn
              flat
              round
              icon="delete"
              color="negative"
              class="border border-border"
              @click="abrirConfirmacao"
            />

            <q-btn
              outline
              color="white"
              :label="t('button.edit')"
              class="w-full sm:w-auto rounded-xl px-4 bg-warning"
              @click="editar"
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <q-btn
              v-if="atendimentoAtual.estagio === STAGE.TRIAGE"
              :label="t('button.send')"
              color="secondary"
              unelevated
              rounded
              class="w-full sm:w-auto px-6 font-semibold"
              @click="enviarConsulta"
            />

            <q-btn
              v-if="
                atendimentoAtual.estagio === STAGE.CONSULTATION &&
                atendimentoAtual.status === STATUS.IN_PROGRESS
              "
              :label="t('button.finish')"
              color="positive"
              unelevated
              rounded
              class="w-full sm:w-auto px-6 font-semibold"
              @click="finalizarAtendimento"
            />
          </div>
        </div>
      </q-card-section>
      <ConfirmDelete v-model="confirmarDelete" @confirmar="remover" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useModal } from 'src/composable/useModal';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';
import { STATUS, STAGE } from 'src/stores/atendimentoStore';
import ConfirmDelete from './ConfirmDelete.vue';
import FormsAtendimento from './FormsAtendimento.vue';
import ViewAtendimento from './ViewAtendimento.vue';
import editAtendimento from './editAtendimento.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
const { t } = useI18n();
const { aberto, modo, atendimentoAtual, fechar } = useModal();
const store = useAtendimentoStore();
const confirmarDelete = ref(false);

const editar = () => {
  if (!atendimentoAtual.value) return;

  useModal().abrirEdit(atendimentoAtual.value);
};

const abrirConfirmacao = () => {
  confirmarDelete.value = true;
};

const remover = async () => {
  if (!atendimentoAtual.value?.id) return;

  await store.removerAtendimento(atendimentoAtual.value.id);

  confirmarDelete.value = false;

  fechar();
};

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
