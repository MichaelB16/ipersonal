import { defineStore } from 'pinia';
import { messageService } from '../services/message.service';
import { useNotification } from 'src/shared/composable/notification';
const notification = useNotification();

export const useMessageStore = defineStore('message', {
  state: () => ({
    listMessage: {},
    loading: false,
  }),
  actions: {
    async REQUEST_GET_MESSAGE() {
      this.loading = true;
      await messageService
        .getAllMessage()
        .then(({ data }) => {
          this.listMessage = data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async REQUEST_ADD_OR_UPDATE_MESSAGE(data) {
      this.loading = true;
      return await messageService
        .createOrUpdate(data)
        .then(() => {
          notification.success();
          this.REQUEST_GET_MESSAGE();
          return true;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
          return false;
        });
    },
  },
});
