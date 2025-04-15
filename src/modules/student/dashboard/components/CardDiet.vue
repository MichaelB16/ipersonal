<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div :class="grid" v-for="(meal, m) in meals" :key="m">
      <app-card bordered class="no-shadow tw-border-l-8" dense>
        <q-card-section class="tw-p-3" :class="height">
          <div class="row">
            <div class="col-12">
              <b class="text-grey-8">{{ meal.label }}</b>
            </div>
            <div class="col-12">
              <span class="tw-leading-2 tw-text-[12px]">
                {{ meal.description }}
              </span>
            </div>
          </div>
        </q-card-section>
      </app-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CardDiet',
  props: {
    grid: {
      type: String,
      default: 'col-xs-12 col-sm-12 col-md-6',
    },
    height: {
      type: String,
      default: 'tw-h-[132px]',
    },
    meals: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>
