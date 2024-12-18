<template>
  <router-view />
  <div
    class="tw-absolute alert tw-top-0 xs:tw-left-[25%] sm:tw-left-[50%] tw-z-[9999] tw-w-auto tw-flex tw-justify-center tw-items-start"
  >
    <div
      class="tw-flex tw-w-full tw-rounded-bl-[20px] tw-rounded-br-[20px] tw-z-[9999] tw-cursor-pointer bg-grey-4 tw-items-center tw-p-2"
      @click="open = !open"
    >
      <template v-if="open">
        <q-icon
          name="mdi-information"
          class="tw-text-primary"
          size="20px"
          :class="{ 'tw-mr-2': open }"
        />
        <b class="tw-text-primary">{{ text }}</b>
      </template>

      <q-icon
        :class="{ 'tw-ml-2': open }"
        class="tw-text-primary"
        size="20px"
        name="mdi-menu-down"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      open: true,
      text: 'Em desenvolvimento ...',
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
