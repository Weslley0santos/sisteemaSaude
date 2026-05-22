<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :breakpoint="1024"
    bordered
    class="bg-accent text-white h-screen flex flex-col"
  >
    <div class="flex flex-col h-full overflow-hidden">
      <q-list class="px-2 md:px-3 py-3 md:py-4 space-y-1 md:space-y-2">
        <q-item
          clickable
          to="/dashboard"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-3 py-2 md:px-4 md:py-3 text-white transition-all duration-200 md:hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiHomeHeart" />

          <q-item-section class="text-sm md:text-base">
            {{ t('common.appointments') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/triagem"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-3 py-2 md:px-4 md:py-3 text-white transition-all duration-200 md:hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiHospitalBoxOutline" />

          <q-item-section class="text-sm md:text-base">
            {{ t('common.triage') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/consulta"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-3 py-2 md:px-4 md:py-3 text-white transition-all duration-200 md:hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiStethoscope" />

          <q-item-section class="text-sm md:text-base">
            {{ t('common.consultation') }}
          </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/finalizados"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-3 py-2 md:px-4 md:py-3 text-white transition-all duration-200 md:hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiBookmarkCheckOutline" />

          <q-item-section class="text-sm md:text-base">
            {{ t('common.completed') }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiStethoscope,
  mdiHospitalBoxOutline,
  mdiHomeHeart,
  mdiBookmarkCheckOutline,
} from '@mdi/js';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const drawer = ref<boolean | null>(false);
</script>
