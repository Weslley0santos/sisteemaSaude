<template>
  <q-drawer v-model="props.drawer" show-if-above bordered>
    <div class="tabela-menu p-4">
      <q-list>
        <q-item clickable to="/">
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable to="/triagem">
          <q-item-section>Triagem</q-item-section>
        </q-item>

        <q-item clickable to="/consulta">
          <q-item-section>Consulta</q-item-section>
        </q-item>

        <q-item clickable to="/finalizados">
          <q-item-section>Finalizados</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">

const props = defineProps<{  
  drawer: bollean;

}>()
</script>
<style scoped>
.tabela-menu {
  background-color: #64e264;
  height: 100%;
  overflow-y: auto;
}
.list-item {
  transition: background-color 0.2s;
  padding: 10px;
  border-radius: 8px;
}

.list-item:hover {
  background-color: #14a800;
}
</style>
