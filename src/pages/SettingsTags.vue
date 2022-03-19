<template>
  <q-page padding>
    <h1>Tags</h1>

    <management-table title="Tags" :rows="rows" :columns="columns" />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import ManagementTable from 'components/ManagementTable.vue';
import Tag from 'models/Tag';

export default defineComponent({
  name: 'SettingsTags',
  components: {
    ManagementTable,
  },
  data() {
    return {
      rows: [new Tag(1, 'furry'), new Tag(2, 'shrek')],
      columns: [
        {
          name: 'id',
          label: 'Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px;',
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
        },
      ],
    };
  },
});
</script>
