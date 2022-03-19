<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Prawn Tank</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header>Media</q-item-label>

        <q-item-label header>Settings</q-item-label>

        <DrawerLink
          title="General"
          caption="Manage general settings"
          icon="settings"
          :to="{ name: 'settings-general' }"
        />

        <DrawerLink
          title="Tags"
          caption="Manage tags"
          icon="tag"
          :to="{ name: 'settings-tags' }"
        />

        <DrawerLink
          title="Users"
          caption="Manage users"
          icon="people"
          :to="{ name: 'settings-users' }"
        />
      </q-list>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import DrawerLink from 'components/DrawerLink.vue';

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    DrawerLink,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const rightDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
