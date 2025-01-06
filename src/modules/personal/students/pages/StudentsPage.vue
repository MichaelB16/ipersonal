<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
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
                    :label="parseInt(row.access) ? 'Com acesso' : 'Sem acesso'"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="{ row }">
                <q-td class="text-center tw-w-5 q-gutter-x-xs">
                  <actions @edit="edit(row)" @remove="remove(row)" />
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
    </div>
  </q-intersection>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import ModalAddStudent from 'src/modules/personal/students/components/ModalAddStudent.vue';
import CardStudent from '../components/CardStudent.vue';
import Actions from '../components/Actions.vue';
import moment from 'moment';
import { studentColumns } from 'src/modules/personal/students/helpers';
import { useStudentStore } from 'src/modules/personal/students/store/student.store';
import { iFormStudent } from '../model/student.model';

export default defineComponent({
  name: 'StudentsPage',
  components: { ModalAddStudent, CardStudent, Actions },
  setup() {
    const studentStore = useStudentStore();
    const columns = studentColumns;
    const state = reactive({
      isGrid: false,
    });

    onMounted(async () => {
      await request();
    });

    const data = computed(() => {
      return studentStore.listStudent.map((item: iFormStudent) => {
        return {
          ...item,
          access: parseInt(item.access.toString()),
          age: moment().diff(moment(item.date_of_birth, 'YYYY-MM-DD'), 'years'),
          date_of_birth: moment(item.date_of_birth).format('DD/MM/YYYY'),
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
      const type = state.isGrid ? 'grid' : 'linha';
      const icon = state.isGrid ? 'mdi-view-grid' : 'mdi-view-list';
      return {
        text: `Modo de visualização ${type}`,
        icon,
      };
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
      await studentStore.REQUEST_DELETE_STUDENT(id);
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
