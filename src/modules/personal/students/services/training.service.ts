import { $http } from 'src/boot/axios';
import { ITraining, ITrainingFormSearch } from '../model/training.model';

class trainingServiceHttp {
  getTraining(data: ITrainingFormSearch) {
    return $http.post('training/generate', data);
  }
  saveTraining(data: ITraining) {
    return $http.post('training/save', data);
  }
}

export const trainingService = new trainingServiceHttp();
