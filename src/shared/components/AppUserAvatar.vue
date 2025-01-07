<template>
  <q-avatar v-bind="$attrs" color="primary" class="tw-text-white" :size="size">
    <template v-if="imageUrl && imgSuccess">
      <q-img alt="img" @error="handleError" :src="imageUrl" />
    </template>
    <template v-else>
      {{ name }}
    </template>
  </q-avatar>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useCacheStorage } from '../composable/storage';

export default defineComponent({
  name: 'AppUserAvatar',
  props: {
    size: {
      type: String,
      default: '35px',
    },
  },
  setup() {
    const state = reactive({
      imgSuccess: true,
    });
    const storage = useCacheStorage();
    const user = storage.getItemStorage('user-storage');

    const name = computed(() => {
      return user.name.slice(0, 1).toUpperCase();
    });

    const imageUrl = computed(() => {
      return user?.picture ? user?.picture.trim() : null;
    });

    const handleError = () => {
      state.imgSuccess = false;
    };

    return {
      ...toRefs(state),
      name,
      imageUrl,
      handleError,
    };
  },
});
</script>
<style scoped lang="scss"></style>
