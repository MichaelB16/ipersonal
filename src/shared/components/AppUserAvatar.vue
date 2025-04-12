<template>
  <q-avatar
    v-bind="$attrs"
    :color="isDark ? 'white' : 'primary'"
    :text-color="isDark ? 'primary' : 'white'"
    class="avatar-profile"
    :size="size"
  >
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
import { useSettingStore } from 'src/stores/settings';

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
    const settingStore = useSettingStore();
    const storage = useCacheStorage();
    const user = storage.getItemStorage('user-storage');

    const name = computed(() => {
      return user.name.slice(0, 1).toUpperCase();
    });

    const imageUrl = computed(() => {
      return user?.picture ? user?.picture.trim() : null;
    });

    const isDark = computed(() => {
      return settingStore.isDark;
    });

    const handleError = () => {
      state.imgSuccess = false;
    };

    return {
      ...toRefs(state),
      name,
      imageUrl,
      isDark,
      handleError,
    };
  },
});
</script>
<style scoped lang="scss"></style>
