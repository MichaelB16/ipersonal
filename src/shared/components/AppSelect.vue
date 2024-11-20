<template>
  <q-select
    rounded
    hide-bottom-space
    outlined
    dense
    color="primary"
    v-model="model"
    v-bind="$attrs">
    <template v-for="(slotContent, slotName) in $slots" :key="slotName" v-slot:[slotName]>
      <slot :name="slotName" />
    </template>
  </q-select>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'AppSelect',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, FileList],
      required: true
    }
  },
  setup(props, {emit}) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value)
      }
    });

    return {
      model
    }
  }
})
</script>
<style scoped lang="scss">

</style>
