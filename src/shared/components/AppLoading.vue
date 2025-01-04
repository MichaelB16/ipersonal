<template>
  <div
    class="tw-flex tw-animate-pulse tw-z-10 tw-flex-col tw-w-full tw-justify-center tw-items-center tw-h-full"
  >
    <img
      src="~/assets/loading.svg"
      alt="loading"
      loading="lazy"
      :class="size"
    />
    <span  v-if="!hideText" class="tw-mt-[2px] tw-animate-pulse tw-text-[15px]">
      Carregando ...
    </span>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLoading',
  props: {
    hideText: {
      type: Boolean,
      default: false
    },
    size: {
      type:String,
      default: 'tw-w-[60px] tw-h-[60px]'
    }
  }
});
</script>
