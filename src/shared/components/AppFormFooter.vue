<template>
  <div class="row tw-justify-end q-mt-md">
    <div class="col-12">
      <q-separator color="grey-3" />
    </div>
    <div class="col-12 tw-flex tw-justify-end q-mt-md">
      <q-btn
        color="grey-3 text-grey-8"
        no-caps
        class="tw-mr-3"
        unelevated
        v-close-popup
        rounded
        label="Cancelar"
      />
      <q-btn
        color="primary"
        glossy
        unelevated
        rounded
        no-caps
        type="submit"
        :label="textSave"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFormFooter',
  props: {
    textSave: {
      type: String,
      default: 'Salvar',
    },
  },
});
</script>
