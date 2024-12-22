import { defineStore } from 'pinia';
import { authService } from '../services/auth.service';
import { useCacheStorage } from 'src/shared/composable/storage';
import { userService } from '../services/user.service';
const storage = useCacheStorage();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    error: '',
    success: '',
    loading: false,
    loadingGoogle: false,
  }),
  actions: {
    async REQUEST_LOGIN(data: { email: string; password: string }) {
      this.loading = true;
      return await authService
        .login(data)
        .then(({ data }) => {
          storage.setItemStorage('user-storage', data.user);
          storage.setItemStorage('user-token', data.token);
          return true;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          this.error = 'E-mail ou senha inválidos! Tente novamente.';
          return false;
        });
    },
    async REQUEST_CREATE_USER(data) {
      this.loading = true;
      return await userService.createPersonal(data).then(() => {
        this.success = 'Cadastro concluído! Verifique seu e-mail.'
        return true;
      }).catch(() => {
        this.error = 'Error ao realizar cadastro!';
        return false;
      }).finally(() => {
        this.loading = false
      })
    },
    async REQUEST_LOGIN_GOOGLE(params) {
      this.loadingGoogle = true;
      return await authService.loginGoogle(params).then(({ data }) => {
        storage.setItemStorage('user-storage', data.user);
        storage.setItemStorage('user-token', data.token);
        return true;
      }).finally(() => {
        this.loadingGoogle = false;
      }).catch(() => {
        this.error = 'Error ao fazer login com google!';
        return false;
      });
    },
    async REQUEST_LOGOUT() {
      await authService.logout().then(() => {
        localStorage.clear()
        window.location.href = '/login'
      })
    }
  },
});
