<template>
  <q-drawer
    side="left"
    :mini="!model"
    v-model="drawer"
    :breakpoint="400"
    class="sidebar-left tw-min-w-[70px]"
  >
    <app-menu-item class="tw-mx-5" :list-menu="listMenu">
      <template v-slot:before>
        <q-item dense>
          <q-item-section v-if="!isMini">
            <div
              class="tw-flex tw-w-full tw-justify-center tw-items-center logo-img"
            >
              <img class="tw-h-[60px]" src="~/assets/logo.svg" alt="logo" />
            </div>
          </q-item-section>
          <q-item-section class="tw-h-[60px] tw-w-[60px]" avatar v-else>
            <img src="~/assets/logo-mini.svg" alt="mini logo" />
          </q-item-section>
        </q-item>
      </template>
    </app-menu-item>
  </q-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useMenu } from '../composable/menu';

export default defineComponent({
  name: 'MenuSidebarLeft',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const listMenu = useMenu();

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: boolean) {
        emit('update:modelValue', value);
      },
    });

    const isMini = computed(() => {
      return !props.modelValue;
    });

    return {
      model,
      isMini,
      drawer: true,
      listMenu,
    };
  },
});
</script>
