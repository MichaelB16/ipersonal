<template>
  <q-card bordered class="no-shadow">
    <q-card-section class="tw-border">
      <div class="row items-center">
        <div class="col">
          <q-skeleton width="200px" />
        </div>
        <div class="col">
          <div class="tw-flex tw-gap-2 tw-items-center tw-justify-end">
            <q-skeleton width="250px" class="tw-rounded-full" height="40px" />
            <q-skeleton v-for="item in rowBtn" :key="item" type="circle" size="35px" />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="no-padding">
      <q-markup-table class="no-shadow">
        <thead>
          <tr>
            <th v-for="item in columnQuantity" :key="item" class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in dataQuantity" :key="n">
            <td v-for="item in columnQuantity" :key="item" class="text-left">
              <q-skeleton animation="blink" type="text" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSkeletonTable',
  props: {
    rowBtn: {
      type: Number,
      default: 2,
    },
    columnQuantity: {
      type: Number,
      default: 5,
    },
    dataQuantity: {
      type: Number,
      default: 5,
    },
  },
});
</script>
