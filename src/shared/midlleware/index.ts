import { personalRoutes } from 'src/router/types/personal';
import { studentRoutes } from 'src/router/types/student';
import { useCacheStorage } from '../composable/storage';
const storage = useCacheStorage();

export const middlewareConfig = (to, next) => {
  const user = storage.getItemStorage('user-storage');
  const hasMeta = to.matched.some((record) => record.meta.auth);
  if (user) {
    return to.path === '/' ? next({ name: 'dashboard' }) : next();
  } else if ((hasMeta || !user) && to.meta?.auth) {
    localStorage.clear();
    return next({ name: 'login' });
  } else if (to.path === '/') {
    localStorage.clear();
    return next({ name: 'login' });
  }
  return next();
};

export const middlewareRoute = () => {
  const user = storage.getItemStorage('user-storage');
  if (user) {
    if (user?.type === 'personal') {
      return personalRoutes;
    }
    return studentRoutes;
  }

  return [...personalRoutes, ...studentRoutes];
};
