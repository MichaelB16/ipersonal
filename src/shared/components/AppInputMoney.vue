<template>
  <q-field dense hide-bottom-space rounded outlined :label="label" stack-label>
    <template v-slot:control>
      <input
        class="tw-w-full input-money"
        v-model.lazy="model"
        v-money="configVMoney"
      />
    </template>
  </q-field>
</template>
<script>
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'AppInputMoney',
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: 'Preço',
    },
    modelValue: {
      type: [String, Number],
      required: true
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

    const configVMoney = computed(() => {
      return {
        masked: true,
        prefix: 'R$ ',
        suffix: '',
        thousands: '.',
        decimal: ',',
        precision: 2,
        disableNegative: false,
        disabled: false,
        min: null,
        max: null,
        allowBlank: false,
        minimumNumberOfCharacters: 0,
        modelModifiers: {
          number: true,
        },
        shouldRound: true,
        focusOnRight: false,
      };
    });

    return {
      configVMoney,
      model,
    };
  },
});
</script>
<style lang="scss" scoped>
.input-money {
  @apply tw-border-transparent;
  &:focus,
  :active {
    @apply tw-outline-none;
  }
}
</style>
