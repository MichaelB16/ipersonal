import { $http } from 'src/boot/axios';

class userServiceHttp {
  createPersonal(data: { email: string; password: string }) {
    return $http.post('add/personal', data);
  }
}

export const userService = new userServiceHttp()
