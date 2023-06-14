<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    :items-length="total"
    :page="pageNumber"
    :items-per-page="limit"
    @update:options="fetch"
  >
    <template #top>
      <v-toolbar color="white" density="compact">
        <v-toolbar-title class='d-flex'>Users</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            class='mr-0'
            variant='outlined'
            :prepend-icon="mdiPlus"
            @click="onCreateClick"
        >CREATE</v-btn>
      </v-toolbar>
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex align-center">
        <v-icon
            :icon="mdiPencil"
            @click="onUpdateClick(item.raw)"
        />
        <v-icon
            :icon="mdiTrashCan"
            @click="onDeleteClick(item.raw)"
        />
      </div>
    </template>
  </v-data-table-server>
  <CommonDialog
      v-model="createDialog"
      :loading="dialogLoading"
      @cancel="onClickCancel"
      @submit="upsert"
  >
    <slot
        name="createItem"
        :predefined-item="selectedItem"
        :refetch="fetch"
    ></slot>
  </CommonDialog>
  <DeleteDialog
      :id="selectedItemId"
      v-model="deleteDialog"
      :loading="dialogLoading"
      @delete-item="remove"
      @cancel="onClickCancel"
  ></DeleteDialog>
</template>
<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { exampleClient } from '@/service/axios/exampleClient';
import { mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js';
import DeleteDialog from '@/components/DeleteDialog.vue';
import CommonDialog from '@/components/CommonDialog.vue';

const headers = [
  {
    title: "OID",
    key: 'id',
    sortable: false,
  },
  {
    title: "NAME",
    key: 'name',
  },
  {
    title: "EMAIL",
    key: 'email',
    align: 'start',
  },
  {
    key: 'actions',
    align: 'end',
    sortable: false,
    width: 100,
  },
];

const items: Ref<any[]> = ref([]);
const selectedItem: Ref<any> = ref(undefined);
const total = ref(0);
const pageNumber = ref(1);
const limit = ref(10);

const createDialog = ref(false);
const deleteDialog = ref(false);
const dialogLoading = ref(false);

const selectedItemId = computed(() => {
  return selectedItem?.value?.id ?? '';
});

function fetch({ page, itemsPerPage, sortBy }: any) {
  return exampleClient
    .findUsers({
      sorts:
        sortBy?.map((sort: any) => ({
          property: sort.key,
          direction: sort.order,
        })) || [],
      offset: page - 1,
      limit: itemsPerPage as number,
    })
    .then((response) => {
      items.value = response.data.items;
      total.value = response.data.total;
      limit.value = itemsPerPage;
      pageNumber.value = page;
    });
}


function create() {

}

function update() {

}

function upsert() {
  if (selectedItem.value) {
    update();
  } else {
    create();
  }
}

function remove(id: string) {

}
function onCreateClick() {
  createDialog.value = true;
}

function onUpdateClick(item: any) {
  selectedItem.value = item;
  createDialog.value = true;
}

function onDeleteClick(item: any) {
  selectedItem.value = item;
  deleteDialog.value = true;
}

function onClickCancel() {
  selectedItem.value = undefined;
  createDialog.value = false;
}

</script>
