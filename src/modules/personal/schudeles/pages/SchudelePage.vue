<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <div class="row q-col-gutter-y-md">
      <div class="col-12">
        <app-title-page
          icon="mdi-calendar-outline"
          title="Configure sua agenda"
          subtitle="Configure horário e agenda das suas aulas"
        />
      </div>
      <div class="col-12">
        <q-card class="no-shadow">
          <q-card-section class="no-padding tw-h-[calc(100vh_-_180px)]">
            <div class="tw-flex tw-h-full tw-justify-center">

            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-intersection>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SchudelePage',
  setup() {
    return {};
  },
});
</script>
