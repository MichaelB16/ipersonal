import { defineStore } from 'pinia';
import { IMenu } from 'src/shared/model/menu.type';
import { settingsService } from 'src/modules/personal/settings/services/SettingsService';
import { useNotification } from 'src/shared/composable/notification';
const { success, error } = useNotification();
export const useSettingStore = defineStore('settings', {
  state: () => ({
    widthPage: 0,
    loadingSetting: false,
    isDark: false,
    setting: {
      menu: [] as IMenu[],
    },
    userData: {
      name: '',
      phone: '',
      logo: '',
    },
  }),
  actions: {
    SET_WIDTH_PAGE(value) {
      this.widthPage = value;
    },
    async requestSettings() {
      this.loadingSetting = true;
      await settingsService
        .getSettings()
        .then(({ data }) => {
          this.setting = data;
          this.userData = data.user;
        })
        .finally(() => {
          this.loadingSetting = false;
        });
    },
    async requestSetSettings(data) {
      await settingsService
        .saveSettings(data)
        .then(async () => {
          success();
          await this.requestSettings();
        })
        .catch(() => error());
    },
  },
});
