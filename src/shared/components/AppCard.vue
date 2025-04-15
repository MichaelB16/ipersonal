<template>
  <q-card v-bind="attrs" :dark="dark">
    <slot />
  </q-card>
</template>
<script lang="ts">
import { QCardProps } from 'quasar';
import { useSettingStore } from 'src/stores/settings';
import { computed, defineComponent, useAttrs } from 'vue';
export default defineComponent({
  name: 'AppCard',
  setup() {
    const attrs: QCardProps = useAttrs();
    const settingStore = useSettingStore();

    const dark = computed(() => {
      return settingStore.isDark;
    });

    return {
      attrs,
      dark,
    };
  },
});
</script>
