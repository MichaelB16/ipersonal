<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-title-page
        icon="mdi-chart-line-variant"
        title="Evolução"
        subtitle="Acompanhe sua evolução de perto."
      />
    </div>
    <div class="col-12" v-if="!loading">
      <evaluation-card
        :weight="actual.weight"
        :percent-weight="actual.percent_weight"
        :data-chart="chartData"
      />
      <form-evaluation
        disabled
        hide-save
        :evaluation="actual"
        :student-id="actual.id"
      />
      <evaluation-months :evaluations="months" />
    </div>
    <div v-else class="col-12">
      <div class="row q-col-gutter-y-md q-col-gutter-x-md">
        <div class="col-4">
          <div class="row q-col-gutter-y-md">
            <div class="col-12">
              <q-skeleton height="180px"></q-skeleton>
            </div>
            <div class="col-12">
              <q-skeleton height="180px"></q-skeleton>
            </div>
          </div>
        </div>
        <div class="col-8">
          <q-skeleton height="375px"></q-skeleton>
        </div>
        <div class="col-12">
          <q-skeleton height="200px"></q-skeleton>
        </div>
        <div class="col-12">
          <q-skeleton height="50px"></q-skeleton>
        </div>
        <div class="col-12">
          <q-skeleton height="50px"></q-skeleton>
        </div>
        <div class="col-12">
          <q-skeleton height="50px"></q-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, computed } from 'vue';
import EvaluationCard from 'src/modules/personal/students/components/EvaluationCard.vue';
import EvaluationMonths from 'src/modules/personal/students/components/EvaluationMonths.vue';
import FormEvaluation from 'src/modules/personal/students/components/FormEvaluation.vue';
import { useStudentEvaluationStore } from 'src/modules/student/evaluation/store/student.evaluation.store.ts';
export default defineComponent({
  name: 'EvaluationPage',
  components: {
    EvaluationCard,
    EvaluationMonths,
    FormEvaluation,
  },
  setup() {
    const studentEvaluation = useStudentEvaluationStore();

    onMounted(async () => {
      await studentEvaluation.REQUEST_GET_EVALUATIONS();
    });

    const loading = computed(() => {
      return studentEvaluation.loadingEvaluation;
    });

    const actual = computed(() => {
      return studentEvaluation.listEvaluationActual || {};
    });

    const months = computed(() => {
      return studentEvaluation.listEvaluationMonths || [];
    });

    const chartData = computed(() => {
      const data = months.value || [];
      let totalWeight = data.map((item) => item.weight);
      let totalLeg = data.map((item) => item.leg);
      let totalWaist = data.map((item) => item.waist);
      let totalArm = data.map((item) => item.arm);

      if (actual.value) {
        totalWeight.push(actual.value?.weight || 0);
        totalWaist.push(actual.value?.waist || 0);
        totalLeg.push(actual.value?.leg || 0);
        totalArm.push(actual.value?.arm || 0);
      }

      return {
        weight: totalWeight,
        waist: totalWaist,
        arm: totalArm,
        leg: totalLeg,
      };
    });

    return {
      actual,
      months,
      chartData,
      loading,
    };
  },
});
</script>
