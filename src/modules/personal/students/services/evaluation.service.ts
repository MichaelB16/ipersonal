import { $http } from 'src/boot/axios';
import { IFormEvaluation } from '../model/evaluation.model';

export class EvaluationServiceHttp {
  create(data: IFormEvaluation) {
    return $http.post('evaluations', data);
  }
  update(id: number, data: IFormEvaluation) {
    return $http.put(`evaluations/${id}`, data);
  }
  delete(id: number) {
    return $http.delete(`evaluations/${id}`);
  }
}

export const evaluationService = new EvaluationServiceHttp();
