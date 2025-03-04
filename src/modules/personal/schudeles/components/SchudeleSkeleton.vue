<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-skeleton-title />
    </div>
    <div class="col-12">
      <q-skeleton class="tw-w-full tw-h-[calc(100vh_-_180px)]"></q-skeleton>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import AppSkeletonTitle from 'src/shared/components/AppSkeletonTitle.vue';
export default defineComponent({
  name: 'SchudeleSkeleton',
  components: {
    AppSkeletonTitle,
  },
});
</script>
