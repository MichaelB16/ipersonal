import { defineStore } from 'pinia';
import { newPasswordService } from '../services/new_password.service';

export const useNewPassowrdStore = defineStore('new_password', {
  state: () => ({
    loading: false,
  }),
  actions: {
    async REQUEST_CHECK_TOKEN(token: string) {
      return newPasswordService
        .checkToken(token)
        .then(({ data }) => {
          return data;
        })
        .finally(() => {});
    },
    async REQUEST_UPDATE_PASSWORD(id: number, data: { password: string }) {
      this.loading = true;
      return await newPasswordService
        .updatePassword(id, data)
        .then(({ data }) => {
          console.log('aqui:', data)
          return true;
        })
        .catch(() => {
          console.log('chegou')
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
