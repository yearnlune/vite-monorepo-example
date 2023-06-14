<template>
  <CommonDialog
    v-model="dialog"
    :loading="loading"
    width="520"
    cancel-label="Cancel"
    submit-label="Delete"
    @cancel="cancel"
    @submit="deleteItem"
  >
    <v-card-title class="mb-6">
      {{ props.title }}
    </v-card-title>
  </CommonDialog>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import CommonDialog from '@/components/CommonDialog.vue';

const props = withDefaults(
  defineProps<{
    id: string;
    title?: string;
  }>(),
  {
    title: `Are you sure you want to delete this item ?`,
  },
);
const emit = defineEmits(['update:modelValue', 'deleteItem', 'cancel']);
const loading: Ref<boolean> = ref(false);
const dialog: Ref<boolean> = ref(false);

function deleteItem() {
  emit('deleteItem', props.id);
  emit('update:modelValue', false);
}

function cancel() {
  emit('update:modelValue', false);
  emit('cancel');
}
</script>
