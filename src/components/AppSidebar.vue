<template>
  <q-drawer
    :model-value="props.drawer"
    @update:model-value="(value) => emit('update:drawer', value)"
    show-if-above
    bordered
  >
    <div class="bg-primary h-full overflow-y-auto">
      <q-list>
        <q-item
          clickable
          to="/dashboard"
          active-class="bg-secondary w-full"
          class="rounded-none p-2 text-white transition-colors hover:bg-secondary"
        >
          <svg-icon class="mr-2" type="mdi" :path="mdiHomeHeart"></svg-icon>

          <q-item-section>Dashboard</q-item-section>
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
import SvgIcon from '@jamescoyle/vue-icon';
import {
  mdiStethoscope,
  mdiHospitalBoxOutline,
  mdiHomeHeart,
  mdiBookmarkCheckOutline,
} from '@mdi/js';

const props = defineProps<{
  drawer: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:drawer', value: boolean): void;
}>();
</script>
