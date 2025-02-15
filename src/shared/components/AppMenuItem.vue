<template>
  <q-list>
    <slot name="before" />
    <template v-for="(item, index) in listMenu">
      <template v-if="!!item?.dropdown">
        <q-expansion-item
          :key="index"
          class="q-mb-xs text-grey-8"
          default-opened
          :icon="item.icon"
          :label="item.label"
        >
          <app-menu-item class="q-mb-xs q-mt-sm" :list-menu="item.dropdown" />
        </q-expansion-item>
      </template>
      <template v-else>
        <q-item
          class="q-mb-xs text-grey-8"
          :key="index"
          :to="item.to"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.label }}
          </q-item-section>
        </q-item>
      </template>
    </template>
    <slot name="after" />
  </q-list>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IMenu } from '../model/menu.type';

export default defineComponent({
  name: 'MenuItem',
  props: {
    listMenu: {
      type: Array as PropType<IMenu[]>,
      default: () => [],
    },
  },
  setup() {},
});
</script>
