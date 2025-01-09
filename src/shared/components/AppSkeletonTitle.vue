<template>
  <div class="row items-center full-width">
    <div class="col-auto">
      <q-skeleton type="circle" />
    </div>
    <div class="col">
      <p class="title tw-text-primary tw-ml-3 tw-text-[20px]">
        <q-skeleton type="text" width="150px" />
      </p>
      <p class="subtitle tw-text-primary tw-ml-3 tw-text-[14px]">
       <q-skeleton type="text" class="xs:tw-w-[250px] sm:tw-w-[300px]" />
      </p>
    </div>
    <slot />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSkeletonTitle',
});
</script>
