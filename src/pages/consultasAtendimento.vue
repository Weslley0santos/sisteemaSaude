<template>
  <q-page class="bg-background">
    <div class="w-full min-w-[300px] p-3 sm:p-4 lg:p-6">
      <h1 class="text-foreground font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
        {{ $t('stage.consultation') }}
      </h1>

      <div class="flex flex-col gap-3 sm:gap-4">
        <cardAtendimento
          v-for="item in consulta"
          :key="item.senha"
          :atendimento="item"
          tipo="consulta"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { computed } from 'vue';
import { useAtendimentosQuery } from 'src/queries/atendimento/atendimento.queries';
import { STAGE, STATUS } from 'src/types/enums/atendimentoEnums';

defineOptions({
  name: 'ConsultasAtendimento',
});

const { data: atendimentos } = useAtendimentosQuery();

const consulta = computed(() =>
  (atendimentos.value ?? []).filter(
    (item) => item.estagio === STAGE.CONSULTATION && item.status === STATUS.IN_PROGRESS,
  ),
);
</script>
