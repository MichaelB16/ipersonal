<template>
  <q-pagination
    size="sm"
    round
    v-model="model"
    color="primary"
    v-bind="$attrs"
    direction-links
    :max-pages="maxPages"
    :max="pagination.total"
  />
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {configPagination} from 'src/shared/utils';

export default defineComponent({
  name: 'AppPagination',
  emits: ['update:modelValue','request'],
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
      default: configPagination()
    }
  },
  setup(props, {emit}) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(page: number) {
        emit('update:modelValue', page);
        emit('request', {page});
      },
    });

    return {
      model,
    };
  },
});
</script>
