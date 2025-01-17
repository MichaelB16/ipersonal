<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-skeleton-title />
    </div>
    <div class="col-12">
      <q-skeleton height="95px" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DashboardSkeleton'
})
</script>
