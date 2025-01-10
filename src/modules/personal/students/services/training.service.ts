import { $http } from 'src/boot/axios';
import { iTraining, iTrainingFormSearch } from '../model/training.model';

class trainingServiceHttp {
  getTraining(data: iTrainingFormSearch) {
    return $http.post('training/generate', data);
  }
  saveTraining(data: iTraining) {
    return $http.post('training/save', data);
  }
}

export const trainingService = new trainingServiceHttp();
