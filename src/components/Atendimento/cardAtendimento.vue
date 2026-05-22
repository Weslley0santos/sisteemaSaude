<template>
  <div
    class="bg-surface border border-black/5 rounded-2xl p-4 m-2 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
    @click="modal.abrirView(props.atendimento)"
  >
    <!-- TOPO -->
    <div class="flex items-start justify-between gap-3">
      <DadosAtendimento :atendimento="props.atendimento" />

      <!-- BADGE STATUS -->
      <div
        class="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap"
      >
        {{ props.atendimento.estagio }}
      </div>
    </div>

    <!-- OBSERVAÇÕES -->
    <div
      v-if="props.atendimento.observacoes?.length"
      class="mt-4 p-3 rounded-xl bg-background border border-black/5"
    >
      <p class="text-xs font-semibold text-textSecondary mb-2">
        {{ t('service.observation') }}
      </p>

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </div>
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import type { Atendimento } from 'src/types/atendimento';
import { useModal } from 'src/composable/useModal';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  atendimento: Atendimento;
  tipo?: 'dashboard' | 'triagem' | 'consulta' | 'finalizados';
}>();

const modal = useModal();
</script>
