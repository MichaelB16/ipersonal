<template>
  <div class="row items-center full-width">
    <div class="col-auto">
      <q-icon :name="icon" class="text-grey-8" size="45px"></q-icon>
    </div>
    <div class="col">
      <b class="title text-grey-8 tw-ml-3 tw-text-[20px]">{{ title }}</b>
      <p class="subtitle text-grey-8 tw-ml-3 tw-text-[14px]">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppInput',
  emits: ['update:modelValue'],
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="scss" scoped>
.title {
  line-height: 20px;
}
.subtitle {
  line-height: 16px;
}
</style>
