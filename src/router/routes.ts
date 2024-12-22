import { RouteRecordRaw } from 'vue-router';
import { middlewareRoute } from 'src/shared/midlleware';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('src/modules/signin/pages/SigninPage.vue'),
  },
  {
    path: '/new/password/:token',
    name: 'new_password',
    component: () => import('src/modules/signin/pages/NewPasswordPage.vue'),
  },
  ...middlewareRoute(),
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/error/pages/ErrorNotFound.vue'),
  },
];

export default routes;
