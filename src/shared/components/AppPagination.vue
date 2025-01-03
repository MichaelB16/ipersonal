<template>
  <div class="row tw-w-full tw-justify-between tw-items-center">
    <div class="col-3"></div>
    <q-pagination
      size="sm"
      v-model="model"
      color="primary"
      v-bind="$attrs"
      direction-links
      boundary-links
      :max-pages="maxPages"
      :max="pagination.total"
    />
    <div class="row tw-gap-2 items-center text-grey-8 tw-text-[12px]">
      linha por página:
      <q-select
        dense
        v-model="rowsPerPage"
        map-options
        emit-value
        :options="options"
      />
      {{ pagination.page }} - {{ pagination.total_data }} de {{ rowsPerPage }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { configPagination } from 'src/shared/utils';

export default defineComponent({
  name: 'AppPagination',
  emits: ['update:modelValue', 'request'],
  props: {
    maxPages: {
      type: Number,
      default: 5,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    pagination: {
      type: Object,
      default: configPagination(),
    },
  },
  setup(props, { emit }) {
    const options = [10, 20, 50, 100, 200];
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(page: number) {
        emit('update:modelValue', page);
        emit('request', { page });
      },
    });

    const rowsPerPage = computed({
      get() {
        return props.pagination.rowsPerPage;
      },
      set(rowsPerPage: number) {
        emit('request', { page: 1, rowsPerPage });
      },
    });

    return {
      model,
      options,
      rowsPerPage,
    };
  },
});
</script>
