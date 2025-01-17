import { $http } from 'src/boot/axios';

class forgotPasswordServiceHttp {
  forgotPassword(data: { email: string }) {
    return $http.post('forgot_password/verify', data);
  }
}

export const forgotPasswordService = new forgotPasswordServiceHttp();
