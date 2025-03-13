import { personalRoutes } from 'src/router/types/personal';
import { studentRoutes } from 'src/router/types/student';
import { useCacheStorage } from '../composable/storage';
const storage = useCacheStorage();
const user = storage.getItemStorage('user-storage');

export const middlewareConfig = (to, next) => {
  const hasMeta = to.matched.some((record) => record.meta.auth);
  if (user) {
    return to.path === '/' ? next({ name: 'dashboard' }) : next();
  } else if ((hasMeta || !user) && to.meta?.auth) {
    return next({ name: 'login' });
  } else if (to.path === '/') {
    return next({ name: 'login' });
  }
  return next();
};

export const middlewareRoute = () => {
  if (user) {
    if (user?.type === 'personal') {
      return personalRoutes;
    }
    return studentRoutes;
  }

  return [...studentRoutes, ...personalRoutes];
};
