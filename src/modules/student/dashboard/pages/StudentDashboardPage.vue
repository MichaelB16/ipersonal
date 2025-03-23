<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div class="col-12">
      <app-title-page
        icon="mdi-speedometer"
        title="Área do Aluno"
        subtitle="Aqui estão seus treinos e suas dietas"
      />
    </div>
  </div>
  <fieldset class="q-mt-sm q-mb-md">
    <legend>
      <q-chip color="secondary">
        <b class="tw-text-white">Hoje</b>
      </q-chip>
    </legend>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <template v-if="loading">
          <skeleton-card-dashboard height="tw-h-[425px]" />
        </template>
        <template v-else>
          <card-dashboard
            :title="`Treino - ${todayTraining.focus}`"
            color="secondary"
            icon="mdi-weight-lifter"
            height="tw-h-[425px]"
          >
            <card-exercises
              class="tw-p-4"
              show-btn-view
              :exercises="todayTraining.exercises"
            />
          </card-dashboard>
        </template>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <template v-if="loading">
          <skeleton-card-dashboard
            grid-diet="col-12"
            grid-height="75px"
            type="diet"
            height="tw-h-[420px]"
          />
        </template>
        <template v-else>
          <card-dashboard
            height="tw-h-[432px]"
            title="Dieta"
            color="secondary"
            icon="mdi-food-steak"
          >
            <card-diet
              class="tw-p-4"
              grid="col-12"
              height="tw-h-[75px]"
              :meals="todayDiet.meals"
            />
          </card-dashboard>
        </template>
      </div>
    </div>
  </fieldset>

  <fieldset class="q-mt-sm q-mb-md">
    <legend>
      <q-chip color="blue-grey-6">
        <b class="tw-text-white">Semanal</b>
      </q-chip>
    </legend>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-xs-12 col-sm-12 col-md-6">
        <template v-if="loading">
          <skeleton-card-dashboard height="tw-h-[420px]" />
        </template>
        <template v-else>
          <card-dashboard
            title="Treino"
            color="blue-grey-6"
            icon="mdi-weight-lifter"
            height="tw-max-h-[420px]"
          >
            <div class="row tw-py-3 tw-px-3">
              <q-timeline class="tw-px-[12px] tw-py-[0px]">
                <q-timeline-entry
                  v-for="(item, index) in training"
                  :key="index"
                  icon="mdi-calendar"
                  color="blue-grey-6"
                  :subtitle="`${item.day} - ${item.focus}`"
                >
                  <card-exercises :exercises="item.exercises" />
                </q-timeline-entry>
              </q-timeline>
            </div>
          </card-dashboard>
        </template>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <template v-if="loading">
          <skeleton-card-dashboard
            show-timeline
            type="diet"
            grid-height="140px"
            height="tw-h-[420px]"
          />
        </template>
        <template v-else>
          <card-dashboard
            title="Dieta"
            height="tw-max-h-[420px]"
            color="blue-grey-6"
            icon="mdi-food-steak"
          >
            <div class="row tw-py-4 tw-px-3">
              <q-timeline color="blue-grey-6" class="tw-px-[12px] tw-py-[0px]">
                <q-timeline-entry
                  v-for="(item, index) in diet"
                  :key="index"
                  icon="mdi-calendar"
                  :subtitle="item.day"
                >
                  <card-diet :meals="item.meals" />
                </q-timeline-entry>
              </q-timeline>
            </div>
          </card-dashboard>
        </template>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive, toRefs } from 'vue';
import CardDashboard from '../components/CardDashboard.vue';
import CardExercises from '../components/CardExercises.vue';
import CardDiet from '../components/CardDiet.vue';
import SkeletonCardDashboard from '../components/SkeletonCardDashboard.vue';
import { useDashboardStore } from 'src/modules/personal/dashboard/stores/dashboard.store';

export default defineComponent({
  name: 'StudentDashboard',
  components: {
    CardDashboard,
    CardExercises,
    CardDiet,
    SkeletonCardDashboard,
  },
  setup() {
    const dashboardStore = useDashboardStore();
    const state = reactive({
      loading: true,
    });

    onMounted(async () => {
      state.loading = true;
      await dashboardStore.REQUEST_GET_STUDENT_DASHBOARD();
      state.loading = false;
    });

    const training = computed(() => {
      return dashboardStore.listStudentDashboard.weekly_training;
    });

    const todayTraining = computed<any>(() => {
      const data = dashboardStore?.listStudentDashboard;
      let exercises = [];
      let day = '';
      let focus = '';
      if (data?.today_training) {
        const value = Object.values(data.today_training) as any[];
        exercises = value?.[0]?.exercises || [];
        day = value?.[0]?.day || '';
        focus = value?.[0]?.focus || '';
      }
      return { exercises, day, focus };
    });

    const todayDiet = computed<any>(() => {
      const data = dashboardStore?.listStudentDashboard;
      let meals = [];
      let day = '';
      if (data?.today_diet) {
        const value = Object.values(data.today_diet) as any[];
        meals = value?.[0]?.meals || [];
        day = value?.[0]?.day || '';
      }
      return { meals, day };
    });

    const diet = computed(() => {
      return dashboardStore.listStudentDashboard.weekly_diet;
    });

    return {
      training,
      diet,
      todayTraining,
      todayDiet,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
fieldset {
  border-radius: 10px;
  padding: 10px;
  &:first-of-type {
    margin-top: 10px;
    border: 1.5px dashed $secondary;
  }
  &:last-of-type {
    border: 1.5px dashed #607d8b;
  }
  legend {
    padding: 0 36px 0 36px;
  }
}
</style>
