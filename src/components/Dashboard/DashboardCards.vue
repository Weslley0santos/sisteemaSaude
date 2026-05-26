<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 text-textPrimary">
    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ t('dashboard.totalAppointments') }}
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
            {{ t('common.triage') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ props.rows.filter((a) => a.estagio === STAGE.triage).length }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiHospitalBoxOutline" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4 bg-surface border-2 border-border">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm">
            {{ t('common.consultation') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{
              props.rows.filter(
                (a) => a.estagio === STAGE.consultation && a.status === STATUS.inProgress,
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
            {{ t('common.completed') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{
              props.rows.filter(
                (a) => a.estagio === STAGE.consultation && a.status === STATUS.completed,
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
import { useI18n } from 'vue-i18n';

import { STATUS, STAGE } from 'src/stores/atendimentoStore';

const { t } = useI18n();
import type { Atendimento } from 'src/types/atendimento';

const props = defineProps<{
  rows: Atendimento[];
}>();
</script>
