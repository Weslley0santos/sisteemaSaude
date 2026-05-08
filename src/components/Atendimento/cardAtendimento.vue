<template>
  <div class="card-atendimento">
    <DadosAtendimento />
    <TempoAtendimento />
    <ObsAtendimento />
  </div>
</template>
<script setup lang="ts">
import DadosAtendimento from './DadosAtendimento.vue';
import ObsAtendimento from './ObsAtendimento.vue';
import TempoAtendimento from './TempoAtendimento.vue';
</script>

<style lang="scss" scoped>
.card-atendimento {
  background-color: #64e264;
  border-radius: 10px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5px;
  font-size: 15px;
}
</style>
