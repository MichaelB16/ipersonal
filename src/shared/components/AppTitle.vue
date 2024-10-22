<template>
  <q-card flat class="tw-w-full app-title">
    <div class="row tw-items-center q-pa-md">
      <div class="col">
        <b class="title-page text-grey-8">{{ title }}</b>
      </div>
      <div class="col">
        <div class="row tw-justify-end q-gutter-x-sm tw-items-center">
          <div class="col-6" v-if="!hideSearch">
            <app-input
              v-model="search"
              rounded
              color="black"
              bg-color="white"
              icon="mdi-magnify"
              placeholder="Pesquisar"
              outlined
              @keydown.enter="$emit('search',{search})"
              dense
            >
              <template v-slot:append>
                <q-btn
                  icon="mdi-magnify"
                  round
                  size="xs"
                  unelevated
                  @click="$emit('search',{search})"
                  :disable="!search"
                  color="primary"
                />
              </template>
            </app-input>
          </div>
          <div class="col-auto" v-if="!hideAdd">
            <q-btn color="primary" icon="mdi-plus" size="xs" @click="$emit('add')" round/>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'AppTitle',
  emits: ['add', 'search'],
  props: {
    hideAdd: {
      type: Boolean,
      default: false,
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const search = ref()

    return {
      search
    };
  },
});
</script>
<style lang="scss" scoped>
.app-title {
  border-radius: 0;

  .title-page {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }
}
</style>
