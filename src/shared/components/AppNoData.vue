<template>
  <div
    class="tw-flex tw-h-[250px] tw-items-center column tw-w-full tw-justify-center"
  >
    <template v-if="loading">
      <div class="tw-flex tw-w-full tw-justify-center tw-p-4">
        <app-loading hide-text size="tw-w-[50px] tw-h-[50px]" />
      </div>
    </template>
    <template v-else>
      <div
        class="tw-flex tw-flex-col bg-grey-1 tw-justify-center tw-items-center tw-w-[300px] tw-rounded-[4px] tw-p-4 tw-border"
      >
        <q-icon
          class="tw-text-[5em] text-grey-8"
          name="mdi-information-outline"
        />
        <b class="text-grey-8 tw-text-[14px]">
          {{ message }}
        </b>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppNoData',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Nenhum registro encontrado!',
    },
  },
});
</script>
<style scoped lang="scss"></style>
