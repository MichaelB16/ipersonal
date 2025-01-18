import { $http } from 'src/boot/axios';

class userServiceHttp {
  createPersonal(data: { email: string; password: string }) {
    return $http.post('personal/register', data);
  }
}

export const userService = new userServiceHttp()
