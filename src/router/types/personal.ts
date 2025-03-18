import { RouteRecordRaw } from 'vue-router';

export const personalRoutes: RouteRecordRaw[] = [
  {
    path: '/personal',
    name: 'base',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { auth: true },
        component: () =>
          import('src/modules/personal/dashboard/pages/DashboardPage.vue'),
      },
      {
        path: 'students',
        name: 'students',
        meta: { auth: true },
        component: () =>
          import('src/modules/personal/students/pages/StudentsPage.vue'),
      },
      {
        path: 'message',
        name: 'message',
        meta: { auth: true },
        component: () =>
          import('src/modules/personal/message/pages/MessagePage.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        meta: { auth: true },
        component: () =>
          import('src/modules/personal/settings/pages/SettingsPage.vue'),
      },
      {
        path: 'calendar',
        name: 'calendar',
        meta: { auth: true },
        component: () =>
          import('src/modules/personal/schudeles/pages/SchudelePage.vue'),
      },
    ],
  },
];
