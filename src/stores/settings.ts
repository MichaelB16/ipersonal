import { defineStore } from 'pinia';
import { $http } from 'src/boot/axios';
import { IMenu } from 'src/shared/model/menu.type';
export const useSettingStore = defineStore('setting', {
  state: () => ({
    widthPage: 0,
    setting: {
      menu: [] as IMenu[],
    },
  }),
  actions: {
    SET_WIDTH_PAGE(value) {
      this.widthPage = value;
    },
    async requestSetting() {
      await $http.get('/setting').then(({ data }) => {
        this.setting = data;
      });
    },
  },
});
