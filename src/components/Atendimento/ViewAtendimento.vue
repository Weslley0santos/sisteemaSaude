<template>
  <div class="flex flex-col gap-3 sm:gap-4 w-full min-w-[300px]">
    <section>
      <DadosAtendimento :atendimento="props.atendimento" />
    </section>

    <section v-if="props.atendimento.observacoes?.length">
      <p class="text-sm sm:text-base font-semibold mb-2">
        {{ t('service.observation') }}
      </p>

      <ObsAtendimento :observacoes="props.atendimento.observacoes" />
    </section>

    <section>
      <TempoAtendimento :atendimento="props.atendimento" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Atendimento } from 'src/types/atendimento';

import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';

import { useI18n } from 'vue-i18n';

const props = defineProps<{
  atendimento: Atendimento;
}>();

const { t } = useI18n();
</script>
