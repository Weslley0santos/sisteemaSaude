<template>
  <q-page class="bg-background">
    <div class="p-3 md:p-4 lg:p-6">
      <h1 class="text-foreground font-bold text-xl md:text-2xl lg:text-3xl mb-4">
        {{ $t('stage.triage') }}
      </h1>

      <div class="flex flex-col gap-3">
        <cardAtendimento
          v-for="item in store.triagem"
          :key="item.senha"
          :atendimento="item"
          tipo="triagem"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import cardAtendimento from 'src/components/Atendimento/cardAtendimento.vue';
import { useAtendimentoStore } from 'src/stores/atendimentoStore';
import { onMounted } from 'vue';
const store = useAtendimentoStore();

onMounted(async () => {
  await store.carregarAtendimentos();
});
</script>
