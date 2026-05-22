<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
    <q-card class="p-3 md:p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm text-gray-500">
            {{ t('dashboard.totalAppointments') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ store.atendimentos.length }}
          </h2>
        </div>

        <q-icon name="groups" :size="$q.screen.lt.md ? '24px' : '30px'" color="primary" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm text-gray-500">
            {{ t('common.triage') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ store.triagem.length }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiHospitalBoxOutline" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm text-gray-500">
            {{ t('common.consultation') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ store.consulta.length }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiStethoscope" />
      </div>
    </q-card>

    <q-card class="p-3 md:p-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs md:text-sm text-gray-500">
            {{ t('common.completed') }}
          </p>

          <h2 class="text-xl md:text-2xl font-bold">
            {{ store.concluidos.length }}
          </h2>
        </div>

        <svg-icon class="mr-2" type="mdi" :path="mdiBookmarkCheckOutline" />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStethoscope, mdiHospitalBoxOutline, mdiBookmarkCheckOutline } from '@mdi/js';
import { useI18n } from 'vue-i18n';
const store = useAtendimentoStore();

const { t } = useI18n();
</script>
