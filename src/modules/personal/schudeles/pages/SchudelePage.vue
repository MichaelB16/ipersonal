<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <template v-if="loadingPage">
      <schudele-skeleton />
    </template>
    <template v-else>
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
                <app-google-calendar />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-intersection>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import SchudeleSkeleton from '../components/SchudeleSkeleton.vue';
export default defineComponent({
  name: 'SchudelePage',
  components: { SchudeleSkeleton },
  setup() {
    const state = reactive({
      loadingPage: false,
    });

    onMounted(() => {
      state.loadingPage = true;
      setTimeout(() => {
        state.loadingPage = false;
      }, 3000);
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
