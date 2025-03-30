import { $http } from 'src/boot/axios';

export class StudentEvaluationServiceHttp {
  getEvaluation() {
    return $http.get('student/evaluations');
  }
}

export const studentEvaluationService = new StudentEvaluationServiceHttp();
