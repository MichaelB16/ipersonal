import {$http} from 'src/boot/axios';

class dashboardServiceHttp {
  getSummary() {
    return $http.get('dashboard/summary');
  }
}

export const dashboardService = new dashboardServiceHttp()
