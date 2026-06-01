<template>
  <div
    class="bg-surface border-t border-border rounded-2xl p-3 md:p-4 shadow-sm cursor-pointer transition-all duration-200 md:hover:shadow-xl md:hover:-translate-y-1"
    v-ripple
    @click="modal.abrirView(props.atendimento)"
  >
    <div class="items-start gap-3">
      <DadosAtendimento class="w-full" :atendimento="props.atendimento" />
    </div>

    <div
      v-if="$q.screen.md && props.atendimento.observacoes?.length"
      class="mt-3 md:mt-4 p-2 md:p-3 bg-surface border-t border-border/5"
    >
      <p class="text-xs font-semibold text-textPrimary mb-2">
        {{ $t('service.observation') }}
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

const props = defineProps<{
  atendimento: Atendimento;
  tipo?: 'dashboard' | 'triagem' | 'consulta' | 'finalizados';
}>();
const modal = useModal();
</script>
