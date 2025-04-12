<template>
  <q-btn-dropdown
    round
    color="grey-8"
    icon="mdi-dots-vertical"
    size="xs"
    class="menu-actions"
    content-class="app-btn-actions"
  >
    <q-list>
      <slot name="before-edit" />
      <q-item dense clickable v-close-popup @click="$emit('edit')">
        <q-item-section avatar>
          <q-icon color="grey-8" size="18px" name="mdi-pencil-outline" />
        </q-item-section>
        <q-item-section class="text-grey-8"> Editar </q-item-section>
      </q-item>
      <slot name="after-edit" />
      <q-item dense clickable v-close-popup @click="$emit('remove')">
        <q-item-section avatar>
          <q-icon size="18px" color="grey-8" name="mdi-trash-can-outline" />
        </q-item-section>
        <q-item-section class="text-grey-8"> Excluir </q-item-section>
      </q-item>
      <slot name="after-remove" />
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppBtnActions',
});
</script>
<style scoped lang="scss">
.menu-actions {
  :deep(.q-btn-dropdown__arrow) {
    display: none;
  }
}
</style>
