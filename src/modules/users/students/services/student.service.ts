import {$http} from 'src/boot/axios';
import {iFormStudent} from 'src/modules/users/students/model/student.model';

class studentServiceHttp {
  createOrUpdate(data: iFormStudent) {
    if (data.id) {
      return $http.put(`students/${data.id}`, data)
    }
    return $http.post('students', data);
  }

  getSummary() {
    return $http.get('students/summary');
  }

  delete(id: number) {
    return $http.delete(`students/${id}`)
  }

  getStudent(params = {} as any) {
    return $http.get('students', {params});
  }
}

export const studentService = new studentServiceHttp()
