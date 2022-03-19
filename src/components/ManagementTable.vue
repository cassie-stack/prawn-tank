<template>
  <div class="column">
    <q-table
      v-model:selected="selected"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="multiple"
    />

    <div class="row">
      <q-btn label="Add" />
      <q-btn label="Delete" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'ManagementTable',
  props: {
    title: {
      type: String,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
    };
  },
});
</script>
