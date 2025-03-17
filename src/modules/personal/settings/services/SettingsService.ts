import { $http } from 'src/boot/axios';

class settingsServiceHttp {
  saveSettings(data) {
    return $http.post('settings', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  getSettings() {
    return $http.get('settings');
  }
}

export const settingsService = new settingsServiceHttp();
