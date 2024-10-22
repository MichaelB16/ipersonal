import { RouteRecordRaw } from 'vue-router';
import { middlewareRoute } from 'src/shared/midlleware';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/modules/signin/pages/SigninPage.vue'),
  },
  ...middlewareRoute(),
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/error/pages/ErrorNotFound.vue'),
  },
];

export default routes;
