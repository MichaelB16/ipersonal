<template>
  <div class="row q-col-gutter-y-sm q-mt-sm">
    <div class="col-12" v-for="item in listEvaluations" :key="item.id">
      <q-expansion-item
        icon="mdi-chart-line-variant"
        header-class="bg-primary tw-text-white tw-capitalize"
        expand-icon-class="text-white"
        :label="item.label"
      >
        <q-card>
          <q-card-section>
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
                        hide-bottom-space
                        disable
                        bg-color="grey-12"
                        v-model="item.weight"
                        suffix="kg"
                        label="Peso"
                      />
                    </div>
                    <div class="col-4">
                      <app-input
                        fill-mask
                        mask="#.##"
                        disable
                        bg-color="grey-12"
                        hide-bottom-space
                        v-model="item.height"
                        label="Altura"
                      />
                    </div>
                    <div class="col-4">
                      <app-input
                        label="Percentual de gordura"
                        suffix="%"
                        disable
                        bg-color="grey-12"
                        v-model="item.percent_weight"
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
                        v-model="item.arm"
                        type="number"
                        disable
                        hide-bottom-space
                        bg-color="grey-12"
                        label="Braço"
                      />
                    </div>
                    <div class="col-3">
                      <app-input
                        type="number"
                        v-model="item.leg"
                        disable
                        hide-bottom-space
                        bg-color="grey-12"
                        label="Perna"
                      />
                    </div>
                    <div class="col-3">
                      <app-input
                        type="number"
                        disable
                        v-model="item.waist"
                        hide-bottom-space
                        bg-color="grey-12"
                        label="Cintura"
                      />
                    </div>
                    <div class="col-3">
                      <app-input
                        type="number"
                        disable
                        v-model="item.breastplate"
                        hide-bottom-space
                        bg-color="grey-12"
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
                        disable
                        bg-color="grey-12"
                        v-model="item.observation"
                        label="Observação"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
export default defineComponent({
  name: 'EvaluationMonths',
  props: {
    evaluations: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const listEvaluations = computed(() => {
      return props.evaluations.map((evaluation) => {
        dayjs.locale('pt-br');
        return {
          id: evaluation.id,
          label: dayjs(evaluation.created_at).format('MMMM [de] YYYY'),
          ...evaluation,
        };
      });
    });

    return {
      listEvaluations,
    };
  },
});
</script>
