import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'settings/general', name: 'settings-general', component: () => import('pages/SettingsGeneral.vue') },
      { path: 'settings/tags', name: 'settings-tags', component: () => import('pages/SettingsTags.vue') },
      { path: 'settings/users', name: 'settings-users', component: () => import('pages/SettingsUsers.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
