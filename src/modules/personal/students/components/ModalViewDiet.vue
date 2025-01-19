<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[500px]"
    v-model="openModal"
    :title="modalTitle"
  >
    <form-diet v-if="openModal" @close="openModal = false" />
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStudentStore } from '../store/student.store';
import FormDiet from './FormDiet.vue';
export default defineComponent({
  name: 'ModalViewDiet',
  components: {FormDiet},
  setup() {
    const studentStore = useStudentStore();

    const modalTitle = computed(() => {
      return {
        text: 'Sua dieta',
        icon: 'mdi-food-steak',
      };
    });

    const openModal = computed({
      get() {
        return studentStore.openModalViewDiet;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_VIEW_DIET(value);
      },
    });

    const loading = computed(() => {
      return studentStore.loading;
    });

    return {
      openModal,
      modalTitle,
      loading,
    };
  },
});
</script>
