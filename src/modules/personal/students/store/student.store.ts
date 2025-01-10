import { defineStore } from 'pinia';
import { studentService } from 'src/modules/personal/students/services/student.service';
import { iFormStudent } from 'src/modules/personal/students/model/student.model';
import { configPagination } from 'src/shared/utils';
import { trainingService } from '../services/training.service';
import { iTraining, iTrainingFormSearch } from '../model/training.model';

export const useStudentStore = defineStore('student', {
  state: () => ({
    openModalStudent: false,
    openModalDiet: false,
    openModalTrainer: false,
    openModalViewTraining: false,
    listStudent: [],
    listTraining: [],
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
        .then(async ({ data }) => {
          this.listStudent = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_GET_TRAINING(data: iTrainingFormSearch) {
      this.loading = true;
      return await trainingService.getTraining(data).then(({ data }) => {
        return data;
      }).finally(() => {
        this.loading = false;
      });
    },
    async SAVE_TRAINING(data: iTraining) {
      this.loading = true;
      return await trainingService.saveTraining(data).then(({ data }) => {
        return data;
      }).finally(() => {
        this.loading = false;
      });
    },
    async REQUEST_ADD_OR_UPDATE_STUDENT(data: iFormStudent) {
      this.loading = true;
      return await studentService
        .createOrUpdate(data)
        .then(async () => {
          await this.REQUEST_GET_STUDENT();
          return true;
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(() => {
          return false;
        });
    },
    async REQUEST_DELETE_STUDENT(id: number) {
      await studentService
        .delete(id)
        .then(async () => {
          await this.REQUEST_GET_STUDENT();
        })
        .catch(() => {});
    },
  },
});
