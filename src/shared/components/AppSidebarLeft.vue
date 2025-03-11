<template>
  <q-drawer
    side="left"
    show-if-above
    v-model="model"
    :breakpoint="500"
    :width="250"
    class="sidebar-left tw-min-w-[70px]"
  >
    <app-menu-item class="tw-mx-3" :list-menu="listMenu" />
  </q-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useSettingStore } from 'src/stores/settings';
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
    const settingStore = useSettingStore();
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: boolean) {
        emit('update:modelValue', value);
      },
    });

    const listMenu = computed(() => {
      return settingStore.setting.menu;
    });

    return {
      model,
      listMenu,
    };
  },
});
</script>
