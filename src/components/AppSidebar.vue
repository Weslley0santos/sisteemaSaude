<template>
  <q-drawer v-model="drawer" show-if-above bordered>
    <div class="tabela-menu p-4">
      <ul class="lista-menu">
        <li class="list-item">Atendimentos</li>
        <li class="list-item">Finalizados</li>
        <li class="list-item">Em espera</li>
        <li class="list-item">Unidades</li>
        <li class="list-item">Dashbord</li>
      </ul>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
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
