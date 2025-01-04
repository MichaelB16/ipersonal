<template>
  <div class="absolute-full tw-bg-[#e6e6e6] tw-z-[99999]" v-if="loading && user">
    <div
      class="tw-flex tw-animate-pulse tw-flex-col tw-w-full tw-justify-center tw-items-center tw-h-full"
    >
      <img src="~/assets/loading.svg" alt="loading" />
      <b class="tw-mt-[2px] tw-animate-pulse tw-text-[18px]">
        Carregando ...
      </b>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useCacheStorage } from '../composable/storage';

export default defineComponent({
  name: 'AppLoadingScreen',
  setup() {
    const storage = useCacheStorage();
    const user = storage.getItemStorage('user-storage');
    const router = useRouter();
    const state = reactive({
      loading: true,
    });

    router.beforeEach((to, from, next) => {
      state.loading = true;
      next();
    });

    router.afterEach(() => {
      statePageLoading();
    });

    const statePageLoading = () => {
      let interval = setInterval(function () {
        if (document.readyState === 'complete') {
          state.loading = false;
          clearInterval(interval);
        }
      }, 800);
    };

    return {
      user,
      ...toRefs(state),
    };
  },
});
</script>
