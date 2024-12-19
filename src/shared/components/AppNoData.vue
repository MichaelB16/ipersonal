<template>
  <div class="tw-flex tw-h-[250px] tw-items-center column tw-w-full tw-justify-center">
      <q-icon class="tw-text-[6em] tw-text-primary" name="mdi-information-outline"/>
      <b class="tw-text-primary tw-text-[14px]">{{message}}</b>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'AppNoData',
  props: {
    message: {
      type: String,
      default: 'Nenhum registro encontrado!'
    }
  }
})
</script>
<style scoped lang="scss">

</style>
