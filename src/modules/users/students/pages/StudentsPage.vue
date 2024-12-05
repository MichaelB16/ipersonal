<template>
  <div class="row q-col-gutter-y-md">
    <div class="col-12">
      <div class="row">
        <div
          class="col-xs-12 col-md-3 col-sm-6"
          v-for="(item, index) in card"
          :key="index"
        >
          <q-card
            bordered
            class="no-shadow tw-h-[95px]"
            :class="{
              'border-left': index === 0 || index === 2,
              'border-right': index === 1 || index === 3,
              'border-middle': index === 1 || index === 2,
            }"
          >
            <q-card-section class="row w-flex tw-justify-center">
              <div class="col-3 tw-flex tw-justify-start">
                <div
                  class="ball tw-text-white tw-flex tw-justify-center tw-items-center tw-rounded-[8px] tw-w-[60px] tw-h-[60px] bg-primary"
                >
                  <q-icon class="tw-text-[28px]" :name="item.icon" />
                </div>
              </div>
              <div class="col-9">
                <div
                  class="row q-ml-sm bg tw-flex tw-items-center tw-justify-center"
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
import { moneyFormatBr } from 'src/shared/utils';

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

    const card = computed(() => {
      const summary = studentStore.listSummary as any;
      return [
        {
          label: 'Total de Alunos',
          icon: 'mdi-account-group',
          total: summary?.total_students || 0,
        },
        { label: 'Aulas hoje', icon: 'mdi-calendar', total: 0 },
        {
          label: 'Renda mensal',
          icon: 'mdi-finance',
          total: moneyFormatBr(parseFloat(summary.total_price || 0)),
        },
        { label: 'lorem ipsum', icon: 'mdi-calendar', total: 10 },
      ];
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
