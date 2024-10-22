import { $http } from 'src/boot/axios';

class authServiceHttp {
  login(data: { email: string; password: string }) {
    return $http.post('login', data);
  }
  loginGoogle(data) {
    return $http.post('oauth/google', data)
  }
  logout() {
    return $http.post('logout');
  }
}

export const authService = new authServiceHttp()
