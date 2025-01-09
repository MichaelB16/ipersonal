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
      },
    });

    const openModal = computed({
      get() {
        return studentStore.openModalTrainer;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_TRAINER(value);
      },
    });

    const loading = computed(() => {
      return false;
    });

    const modalTitle = computed(() => {
      return {
        text: 'Gerar treino',
        icon: 'mdi-weight-lifter',
      };
    });

    const listObjective = computed(() => {
      return [
        { label: 'Hipertrofia', value: 'hipertrofia' },
        { label: 'Definição', value: 'definição' },
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
