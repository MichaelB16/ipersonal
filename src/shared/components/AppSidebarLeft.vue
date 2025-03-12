<template>
  <q-drawer
    side="left"
    show-if-above
    v-model="model"
    :breakpoint="500"
    :width="250"
    class="sidebar-left tw-min-w-[70px]"
  >
    <template v-if="loading">
      <div class="row tw-px-3 q-col-gutter-y-md">
        <div class="col-12" v-for="value in 4" :key="value">
          <q-skeleton type="rect" class="tw-w-full tw-h-10" />
        </div>
      </div>
    </template>
    <template v-else>
      <app-menu-item class="tw-mx-3" :list-menu="listMenu" />
    </template>
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

    const loading = computed(() => {
      return settingStore.loadingSetting;
    });

    const listMenu = computed(() => {
      return settingStore.setting.menu;
    });

    return {
      model,
      listMenu,
      loading,
    };
  },
});
</script>
