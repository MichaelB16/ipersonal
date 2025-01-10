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
      <div class="row q-col-gutter-y-sm">
        <div class="col-12" v-for="(item, index) in listTraining" :key="index">
          <q-card bordered class="no-shadow">
            <q-card-section dense class="tw-border">
              <div class="tw-flex tw-items-center tw-justify-between">
                <b class="text-grey-8">
                  <q-icon size="20px" name="mdi-calendar" />
                  {{ item.day }}
                </b>
                <div class="tw-flex tw-items-center">
                  <q-chip size="md" color="grey-4" :label="item.focus" />
                  <q-btn
                    unelevated
                    color="grey-8"
                    icon="mdi-plus"
                    round
                    @click="addTraining(index)"
                    size="xs"
                  >
                    <q-tooltip anchor="center left" self="center right">
                      Adicionar treino
                    </q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>
            <q-card-section v-if="listTraining[index].exercises.length">
              <div
                class="row full-width items-center q-col-gutter-x-sm tw-mb-2"
                v-for="(exercise, key) in item.exercises"
                :key="key"
              >
                <div class="col">
                  <app-input
                    :rules="formRules()"
                    v-model="listTraining[index].exercises[key].name"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-star" color="primary" size="15px" />
                    </template>
                    <template v-slot:append>
                      <small class="tw-text-[10px] text-grey-8">
                        {{ exercise.series }} x ({{ exercise.repeat }})
                      </small>
                    </template>
                  </app-input>
                </div>
                <div class="col-auto">
                  <q-btn
                    round
                    @click="removeTraining(index, key)"
                    size="xs"
                    unelevated
                    color="primary"
                    icon="mdi-trash-can"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12">
          <app-form-footer text-save="Salvar" />
        </div>
      </div>
    </template>
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules } from 'src/shared/utils';

export default defineComponent({
  name: 'ModalTraining',
  setup() {
    enum TYPE_STAGE {
      FORM = 1,
      SUCCESS = 2,
    }

    const studentStore = useStudentStore();
    const formRef = ref();
    const state = reactive({
      stage: TYPE_STAGE.FORM,
      listTraining: [] as any[],
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
          state.listTraining = response || [];
          state.stage = TYPE_STAGE.SUCCESS;
        }
      });
    };

    const removeTraining = (index: number, key: number) => {
      state.listTraining[index].exercises.splice(key, 1);
    };

    const addTraining = (index: number) => {
      state.listTraining[index].exercises.push({
        name: '',
        focus: '',
        series: 3,
        repeat: '8-12',
      });
    };

    const reset = () => {
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
      addTraining,
      formRules,
      removeTraining,
      handleSubmit,
      ...toRefs(state),
    };
  },
});
</script>
