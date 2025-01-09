<template>
  <app-btn-actions flat v-bind="$attrs">
    <template v-slot:before-edit>
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

export default defineComponent({
  name: 'BtnActions',
  setup() {
    const studentStore = useStudentStore();

    const openModalDiet = () => {
      studentStore.SET_OPEN_MODAL_DIET(true);
    };

    return {
      openModalDiet,
    };
  },
});
</script>
