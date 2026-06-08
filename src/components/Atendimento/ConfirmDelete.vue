<template>
  <q-dialog v-model="aberto" persistent no-backdrop-dismiss no-esc-dismiss>
    <q-card
      class="w-full max-w-sm rounded-2xl bg-surface text-foreground border border-border shadow-2xl"
    >
      <q-card-section>
        <h2 class="text-lg font-bold">
          {{ $t('dialog.deleteTitle') }}
        </h2>
      </q-card-section>

      <q-card-section>
        {{ $t('dialog.deleteMessage') }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('common.cancel')" aria-label="Cancelar exclusão" v-close-popup />
        <q-btn
          color="negative"
          :label="$t('button.delete')"
          aria-label="Confirmar exclusão"
          @click="confirmar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ConfirmDelete',
});

const aberto = defineModel<boolean>({
  required: true,
});

const emit = defineEmits<{
  (e: 'confirmar'): void;
}>();

const confirmar = () => {
  emit('confirmar');
};
</script>
