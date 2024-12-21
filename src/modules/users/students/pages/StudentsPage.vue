<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <app-title-page
        icon="mdi-account-group"
        title="Cadastro de Alunos"
        subtitle="listagem de alunos matriculado"
      />
    </div>
    <div class="col-12">
      <app-table
        class="no-shadow"
        bordered
        :loading="loading"
        :columns="columns"
        :pagination="pagination"
        :rows="data"
      >
        <template v-slot:top>
          <app-card-title
            @add="openModal"
            @search="request"
            title="Meus alunos"
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
            <app-btn-actions @edit="edit(row)" @remove="remove(row)">
              <template v-slot:before-edit>
                <q-item dense clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon color="primary" size="18px" name="mdi-food-steak" />
                  </q-item-section>
                  <q-item-section class="text-primary">
                    Gerar dieta
                  </q-item-section>
                </q-item>
              </template>
            </app-btn-actions>
          </q-td>
        </template>
        <template v-slot:bottom>
          <div class="tw-flex tw-w-full tw-justify-center">
            <app-pagination
              @request="request"
              :pagination="pagination"
              v-model="pagination.page"
            />
          </div>
        </template>
        <template v-slot:no-data>
          <app-no-data />
        </template>
      </app-table>
    </div>
    <modal-add-student />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import ModalAddStudent from 'src/modules/users/students/components/ModalAddStudent.vue';
import { studentColumns } from 'src/modules/users/students/helpers';
import { useStudentStore } from 'src/modules/users/students/store/student.store';
import moment from 'moment';
import { iFormStudent } from '../model/student.model';

export default defineComponent({
  name: 'StudentsPage',
  components: { ModalAddStudent },
  setup() {
    const studentStore = useStudentStore();
    const columns = studentColumns;

    onMounted(async () => {
      await request();
    });

    const data = computed(() => {
      return studentStore.listStudent.map((item: iFormStudent) => {
        return {
          ...item,
          access: parseInt(item.access.toString()),
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

    const openModal = () => {
      studentStore.SET_OPEN_MODAL_STUDENT(true);
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
</style>
