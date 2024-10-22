<template>
  <q-avatar v-bind="$attrs" :size="size">
    <template v-if="imageUrl">
      <img alt="img" :src="imageUrl"/>
    </template>
    <template v-else>
      {{ name }}
    </template>
  </q-avatar>
</template>
<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useCacheStorage} from '../composable/storage';

export default defineComponent({
  name: 'AppUserAvatar',
  props: {
    size: {
      type: String,
      default: '35px'
    }
  },
  setup() {
    const storage = useCacheStorage()
    const user = storage.getItemStorage('user-storage');

    const name = computed(() => {
      return user.name.slice(0, 1)
    });

    const imageUrl = computed(() => {
      return user?.picture || ''
    });

    return {
      name,
      imageUrl
    }
  }
})
</script>
<style scoped lang="scss">

</style>
