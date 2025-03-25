<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <template v-if="loadingPage">
      <dashboard-skeleton />
    </template>
    <template v-else>
      <div class="row q-col-gutter-y-md">
        <div class="col-12">
          <app-title-page
            icon="mdi-speedometer"
            title="Dashboard"
            subtitle="Aqui estão todos os seus indicadores"
          />
        </div>
        <div class="col-12">
          <div class="row">
            <div v-for="(item, index) in card" :key="index" :class="item.col">
              <q-card
                bordered
                class="no-shadow tw-h-[95px]"
                :class="{
                  'md:tw-rounded-r-none': index === 0 || index === 2,
                  'md:tw-rounded-l-none': index === 1 || index === 3,
                  'md:tw-rounded-none': index === 1 || index === 2,
                }"
              >
                <q-card-section class="row w-flex tw-justify-center">
                  <div class="col-3 tw-flex tw-justify-start">
                    <div
                      class="ball tw-text-white tw-flex tw-justify-center tw-items-center tw-rounded-[4px] tw-w-[60px] tw-h-[60px] bg-primary"
                    >
                      <q-icon class="tw-text-[28px]" :name="item.icon" />
                    </div>
                  </div>
                  <div class="col-9">
                    <div
                      class="row q-ml-sm bg tw-flex tw-items-center tw-justify-center"
                    >
                      <div
                        class="col-12 tw-text-left ellipsis text-h4 text-bold"
                      >
                        {{ item.total }}
                      </div>
                      <div class="col-12 ellipsis tw-text-left">
                        {{ item.label }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </template>
  </q-intersection>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from 'vue';
import { useDashboardStore } from '../stores/dashboard.store';
import { moneyFormatBr } from 'src/shared/utils';
import DashboardSkeleton from '../components/DashboardSkeleton.vue';
export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardSkeleton,
  },
  setup() {
    const state = reactive({
      loadingPage: false,
    });
    const dashboardStore = useDashboardStore();

    onMounted(async () => {
      state.loadingPage = true;
      await dashboardStore.REQUEST_GET_SUMMARY();
      state.loadingPage = false;
    });

    const card = computed(() => {
      const summary = dashboardStore.listSummary as any;
      const { student } = summary;
      const trainings = student?.total_trainings || 0;
      const diets = student?.total_diets || 0;
      return [
        {
          label: 'Totais de Alunos',
          icon: 'mdi-account-group',
          total: student?.total_students || 0,
          col: 'col-xs-12 col-md-3 col-sm-6',
        },
        {
          label: 'Aulas hoje',
          icon: 'mdi-calendar',
          total: 0,
          col: 'col-xs-12 col-md-3 col-sm-6',
        },
        {
          label: 'Renda mensal',
          icon: 'mdi-finance',
          total: moneyFormatBr(parseFloat(student?.total_price || 0)),
          col: 'col-xs-12 col-md-3 col-sm-6',
        },
        {
          label: 'Treinos & Dietas',
          icon: 'mdi-weight-lifter',
          total: `${trainings} | ${diets}`,
          col: 'col-xs-12 col-md-3 col-sm-6',
        },
      ];
    });

    return {
      card,
      ...toRefs(state),
    };
  },
});
</script>
