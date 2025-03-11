<template>
  <div class="row tw-px-4 q-col-gutter-y-sm">
    <div class="col-12" v-for="(exercise, m) in exercises" :key="m">
      <div class="row tw-gap-2 items-center">
        <div class="col-auto">
          <q-icon
            size="30px"
            color="grey-6"
            :name="`mdi-numeric-${m + 1}-box-multiple-outline`"
          />
        </div>
        <div class="col">
          <q-card bordered class="no-shadow tw-border-l-8 full-width" dense>
            <q-card-section class="tw-p-3 tw-h-[45px]">
              <div class="row items-center">
                <div class="col">
                  <b class="text-grey-8">
                    {{ exercise.name }}
                  </b>
                  <small class="q-ml-sm tw-leading-2 tw-text-[12px]">
                    {{ exercise.series }} x
                    {{ exercise.repeat }}
                  </small>
                </div>
                <div class="col-auto" v-if="showBtnView">
                  <q-btn
                    no-caps
                    unelevated
                    @click="$emit('viewExercise', exercise)"
                    color="grey-4"
                    text-color="grey-8"
                    size="sm"
                    disable
                    label="Visualizar"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CardExercises',
  props: {
    showBtnView: {
      type: Boolean,
      default: false,
    },
    exercises: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
  },
});
</script>
