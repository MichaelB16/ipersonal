<template>
  <app-card
    :class="alertClass"
    class="tw-text-white tw-w-full no-shadow tw-rounded-full tw-border"
  >
    <q-card-section
      :class="alert.text"
      class="tw-flex tw-py-3 tw-justify-between tw-items-center"
    >
      <div class="tw-flex tw-items-center tw-font-medium tw-text-[13px]">
        <q-icon class="q-mr-xs" size="16px" :name="alert.icon" />
        {{ message }}
      </div>
      <q-btn
        v-if="!hideClose"
        size="xs"
        class="tw-ml-[3px]"
        @click="close"
        round
        flat
        icon="mdi-close"
      />
    </q-card-section>
  </app-card>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'AppAlert',
  props: {
    message: {
      type: String,
      default: '',
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      validator(val: string) {
        return ['success', 'danger', 'info', 'warning'].includes(val);
      },
    },
  },
  setup(props, { emit }) {
    const types = {
      success: {
        color: 'tw-bg-[#00ffe3] tw-border-teal-500',
        text: 'tw-text-teal-500',
        icon: 'mdi-check-circle-outline',
      },
      danger: {
        color: 'tw-bg-[#f69292] tw-border-rose-700',
        text: 'tw-text-rose-700',
        icon: 'mdi-alert-circle-outline',
      },
      warning: {
        color: 'tw-bg-[#ffbf55] tw-border-amber-700',
        text: 'tw-text-amber-700',
        icon: 'mdi-alert-outline',
      },
      info: {
        color: 'tw-bg-[#77d5ff] tw-border-sky-700',
        text: 'tw-text-sky-700',
        icon: 'mdi-information-outline',
      },
    };

    onMounted(() => {
      if (!props.permanent) {
        const timeout = setTimeout(() => {
          close();
          clearTimeout(timeout);
        }, 6000);
      }
    });

    const close = () => {
      emit('close');
    };

    const alert = computed(() => {
      return types[props.type];
    });

    const alertClass = computed(() => {
      const classname = [types[props.type].color];

      if (!props.permanent) classname.push('tw-animate-fadeOut');

      return classname;
    });

    return {
      close,
      alert,
      alertClass,
    };
  },
});
</script>
