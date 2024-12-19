import { defineStore } from 'pinia';
import { dashboardService } from '../services/dashboard.service';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    listSummary: {},
  }),
  actions: {
    async REQUEST_GET_SUMMARY() {
      await dashboardService.getSummary().then(({ data }) => {
        this.listSummary = data;
      });
    },
  },
});
