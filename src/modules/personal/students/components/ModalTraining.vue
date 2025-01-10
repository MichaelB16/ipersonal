<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[450px]"
    v-model="openModal"
    :title="modalTitle"
  >
    <template v-if="stage === TYPE_STAGE.FORM">
      <q-form ref="formRef" @submit.prevent="handleSubmit">
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
            <app-select
              label="Sexo"
              v-model="form.sex"
              :options="listSex"
              :rules="formRules()"
            />
          </div>
        </div>
        <div class="col">
          <app-form-footer text-save="Gerar" />
        </div>
      </q-form>
    </template>
    <template v-else-if="stage === TYPE_STAGE.SUCCESS">
      <div
        class="tw-flex q-mt-xs q-mb-md tw-w-full tw-items-center tw-justify-between"
      >
        <q-separator class="tw-w-[30%]" />
        <b> Seus exercícios </b>
        <q-separator class="tw-w-[30%]" />
      </div>
      <form-training @close="openModal = false" />
    </template>
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules } from 'src/shared/utils';
import FormTraining from './FormTraining.vue';

export default defineComponent({
  name: 'ModalTraining',
  components: { FormTraining },
  setup() {
    enum TYPE_STAGE {
      FORM = 1,
      SUCCESS = 2,
    }

    const studentStore = useStudentStore();
    const formRef = ref();
    const state = reactive({
      stage: TYPE_STAGE.FORM,
      form: {
        objective: '',
        sex: '',
      },
    });

    const openModal = computed({
      get() {
        return studentStore.openModalTrainer;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_TRAINER(value);
        reset();
      },
    });

    const loading = computed(() => {
      return studentStore.loading;
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

    const listSex = computed(() => {
      return [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
      ];
    });

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const response = await studentStore.REQUEST_GET_TRAINING(state.form);
          studentStore.listViewTraining = response || [];
          state.stage = TYPE_STAGE.SUCCESS;
        }
      });
    };

    const reset = () => {
      studentStore.SET_ROW_SELECTED({});
      state.stage = TYPE_STAGE.FORM;
      state.form = {
        objective: '',
        sex: '',
      };
    };

    return {
      modalTitle,
      loading,
      openModal,
      listObjective,
      listSex,
      formRef,
      TYPE_STAGE,
      formRules,
      handleSubmit,
      ...toRefs(state),
    };
  },
});
</script>
