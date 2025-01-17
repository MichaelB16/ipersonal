<template>
  <q-form ref="formTraning" @submit.prevent="saveTraining">
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
                <!-- <q-chip size="md" color="grey-4" :label="item.focus" /> -->
                <app-input
                  color="grey-4"
                  outlined
                  bg-color="grey-1"
                  rounded
                  class="tw-mr-2 tw-w-[220px]"
                  size="xs"
                  v-model="listTraining[index].focus"
                >
                  <template v-slot:append>
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
                  </template>
                </app-input>
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
                    <q-icon name="mdi-star" color="grey-8" size="15px" />
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
        <app-form-footer />
      </div>
    </div>
  </q-form>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { useStudentStore } from '../store/student.store';
import { formRules } from 'src/shared/utils';

export default defineComponent({
  name: 'FormTraining',
  setup(props, { emit }) {
    const formTraning = ref();
    const studentStore = useStudentStore();
    const state = reactive({
      listTraining: [] as any[],
    });

    onMounted(() => {
      state.listTraining = studentStore.listViewTraining;
    });

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

    const saveTraining = () => {
      formTraning.value.validate().then(async (success: boolean) => {
        if (success) {
          await studentStore
            .SAVE_TRAINING({
              student_id: parseInt(studentStore.rowSelected.id),
              training: JSON.stringify(state.listTraining),
            })
            emit('close');
        }
      });
    };

    return {
      formTraning,
      removeTraining,
      addTraining,
      saveTraining,
      formRules,
      ...toRefs(state),
    };
  },
});
</script>
