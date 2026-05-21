<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
    <q-card class="p-3">
      <h2 class="text-base font-semibold mb-3">{{ t('dashboard.filter') }}</h2>

      <q-date
        :model-value="dataSelecionada"
        @update:model-value="emit('update:dataSelecionada', $event)"
        minimal
      />
    </q-card>

    <q-card class="p-4 flex flex-col gap-4">
      <div>
        <h2 class="text-base font-semibold mb-2">{{ t('dashboard.averageTime') }}</h2>

        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between">
            <span>{{ t('dashboard.waitingTime') }}</span>

            <strong> {{ tempoMedioEspera }} min </strong>
          </div>

          <div class="flex justify-between">
            <span>{{ t('dashboard.consultationTime') }}</span>

            <strong> {{ tempoMedioConsulta }} min </strong>
          </div>

          <div class="flex justify-between">
            <span>{{ t('dashboard.totalTime') }}</span>

            <strong> {{ tempoMedioTotal }} min </strong>
          </div>
        </div>
      </div>

      <q-separator />

      <div>
        <h2 class="text-base font-semibold mb-2">{{ t('dashboard.forwarding') }}</h2>

        <div class="flex flex-col gap-2 text-sm">
          <div
            v-for="item in encaminhamentos"
            :key="item.nome"
            class="flex justify-between items-center"
          >
            <span>
              {{ item.nome }}
            </span>

            <q-badge color="primary">
              {{ item.total }}
            </q-badge>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useAtendimentoStore();

defineProps<{
  dataSelecionada: string;
}>();

const emit = defineEmits<{
  (e: 'update:dataSelecionada', value: string): void;
}>();

const tempoMedioEspera = computed(() => {
  if (!store.atendimentos.length) return 0;

  const total = store.atendimentos.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.espera,
    0,
  );

  return Math.round(total / store.atendimentos.length);
});

const tempoMedioConsulta = computed(() => {
  if (!store.atendimentos.length) return 0;

  const total = store.atendimentos.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.consultando,
    0,
  );

  return Math.round(total / store.atendimentos.length);
});

const tempoMedioTotal = computed(() => {
  if (!store.atendimentos.length) return 0;

  const total = store.atendimentos.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.total,
    0,
  );

  return Math.round(total / store.atendimentos.length);
});

const encaminhamentos = computed(() => {
  const contagem: Record<string, number> = {};

  store.atendimentos.forEach((atendimento) => {
    const nome = atendimento.encaminhamento || 'Não informado';

    contagem[nome] = (contagem[nome] || 0) + 1;
  });

  return Object.entries(contagem).map(([nome, total]) => ({
    nome,
    total,
  }));
});
</script>
