<template>
  <q-card bordered class="no-shadow">
    <q-card-section class="tw-border tw-border-grey-2">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-auto">
          <q-avatar :color="color" size="35px">
            <q-icon size="20px" color="white" :name="icon" />
          </q-avatar>
        </div>
        <div class="col-auto">
          <b class="tw-text-[18px] text-grey-8"> {{ title }} </b>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
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
    color: { type: String, required: true, default: 'grey-6' },
  },
});
</script>
