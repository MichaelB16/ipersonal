import { $http } from 'src/boot/axios';
import { iDiet, iDietFormSearch } from '../model/diet.model';

class dietServiceHttp {
  getDiet(data: iDietFormSearch) {
    return $http.post('diet/generate', data);
  }
  saveDiet(data: iDiet) {
    return $http.post('diet/save', data);
  }
}

export const dietgService = new dietServiceHttp();
