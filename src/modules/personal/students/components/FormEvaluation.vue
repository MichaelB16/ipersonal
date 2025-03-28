<template>
  <q-expansion-item
    icon="mdi-chart-line-variant"
    header-class="bg-white tw-text-grey-8 tw-capitalize"
    expand-icon-class="text-grey-8"
    default-opened
    :label="title"
  >
    <q-card bordered class="no-shadow">
      <q-card-section class="q-py-sm q-px-sm">
        <q-form @submit.prevent="handleSubmit" ref="formRef">
          <div class="row q-col-gutter-y-sm">
            <div class="col-6">
              <fieldset>
                <legend>
                  <q-chip
                    class="chip--evaluation"
                    label="Base"
                    color="grey-8"
                    text-color="grey-12"
                  />
                </legend>
                <div class="row q-col-gutter-x-md">
                  <div class="col-4">
                    <app-input
                      type="number"
                      :rules="formRules()"
                      hide-bottom-space
                      v-model="form.weight"
                      suffix="kg"
                      label="Peso"
                    />
                  </div>
                  <div class="col-4">
                    <app-input
                      fill-mask
                      mask="#.##"
                      :rules="formRules()"
                      hide-bottom-space
                      v-model="form.height"
                      label="Altura"
                    />
                  </div>
                  <div class="col-4">
                    <app-input
                      label="Percentual de gordura"
                      suffix="%"
                      v-model="form.percent_weight"
                      :rules="formRules()"
                      hide-bottom-space
                      type="number"
                      max="100"
                      min="0"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset>
                <legend>
                  <q-chip
                    class="chip--evaluation"
                    color="grey-8"
                    text-color="grey-12"
                    label="Medidas"
                  />
                </legend>
                <div class="row q-col-gutter-x-md">
                  <div class="col-3">
                    <app-input
                      v-model="form.arm"
                      type="number"
                      :rules="formRules()"
                      hide-bottom-space
                      label="Braço"
                    />
                  </div>
                  <div class="col-3">
                    <app-input
                      type="number"
                      v-model="form.leg"
                      :rules="formRules()"
                      hide-bottom-space
                      label="Perna"
                    />
                  </div>
                  <div class="col-3">
                    <app-input
                      type="number"
                      v-model="form.waist"
                      :rules="formRules()"
                      hide-bottom-space
                      label="Cintura"
                    />
                  </div>
                  <div class="col-3">
                    <app-input
                      type="number"
                      v-model="form.breastplate"
                      :rules="formRules()"
                      hide-bottom-space
                      label="Peitoral"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-12">
              <fieldset>
                <legend>
                  <q-chip
                    class="chip--evaluation"
                    color="grey-8"
                    text-color="grey-12"
                    label="Observações"
                  />
                </legend>
                <div class="row q-col-gutter-x-md">
                  <div class="col-12">
                    <app-input
                      type="textarea"
                      :rounded="false"
                      v-model="form.observation"
                      label="Observação"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-12">
              <fieldset>
                <legend>
                  <q-chip
                    class="chip--evaluation"
                    color="grey-8"
                    text-color="grey-12"
                    label="Ações"
                  />
                </legend>
                <div class="row justify-end">
                  <q-btn
                    color="primary"
                    type="submit"
                    no-caps
                    :loading="loading"
                    :disable="loading"
                    unelevated
                    label="Salvar"
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  computed,
  PropType,
} from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { formRules } from 'src/shared/utils';
import { formEvaluation } from '../helpers';
import { useStudentStore } from '../store/student.store';
import { IFormEvaluation } from '../model/evaluation.model';
export default defineComponent({
  name: 'FormEvaluation',
  props: {
    evaluation: {
      type: Object as PropType<IFormEvaluation>,
      default: {} as IFormEvaluation,
    },
    studentId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const studentStore = useStudentStore();
    const formRef = ref();
    console.log(props.evaluation);
    const state = reactive({
      form: formEvaluation(props.evaluation),
    });

    const title = computed(() => {
      const month = dayjs().format('MMMM [de] YYYY');
      return `Avaliação - ${month}`;
    });

    const loading = computed(() => {
      return studentStore.loadingEvaluation;
    });

    const handleSubmit = () => {
      formRef.value.validate().then(async (valid: boolean) => {
        if (valid) {
          await request();
        }
      });
    };

    const request = async () => {
      if (state.form.id) {
        return await studentStore.REQUEST_UPDATE_EVALUATION({
          ...state.form,
          student_id: props.studentId,
        });
      }
      return await studentStore.REQUEST_ADD_EVALUATION({
        ...state.form,
        student_id: props.studentId,
      });
    };

    return {
      title,
      formRef,
      loading,
      formRules,
      handleSubmit,
      ...toRefs(state),
    };
  },
});
</script>
