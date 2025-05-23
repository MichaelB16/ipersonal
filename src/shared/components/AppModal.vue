<template>
  <q-dialog v-model="model">
    <app-card :class="cardClass">
      <template v-if="loading">
        <app-loading class="absolute-full tw-bg-[#6e6c6cc4] tw-text-white" />
      </template>
      <slot name="before-title" />
      <q-card-section class="bg-grey-3" v-if="showTitle">
        <div class="tw flex tw-w-full">
          <div class="col">
            <div class="tw-flex tw-justify-start tw-items-center">
              <q-icon
                class="text-grey-8 tw-text-[16px]"
                v-if="title.icon"
                :name="title.icon"
              />
              <b class="tw-ml-2 tw-text-[16px] text-grey-8">{{ title.text }}</b>
            </div>
          </div>
          <div class="col">
            <div class="tw-flex tw-justify-end tw-items-center">
              <q-btn
                class="text-grey-8"
                @click="model = false"
                icon="mdi-close"
                size="xs"
                round
                flat
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <slot name="after-title" />
      <q-card-section class="tw-max-h-[600px] tw-overflow-auto">
        <slot name="default" />
      </q-card-section>
      <slot name="after-content" />
    </app-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    cardClass: {
      type: String,
      default: '',
    },
    title: {
      Type: Object as PropType<{ text: string; icon: string }>,
      default: () => {
        return {
          text: '',
          icon: '',
        };
      },
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: boolean) {
        emit('update:modelValue', value);
      },
    });

    return {
      model,
    };
  },
});
</script>
<style scoped lang="scss"></style>
