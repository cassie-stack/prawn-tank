<template>
  <q-page padding>
    <h1>Users</h1>

    <management-table title="Users" :rows="rows" :columns="columns" />
  </q-page>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import ManagementTable from 'components/ManagementTable.vue';
import User from 'models/User';

export default defineComponent({
  name: 'SettingsUsers',
  components: {
    ManagementTable,
  },
  data() {
    return {
      rows: [new User(1, 'sophie'), new User(2, 'sara')],
      columns: [
        {
          name: 'id',
          label: 'Id',
          field: 'id',
          align: 'left',
          style: 'width: 100px;',
        },
        {
          name: 'username',
          label: 'Username',
          field: 'username',
          align: 'left',
        },
      ],
    };
  },
});
</script>
