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
            mask="(##)#####-####"
          />
        </div>
        <div class="col-6">
          <app-input
            v-model="form.date_of_birth"
            mask="##/##/####"
            :rules="rulesDate()"
            label="Data de nascimento"
          />
        </div>
        <div class="col-6">
          <app-input
            :rules="formRules()"
            v-model="form.height"
            mask="#.##"
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
          <app-input-money v-model.lazy="form.price" label="Mensalidade" />
        </div>
        <div class="col-12">
          <fieldset>
            <legend>
              <q-toggle
                :true-value="1"
                :false-value="0"
                :color="form.access ? 'green' : 'negative'"
                keep-color
                dense
                checked-icon="mdi-check"
                unchecked-icon="mdi-close"
                v-model.number="form.access"
              />
              Autorizar acesso à área do aluno
            </legend>
            <small v-if="form.access">
              Ao acessar o sistema o aluno poderá visualizar suas informações e
              configurar suas metas. Certifique-se de inserir o e-mail
              corretamente para que ele possa concluir o processo de acesso.
            </small>
          </fieldset>
        </div>
        <div class="col-12">
          <fieldset>
            <legend>
              <q-toggle
                dense
                :true-value="1"
                :false-value="0"
                checked-icon="mdi-check"
                unchecked-icon="mdi-close"
                keep-color
                :color="form.active ? 'green' : 'negative'"
                v-model.number="form.active"
              />
              Situação do aluno
            </legend>
            <small>
              Seu aluno está
              <b :class="form.active ? 'text-green' : 'text-negative'">
                {{ form.active ? 'Ativo' : 'Inativo' }}
              </b>
            </small>
          </fieldset>
        </div>
      </div>
      <app-form-footer />
    </q-form>
  </app-modal>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, toRefs, ref, watch } from 'vue';
import {
  configModalTitle,
  formRules,
  parseLocalValue,
  rulesDate,
  rulesEmail,
} from 'src/shared/utils';
import { setFormStudent } from 'src/modules/personal/students/helpers';
import { useStudentStore } from 'src/modules/personal/students/store/student.store';
import { IFormStudent } from 'src/modules/personal/students/model/student.model';
import dayjs from 'dayjs';

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
            ...(studentStore.rowSelected as IFormStudent),
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
      return dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
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
