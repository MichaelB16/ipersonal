import {$http} from 'src/boot/axios';
import {iFormStudent} from 'src/modules/personal/students/model/student.model';

class messageServiceHttp {
  createOrUpdate(data: iFormStudent) {
    return $http.post('message', data);
  }
  getAllMessage() {
    return $http.get('message');
  }
}

export const messageService = new messageServiceHttp()
