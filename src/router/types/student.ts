import { RouteRecordRaw } from 'vue-router';

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    name: 'base',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: 'dashboard',
        name: 'student.dashboard',
        meta: { auth: true },
        component: () =>
          import(
            'src/modules/student/dashboard/pages/StudentDashboardPage.vue'
          ),
      },
    ],
  },
];
