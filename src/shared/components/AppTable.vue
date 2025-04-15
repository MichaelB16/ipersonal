<template>
  <q-table
    class="app-table"
    :dark="dark"
    :rows="rows"
    :pagination="paginate"
    v-bind="$attrs"
  >
    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </q-table>
</template>
<script lang="ts">
import { computed, defineComponent, useAttrs } from 'vue';
import { IPagination } from '../model/paginate.type';
import { useSettingStore } from 'src/stores/settings';

export default defineComponent({
  name: 'AppTable',
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const attrs = useAttrs();
    const settingStore = useSettingStore();

    const dark = computed(() => {
      return settingStore.isDark;
    });

    const setConfigPagination = (): IPagination => {
      const paginate = (attrs?.pagination || {}) as IPagination;
      return {
        sortBy: paginate?.sortBy || '',
        descending: paginate?.descending || false,
        page: paginate?.page || 1,
        rowsPerPage: paginate?.rowsPerPage || 15,
        total: 0,
        total_data: 0,
      };
    };

    return {
      dark,
      paginate: setConfigPagination(),
      setConfigPagination,
    };
  },
});
</script>
<style lang="scss">
.app-table {
  .q-table__top {
    padding: 0 !important;
  }
  thead {
    th {
      background: #e7e7e791;
    }
  }
}
</style>
