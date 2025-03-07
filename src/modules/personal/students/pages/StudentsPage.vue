<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <template v-if="loadingPage">
      <student-skeleton />
    </template>
    <template v-else>
      <div class="row q-col-gutter-y-md">
        <div class="col-12">
          <app-title-page
            icon="mdi-account-group"
            title="Cadastro de alunos"
            subtitle="listagem de alunos matriculado"
          />
        </div>
        <div class="col-12">
          <q-card class="no-shadow">
            <q-card-section class="no-padding">
              <app-table
                class="no-shadow"
                bordered
                :grid="isGrid"
                card-container-class="q-col-gutter-x-sm q-col-gutter-y-sm q-px-md q-py-xs q-mb-xs"
                :loading="loading"
                :columns="columns"
                hide-pagination
                :pagination="pagination"
                :rows="data"
              >
                <template v-slot:top>
                  <app-card-title
                    @add="openModal"
                    @search="request"
                    title="Meus alunos"
                  >
                    <template v-slot:before-add>
                      <q-btn
                        round
                        size="xs"
                        @click="toggleIsGrid"
                        color="primary"
                        class="tw-h-full"
                        :icon="modeView.icon"
                      >
                        <q-tooltip anchor="top middle" self="bottom middle">
                          {{ modeView.text }}
                        </q-tooltip>
                      </q-btn>
                    </template>
                  </app-card-title>
                </template>
                <template v-slot:item="{ row }">
                  <card-student
                    :row="row"
                    @edit="edit(row)"
                    @remove="remove(row)"
                  />
                </template>
                <template v-slot:body-cell-access="{ row }">
                  <q-td class="text-center">
                    <q-chip
                      size="sm"
                      class="text-white"
                      :color="parseInt(row.access) ? 'green' : 'red'"
                      :label="
                        parseInt(row.access) ? 'Com acesso' : 'Sem acesso'
                      "
                    />
                  </q-td>
                </template>
                <template v-slot:body-cell-situation="{ row }">
                  <q-td width="100px" class="text-center">
                    <q-chip
                      size="sm"
                      class="text-white"
                      :color="parseInt(row?.active) ? 'green' : 'red'"
                      :label="parseInt(row.active) ? 'Ativo' : 'Inativo'"
                    />
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="{ row }">
                  <q-td width="100px" class="text-center tw-w-5 q-gutter-x-xs">
                    <btn-views :row="row" />
                    <btn-pdf :row="row" />
                    <actions
                      :row="row"
                      @edit="edit(row)"
                      @remove="remove(row)"
                    />
                  </q-td>
                </template>
                <template v-slot:no-data>
                  <app-no-data :loading="loading" />
                </template>
                <template v-slot:bottom>
                  <app-pagination
                    @request="request"
                    :pagination="pagination"
                    v-model="pagination.page"
                  />
                </template>
              </app-table>
            </q-card-section>
          </q-card>
        </div>
        <modal-add-student />
        <modal-diet />
        <modal-view-diet />
        <modal-training />
        <modal-view-training />
      </div>
    </template>
  </q-intersection>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import ModalAddStudent from 'src/modules/personal/students/components/ModalAddStudent.vue';
import CardStudent from '../components/CardStudent.vue';
import StudentSkeleton from '../components/StudentSkeleton.vue';
import ModalDiet from '../components/ModalDiet.vue';
import ModalTraining from '../components/ModalTraining.vue';
import ModalViewTraining from '../components/ModalViewTraining.vue';
import ModalViewDiet from '../components/ModalViewDiet.vue';
import Actions from '../components/Actions.vue';
import BtnViews from '../components/BtnViews.vue';
import BtnPdf from '../components/BtnPdf.vue';
import AppCardTitle from 'src/shared/components/AppCardTitle.vue';
import AppTable from 'src/shared/components/AppTable.vue';
import AppNoData from 'src/shared/components/AppNoData.vue';
import AppPagination from 'src/shared/components/AppPagination.vue';
import { studentColumns } from 'src/modules/personal/students/helpers';
import { useStudentStore } from 'src/modules/personal/students/store/student.store';
import { IFormStudent } from '../model/student.model';
import { useNotification } from 'src/shared/composable/notification';
import { isGrid } from 'src/shared/utils';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'StudentsPage',
  components: {
    ModalAddStudent,
    CardStudent,
    BtnViews,
    Actions,
    BtnPdf,
    StudentSkeleton,
    ModalDiet,
    ModalTraining,
    ModalViewDiet,
    ModalViewTraining,
    AppCardTitle,
    AppTable,
    AppNoData,
    AppPagination,
  },
  setup() {
    const studentStore = useStudentStore();
    const notification = useNotification();
    const columns = studentColumns;
    const state = reactive({
      isGrid: false,
      loadingPage: false,
    });

    onMounted(async () => {
      state.loadingPage = true;
      await request();
      state.loadingPage = false;
    });

    const data = computed(() => {
      return studentStore.listStudent.map((item: IFormStudent) => {
        const date_of_birth = dayjs(item.date_of_birth, 'YYYY-MM-DD');
        return {
          ...item,
          access: parseInt(item.access.toString()),
          active: parseInt(item.active.toString()),
          age: dayjs().diff(date_of_birth, 'year'),
          date_of_birth,
        };
      });
    });

    const loading = computed(() => {
      return studentStore.loadingTable;
    });

    const pagination = computed(() => {
      return studentStore.pagination;
    });

    const modeView = computed(() => {
      return isGrid(state.isGrid);
    });

    const openModal = () => {
      studentStore.SET_OPEN_MODAL_STUDENT(true);
    };

    const toggleIsGrid = () => {
      state.isGrid = !state.isGrid;
    };

    const request = async (params = {}) => {
      await studentStore.REQUEST_GET_STUDENT(params);
    };

    const edit = (row) => {
      studentStore.SET_ROW_SELECTED(row);
      studentStore.SET_OPEN_MODAL_STUDENT(true);
    };

    const remove = async ({ id }) => {
      notification.confirm(async () => {
        await studentStore.REQUEST_DELETE_STUDENT(id);
      });
    };

    return {
      data,
      pagination,
      columns,
      loading,
      modeView,
      ...toRefs(state),
      toggleIsGrid,
      edit,
      remove,
      request,
      openModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.border-left {
  @apply sm:tw-rounded-bl-[10px] sm:tw-rounded-tl-[10px];
}
.border-right {
  @apply sm:tw-rounded-br-[10px] sm:tw-rounded-tr-[10px];
}
.border-middle {
  @apply lg:tw-rounded-none;
}
.app-table {
  :deep(.q-table__bottom) {
    @apply tw-p-0;
  }
}
</style>
