<template>
  <q-input
    rounded
    hide-bottom-space
    outlined
    dense
    color="secondary"
    v-model="model"
    v-bind="$attrs"
  >
    <template
      v-for="(slotContent, slotName) in $slots"
      :key="slotName"
      v-slot:[slotName]
    >
      <slot :name="slotName" />
    </template>
  </q-input>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AppInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, FileList],
      required: true,
      default: null,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
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
