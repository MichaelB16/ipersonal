<template>
  <app-btn-actions flat v-bind="$attrs">
    <template v-slot:before-edit>
      <q-item @click="openModalTrainer" dense clickable v-close-popup>
        <q-item-section avatar>
          <q-icon color="primary" size="18px" name="mdi-weight-lifter" />
        </q-item-section>
        <q-item-section class="text-primary"> Gerar treino </q-item-section>
      </q-item>
      <q-item @click="openModalDiet" dense clickable v-close-popup>
        <q-item-section avatar>
          <q-icon color="primary" size="18px" name="mdi-food-steak" />
        </q-item-section>
        <q-item-section class="text-primary"> Gerar dieta </q-item-section>
      </q-item>
    </template>
  </app-btn-actions>
</template>
<script>
import { defineComponent } from 'vue';
import { useStudentStore } from '../store/student.store';
import AppBtnActions from 'src/shared/components/AppBtnActions.vue';
export default defineComponent({
  name: 'BtnActions',
  components: {
    AppBtnActions,
  },
  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const studentStore = useStudentStore();

    const openModalDiet = () => {
      studentStore.SET_ROW_SELECTED(props.row);
      studentStore.SET_OPEN_MODAL_DIET(true);
    };

    const openModalTrainer = () => {
      studentStore.SET_ROW_SELECTED(props.row);
      studentStore.SET_OPEN_MODAL_TRAINER(true);
    };

    return {
      openModalDiet,
      openModalTrainer,
    };
  },
});
</script>
