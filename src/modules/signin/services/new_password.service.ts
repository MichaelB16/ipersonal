import { $http } from 'src/boot/axios';

class newPasswordServiceHttp {
  checkToken(token: string) {
    return $http.post(`new_password/verify/${token}`);
  }
  updatePassword(id: number, data: { password: string }) {
    return $http.put(`new_password/update/${id}`, data);
  }
}

export const newPasswordService = new newPasswordServiceHttp();
