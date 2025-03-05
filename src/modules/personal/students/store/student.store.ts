import { defineStore } from 'pinia';
import { studentService } from 'src/modules/personal/students/services/student.service';
import { IFormStudent } from 'src/modules/personal/students/model/student.model';
import { configPagination, fileDownload } from 'src/shared/utils';
import { trainingService } from '../services/training.service';
import { ITraining, ITrainingFormSearch } from '../model/training.model';
import { useNotification } from 'src/shared/composable/notification';
import { IDiet, IDietFormSearch } from '../model/diet.model';
import { dietgService } from '../services/diet.service';
const notification = useNotification();

export const useStudentStore = defineStore('student', {
  state: () => ({
    openModalStudent: false,
    openModalDiet: false,
    openModalTrainer: false,
    openModalViewTraining: false,
    openModalViewDiet: false,
    listStudent: [],
    listTraining: [],
    listDiet: [],
    listViewTraining: [],
    loadingTable: false,
    pagination: configPagination(),
    loading: false,
    rowSelected: {} as any,
  }),
  actions: {
    SET_OPEN_MODAL_STUDENT(value: boolean) {
      this.openModalStudent = value;
    },
    SET_OPEN_MODAL_DIET(value: boolean) {
      this.openModalDiet = value;
    },
    SET_OPEN_MODAL_TRAINER(value: boolean) {
      this.openModalTrainer = value;
    },
    SET_OPEN_MODAL_VIEW_TRAINING(value: boolean) {
      this.openModalViewTraining = value;
    },
    SET_OPEN_MODAL_VIEW_DIET(value: boolean) {
      this.openModalViewDiet = value;
    },
    SET_ROW_SELECTED(data = {}) {
      this.rowSelected = data;
    },
    async REQUEST_GET_STUDENT(params = {} as any) {
      this.loadingTable = true;
      await studentService
        .getStudent({
          ...params,
          per_page: params?.rowsPerPage || this.pagination.rowsPerPage,
        })
        .then(({ data }) => {
          this.listStudent = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_GET_DIET(data: IDietFormSearch) {
      this.loading = true;
      return await dietgService
        .getDiet(data)
        .then(({ data }) => {
          return data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async SAVE_DIET(data: IDiet) {
      this.loading = true;
      return await dietgService
        .saveDiet(data)
        .then(() => {
          notification.success();
          this.REQUEST_GET_STUDENT();
          return data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_GET_TRAINING(data: ITrainingFormSearch) {
      this.loading = true;
      return await trainingService
        .getTraining(data)
        .then(({ data }) => {
          return data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_GET_TRAINING_PDF(id: string, filename: string) {
      await trainingService.getTrainingPdf(id).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        fileDownload(url, filename);
        const timeout = setTimeout(() => {
          URL.revokeObjectURL(url);
          clearTimeout(timeout);
        }, 2000);
      });
    },
    async REQUEST_GET_DIET_PDF(id: string, filename: string) {
      await dietgService.getDietPdf(id).then(({ data }) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        fileDownload(url, filename);
        const timeout = setTimeout(() => {
          URL.revokeObjectURL(url);
          clearTimeout(timeout);
        }, 2000);
      });
    },
    async SAVE_TRAINING(data: ITraining) {
      this.loading = true;
      return await trainingService
        .saveTraining(data)
        .then(({ data }) => {
          notification.success();
          this.REQUEST_GET_STUDENT();
          return data;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_ADD_OR_UPDATE_STUDENT(data: IFormStudent) {
      this.loading = true;
      return await studentService
        .createOrUpdate(data)
        .then(() => {
          notification.success();
          this.REQUEST_GET_STUDENT();
          return true;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          notification.error();
          return false;
        });
    },
    async REQUEST_DELETE_STUDENT(id: number) {
      await studentService
        .delete(id)
        .then(() => {
          notification.success();
          this.REQUEST_GET_STUDENT();
        })
        .catch(() => {
          notification.error();
        });
    },
  },
});
