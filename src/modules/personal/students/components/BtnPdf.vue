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
<script>
import { computed, defineComponent } from 'vue';
import { exportFile } from 'src/shared/utils';
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

    const dietData = computed(() => {
      const list = JSON.parse(props.row.diet.diet);
      return list.map((item) => {
        const meals = item.meals
          .map((val) => {
            return `${val.label}: ${val.description}`;
          })
          .join('\n\n');

        return [item.day, meals];
      });
    });

    const username = computed(() => {
      return props.row.name;
    });

    const trainingData = computed(() => {
      const list = JSON.parse(props.row.training.training);
      return list.map((item) => {
        const exercises = item.exercises
          .map((item) => {
            return `${item.name} (${item.series} x ${item.repeat})`;
          })
          .join('\n\n');
        return [item.day, item.focus, exercises];
      });
    });

    const exportTraining = () => {
      exportFile(
        ['Dia', 'Foco', 'Exercícios'],
        trainingData.value,
        `${username.value}-treino.pdf`,
        (doc) => {
          doc
            .text(`Olá, ${username.value} sua ficha de treino`, 6, 9)
            .setFontSize(16);
        }
      );
    };

    const exportDiet = () => {
      exportFile(
        ['Dia', 'Refeições'],
        dietData.value,
        `${username.value}-dieta.pdf`,
        (doc) => {
          doc.text(`Olá, ${username.value} sua dieta`, 6, 9).setFontSize(16);
        }
      );
    };

    return {
      options,
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
