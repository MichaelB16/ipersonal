import { defineStore } from 'pinia';
import { $http } from 'src/boot/axios';
import { IMenu } from 'src/shared/model/menu.type';
export const useSettingStore = defineStore('setting', {
  state: () => ({
    widthPage: 0,
    loadingSetting: false,
    setting: {
      menu: [] as IMenu[],
    },
  }),
  actions: {
    SET_WIDTH_PAGE(value) {
      this.widthPage = value;
    },
    async requestSetting() {
      this.loadingSetting = true;
      await $http
        .get('/setting')
        .then(({ data }) => {
          this.setting = data;
        })
        .finally(() => {
          this.loadingSetting = false;
        });
    },
  },
});
