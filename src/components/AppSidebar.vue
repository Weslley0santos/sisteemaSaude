<template>
  <q-drawer v-model="drawer" show-if-above :breakpoint="1024" bordered class="bg-accent text-white">
    <div class="flex h-full flex-col">
      <q-list class="px-3 py-4 space-y-2">
        <q-item
          clickable
          to="/dashboard"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-4 py-3 text-white transition-all duration-200 hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiHomeHeart" />

          <q-item-section> Atendimentos </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/triagem"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-4 py-3 text-white transition-all duration-200 hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiHospitalBoxOutline" />

          <q-item-section> Triagem </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/consulta"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-4 py-3 text-white transition-all duration-200 hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiStethoscope" />

          <q-item-section> Consulta </q-item-section>
        </q-item>

        <q-item
          clickable
          to="/finalizados"
          active-class="bg-primary shadow-md"
          class="rounded-xl px-4 py-3 text-white transition-all duration-200 hover:bg-primary/70"
        >
          <svg-icon class="mr-3" type="mdi" :path="mdiBookmarkCheckOutline" />

          <q-item-section> Finalizados </q-item-section>
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
