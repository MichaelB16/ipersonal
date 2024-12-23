import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useCacheStorage } from 'src/shared/composable/storage';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
export const $http = axios.create({ baseURL: `${process.env.API_URL}/api/v1/` });
const storage = useCacheStorage();
const token = storage.getItemStorage('user-token')

$http.interceptors.request.use(
  (config) => {
    if(token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status:number = error.response.status;

    if(status === 401 && token) {
      localStorage.clear();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = $http;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
