<template>
  <div class="row tw-min-h-[100dvh] tw-h-full">
    <div
      class="col-md-7 col-lg-8 col-xl-9 col-sm-6 col-xs-12 xs:tw-hidden sm:tw-block bg-primary"
    >
      <slot name="banner" />
    </div>
    <div class="col-md-5 col-lg-4 col-xl-3 col-sm col-xs-12">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthWrapper',
});
</script>
