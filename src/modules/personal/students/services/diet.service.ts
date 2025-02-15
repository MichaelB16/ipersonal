import { $http } from 'src/boot/axios';
import { IDiet, IDietFormSearch } from '../model/diet.model';

class dietServiceHttp {
  getDiet(data: IDietFormSearch) {
    return $http.post('diet/generate', data);
  }
  saveDiet(data: IDiet) {
    return $http.post('diet/save', data);
  }
}

export const dietgService = new dietServiceHttp();
