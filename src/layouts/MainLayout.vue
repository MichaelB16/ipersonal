<template>
  <q-layout view="lHr lpR lFr">
    <app-menu-header :is-mini="!open" @toggle="toggleSidebar" />
    <app-sidebar-left v-model="open" />
    <q-page-container class="tw-min-h-[100dvh]">
      <div id="container" class="tw-px-4">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const state = reactive({
      open: true,
    });

    const toggleSidebar = () => {
      state.open = !state.open;
    };

    return {
      ...toRefs(state),
      toggleSidebar,
    };
  },
});
</script>
