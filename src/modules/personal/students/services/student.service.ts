import { $http } from 'src/boot/axios';
import { IFormStudent } from 'src/modules/personal/students/model/student.model';

class studentServiceHttp {
  createOrUpdate(data: IFormStudent) {
    if (data.id) {
      return $http.put(`students/${data.id}`, data);
    }
    return $http.post('students', data);
  }

  getSummary() {
    return $http.get('students/summary');
  }

  delete(id: number) {
    return $http.delete(`students/${id}`);
  }

  getStudent(params = {} as any) {
    return $http.get('students', { params });
  }
}

export const studentService = new studentServiceHttp();
