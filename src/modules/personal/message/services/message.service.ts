import {$http} from 'src/boot/axios';
import {iFormStudent} from 'src/modules/personal/students/model/student.model';

class messageServiceHttp {
  createOrUpdate(data: iFormStudent) {
    return $http.post('messages', data);
  }
  getAllMessage() {
    return $http.get('messages');
  }
}

export const messageService = new messageServiceHttp()
