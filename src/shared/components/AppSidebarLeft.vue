<template>
  <q-drawer
    side="left"
    show-if-above
    v-model="model"
    :breakpoint="500"
    class="sidebar-left tw-min-w-[70px]"
  >
    <app-menu-item class="tw-mx-3" :list-menu="listMenu" />
  </q-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useMenu } from '../composable/menu';
import AppMenuItem from './AppMenuItem.vue';
export default defineComponent({
  name: 'MenuSidebarLeft',
  components: {
    AppMenuItem,
  },
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

    return {
      model,
      listMenu,
    };
  },
});
</script>
