<template>
  <keep-alive>
    <img src="~/assets/logo.svg" alt="logo" loading="lazy" />
  </keep-alive>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AppLogo',
});
</script>
