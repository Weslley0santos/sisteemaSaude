<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-foreground">
    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ $t('dashboard.totalAppointments') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ props.rows.length }}
          </h2>
        </div>

        <q-icon name="groups" :size="$q.screen.lt.md ? '24px' : '30px'" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ $t('stage.triage') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ props.rows.filter((a) => a.estagio === STAGE.TRIAGE).length }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiHospitalBoxOutline" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ $t('stage.consultation') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{
              props.rows.filter(
                (a) => a.estagio === STAGE.CONSULTATION && a.status === STATUS.IN_PROGRESS,
              ).length
            }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiStethoscope" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ $t('status.completed') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{
              props.rows.filter(
                (a) => a.estagio === STAGE.CONSULTATION && a.status === STATUS.COMPLETED,
              ).length
            }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiBookmarkCheckOutline" />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStethoscope, mdiHospitalBoxOutline, mdiBookmarkCheckOutline } from '@mdi/js';
import { STATUS, STAGE } from 'src/stores/atendimentoStore';
import type { Atendimento } from 'src/types/atendimento';

defineOptions({
  name: 'DashboardCards',
});

const props = defineProps<{
  rows: Atendimento[];
}>();
</script>
