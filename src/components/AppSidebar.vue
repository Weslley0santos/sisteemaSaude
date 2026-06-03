<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :breakpoint="$q.screen.sizes.md"
    bordered
    class="bg-primary text-white h-screen flex flex-col"
  >
    <div class="flex flex-col h-full overflow-hidden">
      <q-list class="px-2 md:px-3 py-3 md:py-4 space-y-1 md:space-y-2">
        <q-item
          v-for="item in menuItems"
          :key="item.to"
          clickable
          :to="item.to"
          active-class="bg-secondary shadow-md"
          class="rounded-xl px-3 py-2 md:px-4 md:py-3 text-white transition-all duration-200 md:hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="item.icon" />

          <q-item-section class="text-sm md:text-base">
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const menuItems = computed(() => [
  {
    to: '/dashboard',
    icon: mdiHomeHeart,
    label: t('common.appointments'),
  },
  {
    to: '/triagem',
    icon: mdiHospitalBoxOutline,
    label: t('stage.triage'),
  },
  {
    to: '/consulta',
    icon: mdiStethoscope,
    label: t('stage.consultation'),
  },
  {
    to: '/finalizados',
    icon: mdiBookmarkCheckOutline,
    label: t('status.completed'),
  },
]);
</script>
