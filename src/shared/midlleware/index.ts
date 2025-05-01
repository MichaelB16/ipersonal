import { personalRoutes } from 'src/router/types/personal';
import { studentRoutes } from 'src/router/types/student';
import { useCacheStorage } from '../composable/storage';
import { removeUserStorage } from '../utils';

const storage = useCacheStorage();
const isPersonal = (user) => user?.type === 'personal';

export const middlewareConfig = (to, next) => {
  const user = storage.getItemStorage('user-storage');
  const hasMeta = to.matched.some((record) => record.meta.auth);
  if (user) {
    const name = isPersonal(user) ? 'dashboard' : 'student.dashboard';
    return to.path === '/' ? next({ name }) : next();
  } else if ((hasMeta || !user) && to.meta?.auth) {
    removeUserStorage();
    return next({ name: 'login' });
  } else if (to.path === '/') {
    removeUserStorage();
    return next({ name: 'login' });
  }
  return next();
};

export const middlewareRoute = () => {
  const user = storage.getItemStorage('user-storage');
  if (user) {
    return isPersonal(user) ? personalRoutes : studentRoutes;
  }
  return [...personalRoutes, ...studentRoutes];
};
