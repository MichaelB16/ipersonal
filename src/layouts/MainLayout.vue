<template>
  <q-layout view="hHh lpR lFr">
    <app-menu-header :menu="!isMini" @toggle="toggleSidebar" />
    <app-sidebar-left :mini="isMini" v-model="open" />
    <q-page-container class="tw-min-h-[100dvh]">
      <div id="container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useWindowSize } from '@vueuse/core';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { useSettingStore } from 'src/stores/settings';
import AppMenuHeader from 'src/shared/components/AppMenuHeader.vue';
import AppSidebarLeft from 'src/shared/components/AppSidebarLeft.vue';
export default defineComponent({
  name: 'MainLayout',
  components: {
    AppMenuHeader,
    AppSidebarLeft,
  },
  setup() {
    const settingStore = useSettingStore();
    const { width } = useWindowSize();
    const state = reactive({
      open: false,
      isMini: false,
    });

    window.addEventListener('resize', () => (width.value = window.innerWidth));

    watch(
      () => width.value,
      (val) => settingStore.SET_WIDTH_PAGE(val),
      { immediate: true }
    );

    const isMobile = computed(() => width.value <= 600);

    onMounted(async () => {
      await settingStore.requestSettings();
      state.open = isMobile.value ? false : true;
    });

    const toggleSidebar = () => {
      if (!isMobile.value) {
        state.isMini = !state.isMini;
      } else {
        state.open = !state.open;
      }
    };

    return {
      ...toRefs(state),
      toggleSidebar,
    };
  },
});
</script>
