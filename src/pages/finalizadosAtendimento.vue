<template>
  <q-page class="bg-background">
    <div class="w-full min-w-[300px] p-3 sm:p-4 lg:p-6">
      <h1 class="text-foreground font-bold text-xl sm:text-2xl lg:text-3xl mb-4">
        {{ $t('status.completed') }}
      </h1>

      <div class="flex flex-col gap-3 sm:gap-4">
        <cardAtendimento
          v-for="item in concluidos"
          :key="item.id ?? item.senha"
          :atendimento="item"
          tipo="finalizados"
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
  name: 'finalizadosAtendimento',
});

const { data: atendimentos } = useAtendimentosQuery();

const concluidos = computed(() =>
  (atendimentos.value ?? []).filter(
    (item) => item.estagio === STAGE.CONSULTATION && item.status === STATUS.COMPLETED,
  ),
);
</script>
