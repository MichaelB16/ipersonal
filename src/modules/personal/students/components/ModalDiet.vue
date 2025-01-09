<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[450px]"
    v-model="openModal"
    :title="modalTitle"
  >
    <form>
      <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
        <div class="col-12">
          <app-select
            label="Objetivo"
            v-model="form.objective"
            :options="listObjective"
            :rules="formRules()"
          />
        </div>
        <div class="col-12">
          <app-input-money
            label="Valor até"
            :rules="formRules()"
            v-model="form.price"
          />
        </div>
        <div class="col-12">
          <app-input label="Restrições" v-model="form.restriction" />
        </div>
      </div>
      <div class="col">
        <app-form-footer text-save="Gerar" />
      </div>
    </form>
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules } from 'src/shared/utils';

export default defineComponent({
  name: 'ModalDiet',
  setup() {
    const studentStore = useStudentStore();
    const state = reactive({
      form: {
        objective: '',
        restriction: '',
        price: '',
      },
    });

    const openModal = computed({
      get() {
        return studentStore.openModalDiet;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_DIET(value);
      },
    });

    const loading = computed(() => {
      return false;
    });

    const modalTitle = computed(() => {
      return {
        text: 'Gerar Dieta',
        icon: 'mdi-food-steak',
      };
    });

    const listObjective = computed(() => {
      return [
        { label: 'Ganho de massa muscular', value: 'hipertrofia' },
        { label: 'Perda de gordura', value: 'definição' },
        {
          label: 'Melhorar a resistência física ou o condicionamento',
          value: 'Melhorar a resistência física ou o condicionamento',
        },
      ];
    });

    return {
      modalTitle,
      loading,
      openModal,
      listObjective,
      formRules,
      ...toRefs(state),
    };
  },
});
</script>
