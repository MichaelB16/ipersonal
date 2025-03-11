import { defineStore } from 'pinia';
import { dashboardService } from '../services/dashboard.service';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    listSummary: {},
    listStudentDashboard: {} as any,
  }),
  actions: {
    async REQUEST_GET_SUMMARY() {
      await dashboardService.getSummary().then(({ data }) => {
        this.listSummary = data;
      });
    },
    async REQUEST_GET_STUDENT_DASHBOARD() {
      await dashboardService.getStudentDashboard().then(({ data }) => {
        this.listStudentDashboard = data;
      });
    },
  },
});
