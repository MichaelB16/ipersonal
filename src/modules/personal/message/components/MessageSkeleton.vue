<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-skeleton-title />
    </div>
    <div class="col-12">
      <q-card bordered class="no-shadow">
        <q-card-section class="tw-border">
          <q-skeleton width="200px" />
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-y-md">
            <div class="col-12" v-for="item in 2" :key="item">
              <q-skeleton height="100px" class="tw-w-full" />
            </div>
            <div class="col-12">
              <div class="tw-flex tw-justify-end">
                <q-skeleton width="120px" height="40px" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import AppSkeletonTitle from 'src/shared/components/AppSkeletonTitle.vue';
export default defineComponent({
  name: 'MessageSkeleton',
  components: {
    AppSkeletonTitle,
  },
});
</script>
