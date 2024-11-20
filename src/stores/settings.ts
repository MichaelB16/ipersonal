import {defineStore} from 'pinia';

export const useSettingStore = defineStore('setting', {
  state: () => ({
    widthPage: 0,
  }),
  actions: {
    SET_WIDTH_PAGE(value) {
      this.widthPage = value
    }
  },
});
