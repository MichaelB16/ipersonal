import { RouteRecordRaw } from 'vue-router';
import { middlewareRoute } from 'src/shared/midlleware';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/modules/signin/pages/SigninPage.vue'),
  },
  {
    path: '/new/password/:token',
    name: 'new_password',
    component: () => import('src/modules/signin/pages/NewPasswordPage.vue'),
  },
  {
    path: '/forgot/password',
    name: 'forgot_password',
    component: () => import('src/modules/signin/pages/ForgotPasswordPage.vue'),
  },
  ...middlewareRoute(),
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/error/pages/ErrorNotFound.vue'),
  },
];

export default routes;
