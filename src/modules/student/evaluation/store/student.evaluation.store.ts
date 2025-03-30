import { studentEvaluationService } from 'src/modules/student/evaluation/services/student.evaluation.service';
import { defineStore } from 'pinia';
import { IFormEvaluation } from 'src/modules/personal/students/model/evaluation.model';

export const useStudentEvaluationStore = defineStore('student.evaluation', {
  state: () => ({
    listEvaluationMonths: [] as Partial<IFormEvaluation>,
    listEvaluationActual: {} as Partial<IFormEvaluation>,
    loadingEvaluation: false,
  }),
  actions: {
    async REQUEST_GET_EVALUATIONS() {
      this.loadingEvaluation = true;
      await studentEvaluationService
        .getEvaluation()
        .then(({ data }) => {
          this.listEvaluationMonths = data.evalation_months;
          this.listEvaluationActual = data.evaluation_actual;
        })
        .finally(() => {
          this.loadingEvaluation = false;
        });
    },
  },
});
