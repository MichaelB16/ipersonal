<template>
  <q-btn
    round
    size="xs"
    :color="row.diet ? 'brown' : 'grey-5'"
    flat
    @click="viewDiet"
    :disable="!row.diet"
    icon="mdi-food-steak"
  >
    <q-tooltip anchor="center left" self="center right">
      {{ row.diet ? 'Minha dieta' : 'Sem dieta' }}
    </q-tooltip>
  </q-btn>
  <q-btn
    round
    size="xs"
    :color="row.training ? 'secondary' : 'grey-5'"
    flat
    @click="viewTraining"
    :disable="!row.training"
    icon="mdi-weight-lifter"
  >
    <q-tooltip anchor="center left" self="center right">
      {{ row.training ? 'Meu treino' : 'Sem treino' }}
    </q-tooltip>
  </q-btn>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStudentStore } from '../store/student.store';
export default defineComponent({
  props: {
    row: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const studentStore = useStudentStore();

    const viewTraining = () => {
      studentStore.SET_OPEN_MODAL_VIEW_TRAINING(true);
      studentStore.SET_ROW_SELECTED(props.row);
      studentStore.listViewTraining = JSON.parse(props.row.training.training);
    };

    const viewDiet = () => {
      studentStore.SET_OPEN_MODAL_VIEW_DIET(true);
      studentStore.SET_ROW_SELECTED(props.row);
      studentStore.listDiet = JSON.parse(props.row.diet.diet);
    };

    return {
      viewTraining,
      viewDiet,
    };
  },
});
</script>
