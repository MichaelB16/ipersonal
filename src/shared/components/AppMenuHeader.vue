<template>
  <q-header class="tw-h-[60px] tw-bg-white tw-mx-4">
    <div class="tw-flex tw-h-full tw-justify-between tw-w-full">
      <div class="tw-flex tw-items-center tw-justify-start tw-w-full">
        <q-btn
          dense
          round
          flat
          icon="menu"
          color="primary"
          aria-label="Menu"
          @click="$emit('toggle')"
        />
      </div>
      <div class="tw-flex tw-items-center tw-justify-end">
        <q-btn-dropdown :menu-offset="[0,10]" size="sm" color="primary" unelevated no-caps flat>
          <template v-slot:label>
            <div class="row q-gutter-x-sm tw-items-center no-wrap">
              <app-user-avatar/>
              <div
                class="text-left tw-mb-0 tw-w-[80px] q-mt-sm tw-flex text-white tw-h-full column"
              >
                <b
                  class="tw-leading-[8.5px] tw-text-primary ellipsis tw-w-[80px]"
                >
                  {{ profile.name }}
                </b>
                <div class="tw-w-[80px] tw-text-primary ellipsis">
                  {{ profile.email }}
                </div>
              </div>
            </div>
          </template>
          <q-list class="tw-w-[450px]">
            <div class="row tw-w-full bg-grey-2 q-pa-sm">
              <div class="col-5">
                <div class="tw-justify-center tw-h-full tw-items-center q-pa-md column">
                  <app-user-avatar class="q-mb-sm" size="60px"/>
                  <b class="tw-max-w-[150px] tw-leading-5 ellipsis" :title="profile.name">
                    {{ profile.name }}
                  </b>
                  <div :title="profile.email" class="tw-leading-5 tw-max-w-[150px] tw-text-[12px] tw-text-primary ellipsis">
                    {{ profile.email }}
                  </div>
                  <div class="tw-w-full tw-flex tw-justify-center tw-mt-2">
                    <q-btn
                      label="Sair"
                      icon="mdi-power"
                      no-caps
                      size="sm"
                      outline
                      color="primary"
                      @click="logout"
                      unelevated
                      rounded
                    />
                  </div>
                </div>
              </div>
              <div class="col q-pa-md bg-white tw-rounded-md">
                <app-form-profile />
              </div>
            </div>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </q-header>
</template>
<script>
import {computed, defineComponent} from 'vue';
import {useCacheStorage} from '../composable/storage';
import {useAuthStore} from 'src/modules/signin/stores/auth.store';

export default defineComponent({
  name: 'MenuHeader',
  props: {
    isMini: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const authStore = useAuthStore();
    const storage = useCacheStorage();

    const profile = computed(() => {
      return storage.getItemStorage('user-storage');
    });

    const logout = async () => {
      await authStore.REQUEST_LOGOUT()
    }

    return {
      profile,
      logout
    };
  },
});
</script>
