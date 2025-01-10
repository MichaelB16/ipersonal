<template>
  <app-modal
    :loading="loading"
    card-class="tw-w-[450px]"
    v-model="openModal"
    :title="modalTitle"
  >
    <form-training v-if="openModal" @close="openModal = false" />
  </app-modal>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStudentStore } from '../store/student.store';
import FormTraining from './FormTraining.vue';
export default defineComponent({
  name: 'ModalViewTraining',
  components: {FormTraining},
  setup() {
    const studentStore = useStudentStore();

    const modalTitle = computed(() => {
      return {
        text: 'Seus exercícios',
        icon: 'mdi-weight-lifter',
      };
    });

    const openModal = computed({
      get() {
        return studentStore.openModalViewTraining;
      },
      set(value: boolean) {
        studentStore.SET_OPEN_MODAL_VIEW_TRAINING(value);
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
