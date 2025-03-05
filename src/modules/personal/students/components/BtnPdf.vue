<template>
  <q-btn-dropdown flat round class="btn-pdf" size="xs" icon="mdi-download">
    <q-list>
      <q-item
        v-for="(item, index) in options"
        :key="index"
        clickable
        dense
        :disable="item.disable"
        v-close-popup
        @click="item.handler"
      >
        <q-item-section side>
          <q-icon name="mdi-file-pdf-box" color="red" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStudentStore } from '../store/student.store';
export default defineComponent({
  name: 'BtnPdf',
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

    const options = computed(() => {
      return [
        { label: 'Dieta', disable: !!!props.row.diet, handler: exportDiet },
        {
          label: 'Treino',
          disable: !!!props.row.training,
          handler: exportTraining,
        },
      ];
    });

    const username = computed(() => {
      return props.row.name.trim().toLowerCase();
    });

    const exportTraining = async () => {
      const name = filename('treino');
      await studentStore.REQUEST_GET_TRAINING_PDF(props.row.id, name);
    };

    const exportDiet = async () => {
      const name = filename('dieta');
      await studentStore.REQUEST_GET_DIET_PDF(props.row.id, name);
    };

    const filename = (type: string) => {
      return `${username.value}-${type}.pdf`;
    };

    return {
      options,
      filename,
    };
  },
});
</script>
<style lang="scss" scoped>
.btn-pdf {
  :deep(.q-btn-dropdown__arrow) {
    display: none;
  }
}
</style>
