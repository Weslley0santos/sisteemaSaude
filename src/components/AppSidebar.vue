<template>
  <q-drawer v-model="drawer" show-if-above :breakpoint="1024" bordered>
    <div class="bg-primary h-full overflow-y-auto">
      <q-list>
        <q-item
          clickable
          to="/dashboard"
          active-class="bg-secondary w-full"
          class="rounded-none p-2 text-white transition-colors hover:bg-secondary"
        >
          <svg-icon class="mr-2" type="mdi" :path="mdiHomeHeart"></svg-icon>

          <q-item-section>Atendimentos</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/triagem"
          active-class="bg-secondary  w-full"
          class="rounded-none p-2 text-white transition-colors hover:bg-secondary"
        >
          <svg-icon class="mr-2" type="mdi" :path="mdiHospitalBoxOutline"></svg-icon>

          <q-item-section>Triagem</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/consulta"
          active-class="bg-secondary  w-full"
          class="rounded-none p-2 text-white transition-colors hover:bg-secondary"
        >
          <svg-icon class="mr-2" type="mdi" :path="mdiStethoscope" />

          <q-item-section>Consulta</q-item-section>
        </q-item>

        <q-item
          clickable
          to="/finalizados"
          active-class="bg-secondary  w-full"
          class="rounded-none p-2 text-white transition-colors hover:bg-secondary"
        >
          <svg-icon class="mr-2" type="mdi" :path="mdiBookmarkCheckOutline"></svg-icon>

          <q-item-section>Finalizados</q-item-section>
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

const drawer = ref<boolean | null>(false);
</script>
