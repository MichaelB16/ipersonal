<template>
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
        <div
          class="col-xs-12 col-md-3 col-sm-6"
          v-for="(item, index) in card"
          :key="index"
        >
          <q-card
            bordered
            class="no-shadow tw-h-[95px]"
            :class="{
              'border-left': index === 0 || index === 2,
              'border-right': index === 1 || index === 3,
              'border-middle': index === 1 || index === 2,
            }"
          >
            <q-card-section class="row w-flex tw-justify-center">
              <div class="col-3 tw-flex tw-justify-start">
                <div
                  class="ball tw-text-white tw-flex tw-justify-center tw-items-center tw-rounded-[8px] tw-w-[60px] tw-h-[60px] bg-primary"
                >
                  <q-icon class="tw-text-[28px]" :name="item.icon" />
                </div>
              </div>
              <div class="col-9">
                <div
                  class="row q-ml-sm bg tw-flex tw-items-center tw-justify-center"
                >
                  <div class="col-12 tw-text-left text-h4 text-bold">
                    {{ item.total }}
                  </div>
                  <div class="col-12 tw-text-left">
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
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useDashboardStore } from '../store/dashboard.store';
import { moneyFormatBr } from 'src/shared/utils';
export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const dashboardStore = useDashboardStore();

    onMounted(async () => {
      await dashboardStore.REQUEST_GET_SUMMARY();
    });

    const card = computed(() => {
      const summary = dashboardStore.listSummary as any;
      return [
        {
          label: 'Total de Alunos',
          icon: 'mdi-account-group',
          total: summary?.student?.total_students || 0,
        },
        { label: 'Aulas hoje', icon: 'mdi-calendar', total: 0 },
        {
          label: 'Renda mensal',
          icon: 'mdi-finance',
          total: moneyFormatBr(parseFloat(summary?.student?.total_price || 0)),
        },
        { label: 'lorem ipsum', icon: 'mdi-calendar', total: 0 },
      ];
    });

    return {
      card,
    };
  },
});
</script>
