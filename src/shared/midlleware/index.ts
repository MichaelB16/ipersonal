import { personalRoutes } from 'src/modules/users/route';
import { useCacheStorage } from '../composable/storage';
const storage = useCacheStorage();
const user = storage.getItemStorage('user-storage');

export const middlewareConfig = (to, next) => {
  if (user && to.path === '/') {
    next({ name: 'dashboard' });
  } else if (
    ((to.matched.some((record) => record.meta.auth) && !user) || !user) &&
    to.path !== '/login'
  ) {
    next({ name: 'login' });
  } else {
    next();
  }
};

export const middlewareRoute = () => {
  if (user?.type === 'personal') {
    return personalRoutes;
  }
  return personalRoutes;
};
