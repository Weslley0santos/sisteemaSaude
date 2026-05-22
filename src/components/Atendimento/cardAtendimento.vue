<template>
  <div
    class="bg-surface border border-black/5 rounded-2xl p-3 md:p-4 shadow-sm cursor-pointer transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-1"
    v-ripple
    @click="modal.abrirView(props.atendimento)"
  >
    <div class="mt-2 flex justify-start">
      <div
        class="text-xs font-semibold px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap"
      >
        {{ props.atendimento.estagio }}
      </div>
    </div>

    <!-- TOPO -->
    <div class="flex items-start gap-3">
      <DadosAtendimento class="w-full" :atendimento="props.atendimento" />
    </div>

    <!-- OBSERVAÇÕES (APENAS DESKTOP) -->
    <div
      v-if="$q.screen.md && props.atendimento.observacoes?.length"
      class="mt-3 md:mt-4 p-2 md:p-3 rounded-xl bg-background border border-black/5"
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
