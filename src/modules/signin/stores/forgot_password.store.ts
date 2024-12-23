import { defineStore } from 'pinia';
import { forgotPasswordService } from '../services/forgot_password.services';

export const useForgotPassowrdStore = defineStore('forgot_password', {
  state: () => ({
    loading: false,
    notification: {
      type: '',
      message: '',
      visible: false,
    },
  }),
  actions: {
    async REQUEST_FORGOT_PASSWORD(data: { email: string }) {
      this.loading = true;
      return await forgotPasswordService
        .forgotPassword(data)
        .then(() => {
          this.notification = {
            type: 'success',
            message: 'Enviamos as instruções para sua caixa de entrada.',
            visible: true,
          };
          return true;
        })
        .catch(({ response }) => {
          const error = response.data
          const mailInvalid = 'Este e-mail não foi encontrado!'
          const mailGoogle = 'Esta conta está vinculada ao Google!'
          const message = (error === 'mail_invalid') ? mailInvalid : mailGoogle

          this.notification = {
            type: 'danger',
            message: message,
            visible: true,
          };

          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
