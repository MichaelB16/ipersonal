<template>
  <div v-if="!loading" class="row q-gutter-x-sm tw-items-center no-wrap">
    <app-user-avatar />
    <div
      class="text-left tw-mb-0 tw-w-[80px] q-mt-sm tw-flex text-white tw-h-full column"
    >
      <b class="tw-leading-[8.5px] ellipsis tw-w-[80px]" :class="color">
        {{ name }}
      </b>
      <div class="tw-w-[80px] ellipsis" :class="color">
        {{ email }}
      </div>
    </div>
  </div>

  <div v-else class="row q-gutter-x-sm tw-items-center no-wrap">
    <q-skeleton size="40px" type="circle" />
    <div
      class="text-left tw-mb-0 tw-w-[80px] q-mt-sm tw-flex text-white tw-h-full column"
    >
      <b class="tw-leading-[8.5px] ellipsis tw-w-[80px]" :class="color">
        <q-skeleton height="15px" type="text" />
      </b>
      <div class="tw-w-[80px] ellipsis" :class="color">
        <q-skeleton height="15px" type="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import AppUserAvatar from './AppUserAvatar.vue';
import { useSettingStore } from 'src/stores/settings';
export default defineComponent({
  name: 'AppProfile',
  components: {
    AppUserAvatar,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  setup() {
    const settingStore = useSettingStore();

    const color = computed(() => {
      return settingStore.isDark ? 'text-white' : 'text-grey-8';
    });

    return {
      color,
    };
  },
});
</script>
