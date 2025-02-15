<template>
  <iframe
    :src="getIframeURL"
    frameborder="0"
    scrolling="no"
    class="tw-w-full tw-h-full tw-border tw-border-[#ccc] tw-rounded"
  >
  </iframe>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useGoogleCalendar } from '../composable/calendar';

export default defineComponent({
  name: 'AppGoogleCalendar',
  setup() {
    const { getIframeURL } = useGoogleCalendar();

    return {
      getIframeURL,
    };
  },
});
</script>
