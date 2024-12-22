<template>
  <div class="row tw-min-h-[100dvh] tw-h-full">
    <div class="col-md-8 col-sm-6 xs:tw-hidden sm:tw-block bg-primary">
      <slot name="banner" />
    </div>
    <div class="col">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthWrapper'
})
</script>
