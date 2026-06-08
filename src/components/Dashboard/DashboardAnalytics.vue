<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <h2 class="text-foreground text-sm md:text-base font-semibold mb-3">
        {{ $t('dashboard.filter') }}
      </h2>

      <div class="w-full overflow-x-auto">
        <q-date
          v-model="dataSelecionada"
          minimal
          class="min-w-[260px] w-full bg-surface text-foreground-secondary"
        />
      </div>
    </q-card>

    <!-- MÉTRICAS -->
    <q-card class="p-3 md:p-4 flex flex-col gap-3 md:gap-4 bg-surface border-2 border-border">
      <div>
        <h2 class="text-foreground text-sm md:text-base font-semibold mb-2">
          {{ $t('dashboard.averageTime') }}
        </h2>

        <div class="text-foreground-secondary flex flex-col gap-2 text-sm">
          <div class="flex justify-between">
            <span>{{ $t('dashboard.waitingTime') }}</span>
            <strong>{{ tempoMedioEspera }} min</strong>
          </div>

          <div class="flex justify-between">
            <span>{{ $t('dashboard.consultationTime') }}</span>
            <strong>{{ tempoMedioConsulta }} min</strong>
          </div>

          <div class="flex justify-between">
            <span>{{ $t('dashboard.totalTime') }}</span>
            <strong>{{ tempoMedioTotal }} min</strong>
          </div>
        </div>
      </div>

      <q-separator />

      <div class="text-foreground-secondary">
        <h2 class="text-foreground text-sm md:text-base font-semibold mb-2">
          {{ $t('dashboard.forwarding') }}
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
import { isSameDay } from 'src/helpers/dataHelper';
defineOptions({
  name: 'DashboardAnalytics',
});

const dataSelecionada = defineModel<string>('dataSelecionada', {
  default: '',
});

const { t: $t } = useI18n();
const store = useAtendimentoStore();

const atendimentosFiltrados = computed(() => {
  if (!dataSelecionada.value) return store.atendimentos;

  return store.atendimentos.filter((a) => isSameDay(a.criadoEm, dataSelecionada.value));
});
const tempoMedioEspera = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  let total = 0;

  for (const atendimento of atendimentosFiltrados.value) {
    total += atendimento.tempoAtendimento.espera;
  }
  return Math.round(total / atendimentosFiltrados.value.length);
});

const tempoMedioConsulta = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  let total = 0;

  for (const atendimento of atendimentosFiltrados.value) {
    total += atendimento.tempoAtendimento.consultando;
  }
  return Math.round(total / atendimentosFiltrados.value.length);
});

const tempoMedioTotal = computed(() => {
  if (!atendimentosFiltrados.value.length) return 0;

  let total = 0;

  for (const atendimento of atendimentosFiltrados.value) {
    total += atendimento.tempoAtendimento.total;
  }
  return Math.round(total / atendimentosFiltrados.value.length);
});

const encaminhamentos = computed(() => {
  const contagem: Record<string, number> = {};

  for (const atendimento of atendimentosFiltrados.value) {
    const key = atendimento.encaminhamento || 'not_informed';

    if (!contagem[key]) {
      contagem[key] = 0;
    }
    contagem[key]++;
  }

  return Object.entries(contagem).map(([key, total]) => ({
    nome: key === 'not_informed' ? $t('service.notInformed') : $t(`referral.${key}`),

    total,
  }));
});
</script>
