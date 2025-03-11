import { $http } from 'src/boot/axios';

class dashboardServiceHttp {
  getSummary() {
    return $http.get('dashboard/summary');
  }

  getStudentDashboard() {
    return $http.get('dashboard/students');
  }
}

export const dashboardService = new dashboardServiceHttp();
