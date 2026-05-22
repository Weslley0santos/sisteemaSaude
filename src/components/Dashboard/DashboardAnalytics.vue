<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
    <q-card class="p-3 md:p-4">
      <h2 class="text-sm md:text-base font-semibold mb-3">
        {{ t('dashboard.filter') }}
      </h2>

      <div class="w-full overflow-x-auto">
        <q-date
          :model-value="dataSelecionada"
          @update:model-value="emit('update:dataSelecionada', $event)"
          minimal
          class="min-w-[260px] w-full"
        />
      </div>
    </q-card>

    <!-- MÉTRICAS -->
    <q-card class="p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      <div>
        <h2 class="text-sm md:text-base font-semibold mb-2">
          {{ t('dashboard.averageTime') }}
        </h2>

        <div class="flex flex-col gap-2 text-sm">
          <div class="flex justify-between">
            <span>{{ t('dashboard.waitingTime') }}</span>
            <strong>{{ tempoMedioEspera }} min</strong>
          </div>

          <div class="flex justify-between">
            <span>{{ t('dashboard.consultationTime') }}</span>
            <strong>{{ tempoMedioConsulta }} min</strong>
          </div>

          <div class="flex justify-between">
            <span>{{ t('dashboard.totalTime') }}</span>
            <strong>{{ tempoMedioTotal }} min</strong>
          </div>
        </div>
      </div>

      <q-separator />

      <div>
        <h2 class="text-sm md:text-base font-semibold mb-2">
          {{ t('dashboard.forwarding') }}
        </h2>

        <div class="flex flex-col gap-2 text-sm">
          <div
            v-for="item in encaminhamentos"
            :key="item.nome"
            class="flex justify-between items-center"
          >
            <span>{{ item.nome }}</span>

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

const props = defineProps<{
  dataSelecionada: string;
}>();

const emit = defineEmits<{
  (e: 'update:dataSelecionada', value: string): void;
}>();

const isSameDay = (dateA: string, dateB: string) => {
  if (!dateA || !dateB) return false;

  const a = new Date(dateA);
  const b = new Date(dateB);

  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const atendimentosFiltrados = computed(() => {
  if (!props.dataSelecionada) return store.atendimentos;

  return store.atendimentos.filter((a) => isSameDay(a.criadoEm, props.dataSelecionada));
});

const tempoMedioEspera = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  const total = atendimentosFiltrados.value.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.espera,
    0,
  );

  return Math.round(total / atendimentosFiltrados.value.length);
});

const tempoMedioConsulta = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  const total = atendimentosFiltrados.value.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.consultando,
    0,
  );

  return Math.round(total / atendimentosFiltrados.value.length);
});

const tempoMedioTotal = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  const total = atendimentosFiltrados.value.reduce(
    (acc, atendimento) => acc + atendimento.tempoAtendimento.total,
    0,
  );

  return Math.round(total / atendimentosFiltrados.value.length);
});

const encaminhamentos = computed(() => {
  const contagem: Record<string, number> = {};

  atendimentosFiltrados.value.forEach((atendimento) => {
    const nome = atendimento.encaminhamento || t('service.notInformed');

    contagem[nome] = (contagem[nome] || 0) + 1;
  });

  return Object.entries(contagem).map(([nome, total]) => ({
    nome,
    total,
  }));
});
</script>
