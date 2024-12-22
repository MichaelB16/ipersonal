<template>
  <div
    class="tw-flex tw-animate-pulse tw-z-10 tw-flex-col tw-w-full tw-justify-center tw-items-center tw-h-full"
  >
    <img src="~/assets/loading.svg" alt="loading" class="tw-w-[60px] tw-h-[60px]"/>
    <span class="tw-mt-[2px] tw-animate-pulse tw-text-[15px]">
      Carregando ...
    </span>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLoading',
});
</script>
