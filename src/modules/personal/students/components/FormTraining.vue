<template>
  <q-form ref="formTraning" @submit.prevent="saveTraining">
    <div class="row q-col-gutter-y-sm">
      <draggable
        class="col-12 row q-col-gutter-y-sm"
        @change="changeList"
        v-model="listTraining"
      >
        <transition-group>
          <div
            class="col-12"
            v-for="(item, index) in listTraining"
            :key="index"
          >
            <q-card bordered class="no-shadow">
              <q-card-section class="q-pa-none">
                <q-expansion-item icon="mdi-calendar" :label="item.day">
                  <template v-slot:header>
                    <q-item-section side>
                      <q-icon color="grey" size="20px" name="mdi-calendar" />
                    </q-item-section>
                    <q-item-section>
                      <b>{{ item.day }}</b>
                    </q-item-section>
                    <q-item-section side>
                      <app-input
                        color="grey-4"
                        bg-color="white"
                        class="xs:tw-w-[100px] sm:tw-w-[150px] tw-text-[10px]"
                        borderless
                        :rules="formRules()"
                        v-model="listTraining[index].focus"
                      />
                    </q-item-section>
                  </template>
                  <q-card>
                    <q-card-section class="q-pa-xs tw-bg-[#f5f5f5c9]">
                      <template v-if="item.exercises.length">
                        <div class="row q-pa-md justify-center">
                          <q-btn
                            icon="mdi-plus"
                            label="Adicionar treino"
                            @click="addTraining(index)"
                            color="primary"
                            unelevated
                            no-caps
                            size="sm"
                            rounded
                          />
                        </div>
                        <div
                          class="row full-width items-center q-col-gutter-x-sm tw-mb-1"
                          v-for="(exercise, key) in item.exercises"
                          :key="key"
                        >
                          <div class="col-12 q-mt-sm">
                            <fieldset>
                              <legend>
                                <q-chip
                                  color="grey-8"
                                  class="q-ma-none tw-px-[25px] tw-py-[10px]"
                                  text-color="white"
                                >
                                  {{ key + 1 }}º - Treino
                                </q-chip>
                              </legend>
                              <div class="row q-col-gutter-y-sm">
                                <div
                                  class="row q-col-gutter-x-sm full-width justify-between"
                                >
                                  <div class="col">
                                    <app-input
                                      bg-color="white"
                                      :rules="formRules()"
                                      v-model="
                                        listTraining[index].exercises[key].name
                                      "
                                    >
                                      <template v-slot:prepend>
                                        <q-icon
                                          name="mdi-star"
                                          color="grey-8"
                                          size="15px"
                                        />
                                      </template>
                                    </app-input>
                                  </div>
                                  <div class="col-1">
                                    <q-btn
                                      round
                                      @click="removeTraining(index, key)"
                                      size="xs"
                                      unelevated
                                      class="q-mt-sm"
                                      color="negative"
                                      icon="mdi-trash-can"
                                    />
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div
                                    class="row q-col-gutter-x-sm justify-center items-center"
                                  >
                                    <div class="col-11"></div>
                                    <div class="col-auto"></div>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="row q-col-gutter-x-sm">
                                    <div class="col">
                                      <app-input
                                        bg-color="white"
                                        label="Repetições"
                                        :rules="formRules()"
                                        v-model="
                                          listTraining[index].exercises[key]
                                            .series
                                        "
                                      />
                                    </div>
                                    <div
                                      class="col-auto tw-flex tw-justify-center"
                                    >
                                      <q-icon
                                        class="rotate-90 tw-mt-[15px]"
                                        name="mdi-arrow-up-down"
                                      />
                                    </div>
                                    <div class="col">
                                      <app-input
                                        bg-color="white"
                                        label="Quantidade"
                                        :rules="formRules()"
                                        v-model="
                                          listTraining[index].exercises[key]
                                            .repeat
                                        "
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="q-pa-lg">
                          <app-alert
                            permanent
                            hide-close
                            type="info"
                            message="Dia de descanso, aproveite!"
                          />
                        </div>
                      </template>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-card-section>
            </q-card>
          </div>
        </transition-group>
      </draggable>

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
import { VueDraggableNext } from 'vue-draggable-next';
export default defineComponent({
  name: 'FormTraining',
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const formTraning = ref();
    const studentStore = useStudentStore();
    const state = reactive({
      listTraining: [] as any[],
    });

    const days = [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ];

    onMounted(() => {
      state.listTraining = studentStore.listViewTraining;
    });

    const changeList = () => {
      state.listTraining = state.listTraining.map((item, index) => {
        return {
          ...item,
          day: days[index],
        };
      });
    };

    const removeTraining = (index: number, key: number) => {
      state.listTraining[index].exercises.splice(key, 1);
    };

    const addTraining = (index: number) => {
      state.listTraining[index].exercises.push({
        name: '',
        focus: '',
        series: '',
        repeat: '',
      });
    };

    const saveTraining = () => {
      formTraning.value.validate().then(async (success: boolean) => {
        if (success) {
          await studentStore.SAVE_TRAINING({
            student_id: parseInt(studentStore.rowSelected.id),
            training: JSON.stringify(state.listTraining),
          });
          emit('close');
        }
      });
    };

    return {
      formTraning,
      removeTraining,
      addTraining,
      changeList,
      saveTraining,
      formRules,
      ...toRefs(state),
    };
  },
});
</script>
