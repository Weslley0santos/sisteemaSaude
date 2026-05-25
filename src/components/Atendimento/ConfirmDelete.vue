<template>
  <q-dialog v-model="aberto" persistent no-backdrop-dismiss no-esc-dismiss>
    <q-card class="w-full max-w-sm rounded-2xl">
      <q-card-section>
        <h2 class="text-lg font-bold">
          {{ t('dialog.deleteTitle') }}
        </h2>
      </q-card-section>

      <q-card-section>
        {{ t('dialog.deleteMessage') }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="t('button.cancel')" aria-label="Cancelar exclusão" v-close-popup />
        <q-btn
          color="negative"
          :label="t('button.delete')"
          aria-label="Confirmar exclusão"
          @click="confirmar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirmar'): void;
}>();

const aberto = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const confirmar = () => {
  emit('confirmar');
};
</script>
