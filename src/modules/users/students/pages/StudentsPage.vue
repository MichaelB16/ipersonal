<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <div class="row">
        <div class="col-md-3 col-sm-6 card-info" v-for="(item, index) in card" :key="index">
          <q-card bordered class="no-shadow tw-h-[100px]">
            <q-card-section class="row w-flex tw-justify-center">
              <div class="col-4 tw-flex tw-justify-center">
                <q-btn
                  round
                  class="tw-w-[60px] tw-h-[60px]"
                  unelevated
                  color="primary"
                  :icon="item.icon"
                />
              </div>
              <div class="col-8">
                <div
                  class="row q-ml-sm tw-flex tw-items-center tw-justify-center"
                >
                  <div class="col-12 tw-text-left text-h4 text-bold">
                    {{ item.total }}
                  </div>
                  <div class="col-12 tw-text-left">
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
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
          <app-title
            @add="openModal"
            @search="request"
            title="Lista de alunos"
          />
        </template>
        <template v-slot:body-cell-actions="{row}">
          <q-td class="text-center tw-w-5 q-gutter-x-xs">
            <app-btn-actions
              @edit="edit(row)"
              @remove="remove(row)"
            >
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
import {computed, defineComponent, onMounted} from 'vue';
import ModalAddStudent from 'src/modules/users/students/components/ModalAddStudent.vue';
import {studentColumns} from 'src/modules/users/students/helpers';
import {useStudentStore} from 'src/modules/users/students/store/student.store';

export default defineComponent({
  name: 'StudentsPage',
  components: {ModalAddStudent},
  setup() {
    const studentStore = useStudentStore()
    const columns = studentColumns;

    onMounted(async () => {
      await request();
    });

    const data = computed(() => {
      return studentStore.listStudent;
    });

    const loading = computed(() => {
      return studentStore.loadingTable;
    });

    const pagination = computed(() => {
      return studentStore.pagination;
    });

    const card = [
      { label: 'Quantidade de Alunos', icon: 'mdi-account-group', total: 3 },
      { label: 'Aulas hoje', icon: 'mdi-calendar', total: 1 },
      { label: 'Renda mensal', icon: 'mdi-finance', total: 'R$ 1.000' },
      { label: 'lorem ipsum', icon: 'mdi-calendar', total: 10 },
    ];

    const openModal = () => {
      studentStore.SET_OPEN_MODAL_STUDENT(true)
    }

    const request = async (params = {}) => {
      await studentStore.REQUEST_GET_STUDENT(params)
    }

    const edit = (row) => {
      studentStore.SET_ROW_SELECTED(row)
      studentStore.SET_OPEN_MODAL_STUDENT(true)
    }
    const remove = async ({ id }) => {
      await studentStore.REQUEST_DELETE_STUDENT(id)
    }

    return {
      data,
      card,
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
.card-info {
  > .q-card {
    border-radius: 0;
  }
  &:first-child {
    .q-card {
      border-radius: 10px 0 0 10px !important;
    }
  }
  &:last-child {
    .q-card {
      border-radius: 0 10px 10px 0 !important;
    }
  }
}
</style>
