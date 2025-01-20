<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[500px]"
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
        <div class="col-12">
          <app-input-money
            label="Valor até"
            reactive-rules
            v-model.lazy="form.price"
          />
        </div>
        <div class="col-12">
          <app-input label="Restrições" v-model="form.restriction" />
        </div>
      </div>
      <div class="col">
        <app-form-footer text-save="Gerar" />
      </div>
    </q-form>
    </template>
    <template v-if="stage === TYPE_STAGE.SUCCESS">
      <form-diet @close="openModal = false" />
    </template>
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules, parseLocalValue } from 'src/shared/utils';
import { iDietFormSearch } from '../model/diet.model';
import FormDiet from './FormDiet.vue';

export default defineComponent({
  name: 'ModalDiet',
  components: {FormDiet},
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
        restriction: '',
        sex: '',
        price: '',
      } as iDietFormSearch,
    });

    const openModal = computed({
      get() {
        return studentStore.openModalDiet;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_DIET(value);
        reset();
      },
    });

    const loading = computed(() => {
      return studentStore.loading;
    });

    const modalTitle = computed(() => {
      return {
        text: 'Gerar Dieta',
        icon: 'mdi-food-steak',
      };
    });

    const listSex = computed(() => {
      return [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
      ];
    });

    const listObjective = computed(() => {
      return [
        { label: 'Ganho de massa muscular', value: 'hipertrofia' },
        { label: 'Perda de gordura', value: 'Perda de gordura' },
        { label: 'Definição', value: 'Definição' },
      ];
    });

    const reset = () => {
      studentStore.SET_ROW_SELECTED({});
      state.stage = TYPE_STAGE.FORM;
      state.form = {
        objective: '',
        restriction: '',
        sex: '',
        price: '',
      };
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const result = await studentStore.REQUEST_GET_DIET({
            ...state.form,
            price: parseLocalValue(state.form.price)
          });
          studentStore.listDiet = result || [];
          state.stage = TYPE_STAGE.SUCCESS;
        }
      });
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
