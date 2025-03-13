<template>
  <q-card bordered class="no-shadow">
    <q-card-section class="tw-border tw-p-[10px] tw-border-grey-2">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-auto">
          <q-avatar :color="color" size="35px">
            <q-icon size="20px" color="white" :name="icon" />
          </q-avatar>
        </div>
        <div class="col-auto">
          <b class="tw-text-[16px] text-grey-8"> {{ title }} </b>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none tw-overflow-y-auto scroll" :class="height">
      <slot />
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardDashboard',
  props: {
    title: { type: String, required: true, default: '' },
    icon: { type: String, required: true, default: '' },
    height: { type: String, default: '' },
    color: { type: String, default: 'grey-6' },
  },
});
</script>
