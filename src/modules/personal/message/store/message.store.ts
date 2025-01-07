import {defineStore} from 'pinia';
import { messageService } from '../services/message.service';

export const useMessageStore = defineStore('message', {
  state: () => ({
    listMessage: {},
    loading: false,
  }),
  actions: {
    async REQUEST_GET_MESSAGE() {
      this.loading = true
      await messageService.getAllMessage().then(({data}) => {
        console.log(data)
        this.listMessage = data;
      }).finally(() => {
        this.loading = false
      })
    },
    async REQUEST_ADD_OR_UPDATE_MESSAGE(data) {
      this.loading = true;
      return await messageService.createOrUpdate(data).then(async () => {
        await this.REQUEST_GET_MESSAGE()
        return true;
      }).finally(() => {
        this.loading = false;
      }).catch(() => {
        return false;
      })
    }
  },
});
