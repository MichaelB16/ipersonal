<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md q-mb-sm">
    <div class="col-xs-12 col-md-4 com-sm-4 col-lg-4">
      <div class="row q-col-gutter-y-sm">
        <div class="col-12">
          <app-card bordered class="no-shadow">
            <q-card-section class="tw-border tw-border-t-2">
              <q-icon name="mdi-weight" />
              <b class="tw-ml-1"> Peso atual</b>
            </q-card-section>
            <q-card-section>
              <b class="text-h3">
                {{ weight || '-' }}
                KG
              </b>
            </q-card-section>
          </app-card>
        </div>
        <div class="col-12">
          <app-card bordered class="no-shadow">
            <q-card-section class="tw-border tw-border-t-2">
              <b>% Gordura</b>
            </q-card-section>
            <q-card-section>
              <b class="text-h3">
                {{ percentWeight || '-' }}
                %
              </b>
            </q-card-section>
          </app-card>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
      <app-card bordered class="no-shadow">
        <q-card-section class="tw-border tw-gap-4 tw-border-t-2">
          <q-icon name="mdi-chart-line-variant" />
          <b class="tw-ml-1">Evolução</b>
        </q-card-section>
        <q-card-section class="tw-h-[225px]">
          <bar :options="chartOptions" :data="chartData" />
        </q-card-section>
      </app-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  name: 'EvaluationCard',
  components: {
    Bar,
  },
  props: {
    weight: {
      type: Number,
      required: true,
    },
    percentWeight: {
      type: Number,
      required: true,
    },
    dataChart: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const chartData = computed(() => {
      return {
        labels: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        datasets: [
          {
            label: 'Peso',
            backgroundColor: '#0f0a38',
            data: props.dataChart.weight,
          },
          {
            label: 'Cintura',
            backgroundColor: '#31ccec',
            data: props.dataChart.waist,
          },
          {
            label: 'Perna',
            backgroundColor: '#9c27b0',
            data: props.dataChart.leg,
          },
          {
            label: 'Braço',
            backgroundColor: '#1fcb63',
            data: props.dataChart.arm,
          },
        ],
      };
    });
    return {
      chartData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
});
</script>
