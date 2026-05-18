<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">

    <!-- TOTAL -->
    <q-card class="p-3">
      <div class="flex items-center justify-between">

        <div>
          <p class="text-sm text-gray-500">
            Total
          </p>

          <h2 class="text-2xl font-bold">
            {{ store.atendimentos.length }}
          </h2>
        </div>

        <q-icon
          name="groups"
          size="30px"
          color="primary"
        />

      </div>
    </q-card>

    <!-- TRIAGEM -->
    <q-card class="p-3">
      <div class="flex items-center justify-between">

        <div>
          <p class="text-sm text-gray-500">
            Triagem
          </p>

          <h2 class="text-2xl font-bold">
            {{ store.triagem.length }}
          </h2>
        </div>

        <q-icon
          name="medical_services"
          size="30px"
          color="orange"
        />

      </div>
    </q-card>

    <!-- CONSULTA -->
    <q-card class="p-3">
      <div class="flex items-center justify-between">

        <div>
          <p class="text-sm text-gray-500">
            Consulta
          </p>

          <h2 class="text-2xl font-bold">
            {{ store.consulta.length }}
          </h2>
        </div>

        <q-icon
          name="stethoscope"
          size="30px"
          color="green"
        />

      </div>
    </q-card>

    <!-- FINALIZADOS -->
    <q-card class="p-3">
      <div class="flex items-center justify-between">

        <div>
          <p class="text-sm text-gray-500">
            Finalizados
          </p>

          <h2 class="text-2xl font-bold">
            {{ store.concluidos.length }}
          </h2>
        </div>

        <q-icon
          name="task_alt"
          size="30px"
          color="positive"
        />

      </div>
    </q-card>

  </div>
</template>

<script setup lang="ts">
import { useAtendimentoStore } from 'src/stores/atendimentoStore';

const store = useAtendimentoStore();
</script>

<style scoped lang="scss">
.q-card {
  transition: 0.2s ease;
}

.q-card:hover {
  transform: translateY(-2px);
}
</style>