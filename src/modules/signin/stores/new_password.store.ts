import { defineStore } from 'pinia';
import { newPasswordService } from '../services/new_password.service';

export const useNewPassowrdStore = defineStore('new_password', {
  state: () => ({
    loading: false,
    loadingPage: false,
  }),
  actions: {
    async REQUEST_CHECK_TOKEN(token: string) {
      this.loadingPage = true;
      return await newPasswordService
        .checkToken(token)
        .then(({ data }) => {
          return data;
        })
        .catch(() => {
          return null;
        })
        .finally(() => {
          this.loadingPage = false;
        });
    },
    async REQUEST_UPDATE_PASSWORD(id: number, data: { password: string }) {
      this.loading = true;
      return await newPasswordService
        .updatePassword(id, data)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
