<template>
  <q-page>
    <div class="topo-pag">
      <h1 class="titulo"><strong>Em Atendimento</strong></h1>
      <div class="botao=atendimento"><NovoAtendimento /></div>
    </div>
    <div class="container">
      <FormsAtendimento />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import NovoAtendimento from 'src/components/botoes/NovoAtendimento.vue';
import FormsAtendimento from 'src/components/Atendimento/FormsAtendimento.vue';
//import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
</script>
<style lang="scss" scoped>
.titulo {
  color: rgb(0, 139, 7);
  text-align: center;
  margin: 10px;
  font-size: 32px;
}

.container {
  padding: 20px;
}

.topo-pag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
