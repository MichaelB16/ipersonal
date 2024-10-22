<template>
  <q-table
    class="app-table"
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
import { defineComponent, useAttrs } from 'vue';
import { iPagination } from '../model/paginate.type';

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

    const setConfigPagination = (): iPagination => {
      const paginate = (attrs?.pagination || {}) as iPagination;
      return {
        sortBy: paginate?.sortBy || '',
        descending: paginate?.descending || false,
        page: paginate?.page || 1,
        rowsPerPage: paginate?.rowsPerPage || 15,
        total: 0,
      };
    };

    return {
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
