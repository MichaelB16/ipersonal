<template>
  <router-view />
  <app-loading-screen />
  <!-- <app-information-toggle /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {},
});
</script>
