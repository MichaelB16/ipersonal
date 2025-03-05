import { $http } from 'src/boot/axios';
import { IDiet, IDietFormSearch } from '../model/diet.model';

class dietServiceHttp {
  getDiet(data: IDietFormSearch) {
    return $http.post('diet/generate', data);
  }
  getDietPdf(id: string) {
    return $http.get(`diet/pdf/${id}`, { responseType: 'blob' });
  }
  saveDiet(data: IDiet) {
    return $http.post('diet/save', data);
  }
}

export const dietgService = new dietServiceHttp();
