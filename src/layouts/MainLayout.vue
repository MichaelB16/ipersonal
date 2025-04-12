<template>
  <q-layout :class="isDark" view="hHh lpR lFr">
    <app-menu-header :menu="!isMini" @toggle="toggleSidebar" />
    <app-sidebar-left :mini="isMini" v-model="open" />
    <q-page-container class="tw-min-h-[100dvh]">
      <div class="tw-pl-4 tw-pb-6 tw-pr-4 main-page-content">
        <div id="container">
          <router-view />
        </div>
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
import { useCacheStorage } from 'src/shared/composable/storage';
export default defineComponent({
  name: 'MainLayout',
  components: {
    AppMenuHeader,
    AppSidebarLeft,
  },
  setup() {
    const settingStore = useSettingStore();
    const { width } = useWindowSize();
    const storage = useCacheStorage();
    const state = reactive({
      open: false,
    });

    window.addEventListener('resize', () => (width.value = window.innerWidth));

    onMounted(async () => {
      const value = storage.getItemStorage('user-theme');
      settingStore.isDark = value || false;

      await settingStore.requestSettings();
      state.open = isMobile.value ? false : true;
    });

    const isMini = computed(() => {
      return settingStore.menuMini;
    });

    const isMobile = computed(() => width.value <= 600);

    const isDark = computed(() => {
      return settingStore.isDark ? 'dark-theme' : 'light-theme';
    });

    watch(
      () => width.value,
      (val) => settingStore.SET_WIDTH_PAGE(val),
      { immediate: true }
    );

    watch(
      () => isMobile,
      (val) => settingStore.SET_IS_MOBILE(val),
      { immediate: true }
    );

    const toggleSidebar = () => {
      if (!isMobile.value) {
        settingStore.SET_MENU_MINI(!isMini.value);
      } else {
        state.open = !state.open;
      }
    };

    return {
      ...toRefs(state),
      isMini,
      isDark,
      toggleSidebar,
    };
  },
});
</script>
