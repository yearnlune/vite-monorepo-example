<template>
  <v-dialog v-model="dialog" outlined max-width="920" :width="width">
    <v-card class="pa-4">
      <slot></slot>
      <v-card-actions class="justify-end mr-6 pa-0">
        <v-btn color="grey" variant="text" @click="emitCancel">
          {{ cancelLabel }}
        </v-btn>
        <v-btn
          color="grey"
          :loading="loading"
          :disabled="!required"
          variant="text"
          @click="emitSubmit"
        >
          {{ submitLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    loading?: boolean;
    width?: string | number;
    required?: boolean;
    cancelLabel?: string;
    submitLabel?: string;
  }>(),
  {
    loading: false,
    width: undefined,
    required: true,
    cancelLabel: 'Disagree',
    submitLabel: 'Agree',
  },
);
const emits = defineEmits(['submit', 'cancel']);
const dialog = ref(false);

function emitSubmit() {
  emits('submit');
}

function emitCancel() {
  emits('cancel');
}
</script>
