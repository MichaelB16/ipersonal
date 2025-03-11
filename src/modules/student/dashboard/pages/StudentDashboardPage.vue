<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div class="col-12">
      <app-title-page
        icon="mdi-speedometer"
        title="Dashboard"
        subtitle="Aqui estão seus treinos e suas dietas"
      />
    </div>
    <div class="col-6">
      <card-dashboard title="Treino do dia" icon="mdi-weight-lifter">
      </card-dashboard>
    </div>
    <div class="col-6">
      <card-dashboard
        title="Dieta do dia"
        color="red-10"
        icon="mdi-food-steak"
      />
    </div>
    <div class="col-6">
      <card-dashboard title="Treino Semanal" icon="mdi-weight-lifter">
        <div
          class="row tw-py-4 tw-px-3 tw-max-h-[420px] tw-overflow-y-auto scroll"
        >
          <q-timeline
            color="grey-6"
            v-for="(item, index) in training"
            :key="index"
            class="tw-px-[12px] tw-py-[0px]"
          >
            <q-timeline-entry
              icon="mdi-calendar"
              :subtitle="`${item.day} - ${item.focus}`"
            >
              <div class="row q-col-gutter-y-sm">
                <div
                  class="col-12"
                  v-for="(exercise, m) in item.exercises"
                  :key="m"
                >
                  <q-card bordered class="no-shadow" dense>
                    <q-card-section class="tw-p-3 tw-h-[45px]">
                      <div class="row">
                        <div class="col-12">
                          <b class="text-grey-8">
                            <q-icon
                              size="25px"
                              color="primary"
                              :name="`mdi-numeric-${m + 1}-circle`"
                            />
                            {{ exercise.name }}
                          </b>
                          <small class="q-ml-sm tw-leading-2 tw-text-[12px]">
                            {{ exercise.series }} x {{ exercise.repeat }}
                          </small>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </card-dashboard>
    </div>
    <div class="col-6">
      <card-dashboard
        title="Dieta Semanal"
        color="red-10"
        icon="mdi-food-steak"
      >
        <div class="row tw-py-4 tw-px-3 tw-max-h-[420px] tw-overflow-y-auto">
          <q-timeline
            color="grey-8"
            v-for="(item, index) in diet"
            :key="index"
            class="tw-px-[12px] tw-py-[0px]"
          >
            <q-timeline-entry icon="mdi-calendar" :subtitle="item.day">
              <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                <div class="col-6" v-for="(meal, m) in item.meals" :key="m">
                  <q-card bordered class="no-shadow" dense>
                    <q-card-section class="tw-p-3 tw-h-[125px]">
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
                  </q-card>
                </div>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </card-dashboard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import CardDashboard from '../components/CardDashboard.vue';
import { useDashboardStore } from 'src/modules/personal/dashboard/stores/dashboard.store';

export default defineComponent({
  name: 'StudentDashboard',
  components: {
    CardDashboard,
  },
  setup() {
    const dashboardStore = useDashboardStore();

    onMounted(async () => {
      await dashboardStore.REQUEST_GET_STUDENT_DASHBOARD();
    });

    const training = computed(() => {
      return dashboardStore.listStudentDashboard.weekly_training;
    });

    const diet = computed(() => {
      return dashboardStore.listStudentDashboard.weekly_diet;
    });

    return {
      training,
      diet,
    };
  },
});
</script>
