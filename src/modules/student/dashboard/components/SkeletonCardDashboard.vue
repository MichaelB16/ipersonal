<template>
  <q-card bordered class="no-shadow">
    <q-card-section class="tw-border tw-p-[10px] tw-border-grey-2">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-auto">
          <q-skeleton type="circle" />
        </div>
        <div class="col">
          <q-skeleton height="60px" type="text" />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none tw-overflow-y-auto scroll" :class="height">
      <div
        class="row tw-px-4 tw-py-4 items-center q-col-gutter-y-md q-col-gutter-x-md"
      >
        <template v-if="type === 'diet'">
          <template v-if="showTimeline">
            <div class="col-12">
              <div class="row q-col-gutter-x-md items-center">
                <div class="col-auto">
                  <q-skeleton height="35px" width="35px" type="circle" />
                </div>
                <div class="col">
                  <q-skeleton height="30px" width="218px" type="text" />
                </div>
              </div>
            </div>
            <div class="col-1 tw-h-[280px]">
              <q-skeleton class="tw-rotate-0" height="300px" type="text" />
            </div>
            <div class="col-11 tw-h-[280px]">
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-6" v-for="value in 4" :key="value">
                  <q-skeleton width="100%" :height="gridHeight" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div :class="gridDiet" v-for="value in 4" :key="value">
              <q-skeleton width="100%" :height="gridHeight" />
            </div>
          </template>
        </template>
        <template v-else>
          <div class="col-12" v-for="value in 6" :key="value">
            <div class="row q-col-gutter-x-md">
              <div class="col-auto">
                <q-skeleton type="circle" />
              </div>
              <div class="col">
                <q-skeleton height="50px" type="text" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SkeletonCardDashboard',
  props: {
    type: {
      type: String,
      default: 'training',
      validator: (value) => {
        return value.includes(['training', 'diet']);
      },
    },
    showTimeline: {
      type: Boolean,
      default: false,
    },
    gridDiet: {
      type: String,
      default: 'col-6',
    },
    gridHeight: {
      type: String,
      default: '80px',
    },
    height: {
      type: String,
      default: 'tw-h-[425px]',
    },
  },
});
</script>
