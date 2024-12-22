<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[450px]"
    v-model="openModal"
    :title="modalTitle"
  >
    <q-form ref="formRef" @submit.prevent="handleSubmit">
      <div class="row q-col-gutter-x-md q-col-gutter-y-md">
        <div class="col-12">
          <app-input
            v-model="form.name"
            hide-bottom-space
            outlined
            dense
            :rules="formRules()"
            label="Nome"
          />
        </div>
        <div class="col-12">
          <app-input :rules="rulesEmail()" v-model="form.email" label="Email" />
        </div>
        <div class="col-6">
          <app-input
            :rules="formRules()"
            v-model="form.phone"
            label="Celular"
            fill-mask
            mask="(##)9####-####"
          />
        </div>
        <div class="col-6">
          <app-input
            v-model="form.date_of_birth"
            mask="##/##/####"
            fill-mask
            :rules="rulesDate()"
            label="Data de nascimento"
          />
        </div>
        <div class="col-6">
          <app-input
            :rules="formRules()"
            v-model="form.height"
            mask="#.##"
            fill-mask
            label="Altura"
          />
        </div>
        <div class="col-6">
          <app-input
            :rules="formRules()"
            v-model="form.weight"
            suffix="Kg"
            label="Peso"
          />
        </div>
        <div class="col-12">
          <app-input-money v-model.lazy="form.price" label="Preço" />
        </div>
        <div class="col-12">
          <q-toggle
            :true-value="1"
            :false-value="0"
            :color="form.access ? 'green' : 'negative'"
            keep-color
            checked-icon="mdi-check"
            unchecked-icon="mdi-close"
            v-model.number="form.access"
            label="Autorizar acesso à área do aluno"
          />
          <q-icon
            class="q-ml-xs text-grey-8 tw-cursor-pointer"
            name="mdi-information"
          >
            <q-tooltip class="bg-primary">
              Ao acessar o sistema, <br />
              o aluno poderá visualizar suas informações e configurar suas
              metas. <br />
              Certifique-se de inserir o e-mail corretamente para que ele possa
              <br />
              concluir o processo de acesso.
            </q-tooltip>
          </q-icon>
        </div>
      </div>
      <app-form-footer />
    </q-form>
  </app-modal>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ref, watch } from 'vue';
import { configModalTitle, formRules, parseLocalValue, rulesDate, rulesEmail } from 'src/shared/utils';
import { setFormStudent } from 'src/modules/users/students/helpers';
import { useStudentStore } from 'src/modules/users/students/store/student.store';
import { iFormStudent } from 'src/modules/users/students/model/student.model';
import moment from 'moment';

export default defineComponent({
  setup() {
    const formRef = ref();
    const studentStore = useStudentStore();
    const state = reactive({
      form: setFormStudent(),
    });
    const openModal = computed({
      get() {
        return studentStore.openModalStudent;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_STUDENT(value);
        resetForm();
      },
    });

    const loading = computed(() => {
      return studentStore.loading;
    });

    const modalTitle = computed(() => {
      return configModalTitle(!!state.form.id, {
        add: 'Adicionar Aluno',
        edit: 'Editar Aluno',
      });
    });

    watch(
      () => openModal.value,
      (isOpen: boolean) => {
        if (isOpen) {
          state.form = setFormStudent({
            ...(studentStore.rowSelected as iFormStudent),
          });
        }
      }
    );

    const resetForm = () => {
      studentStore.SET_ROW_SELECTED({});
      state.form = setFormStudent();
    };

    const reset = () => {
      resetForm();
      openModal.value = false;
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const date = state.form.date_of_birth;
          const result = await studentStore.REQUEST_ADD_OR_UPDATE_STUDENT({
            ...state.form,
            price: parseLocalValue(state.form.price),
            date_of_birth: !date ? null : dateFormat(date),
          });
          result && reset();
        }
      });
    };

    const dateFormat = (date: string) => {
      return moment(date, 'DD/MM/YY').format('YYYY-MM-DD');
    };

    return {
      formRef,
      openModal,
      modalTitle,
      loading,
      formRules,
      rulesDate,
      rulesEmail,
      handleSubmit,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss"></style>
