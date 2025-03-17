import { $http } from 'src/boot/axios';

class userServiceHttp {
  createPersonal(data: { email: string; password: string }) {
    return $http.post('personal/register', data);
  }
  updateUser(id: number, data: { name: string; password: string }) {
    return $http.put(`users/${id}`, data);
  }
}

export const userService = new userServiceHttp();
