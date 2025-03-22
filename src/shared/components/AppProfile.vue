<template>
  <div v-if="!loading" class="row q-gutter-x-sm tw-items-center no-wrap">
    <app-user-avatar />
    <div
      class="text-left tw-mb-0 tw-w-[80px] q-mt-sm tw-flex text-white tw-h-full column"
    >
      <b class="tw-leading-[8.5px] tw-text-primary ellipsis tw-w-[80px]">
        {{ name }}
      </b>
      <div class="tw-w-[80px] tw-text-primary ellipsis">
        {{ email }}
      </div>
    </div>
  </div>

  <div v-else class="row q-gutter-x-sm tw-items-center no-wrap">
    <q-skeleton size="40px" type="circle" />
    <div
      class="text-left tw-mb-0 tw-w-[80px] q-mt-sm tw-flex text-white tw-h-full column"
    >
      <b class="tw-leading-[8.5px] tw-text-primary ellipsis tw-w-[80px]">
        <q-skeleton height="15px" type="text" />
      </b>
      <div class="tw-w-[80px] tw-text-primary ellipsis">
        <q-skeleton height="15px" type="text" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AppUserAvatar from './AppUserAvatar.vue';
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
  setup() {},
});
</script>
