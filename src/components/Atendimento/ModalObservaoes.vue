<template>
  <q-dialog v-model="aberto">
    <q-card class="w-full max-w-lg bg-surface">
      <q-card-section>
        <div class="text-h6">
          {{ $t('service.observation') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="texto"
          :label="$t('service.observation')"
          type="textarea"
          autogrow
          autofocus
          outlined
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.cancel')" class="bg-red" color="white" @click="fechar" />

        <q-btn
          color="secondary"
          :label="$t('button.saveNote')"
          :disable="!texto.trim()"
          @click="salvar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'salvar', texto: string): void;
}>();

const aberto = ref(false);
const texto = ref('');

const abrir = () => {
  texto.value = '';
  aberto.value = true;
};

const fechar = () => {
  texto.value = '';
  aberto.value = false;
};

const salvar = () => {
  if (!texto.value.trim()) return;

  emit('salvar', texto.value.trim());

  fechar();
};

defineExpose({
  abrir,
});
</script>
