<template>
  <q-header class="tw-h-[60px] tw-bg-white">
    <div class="tw-flex tw-h-full tw-justify-between tw-w-full">
      <div class="tw-flex tw-items-center tw-justify-start tw-w-full">
        <q-item dense>
          <q-item-section v-if="menu">
            <div class="tw-flex logo-img">
              <img
                class="tw-h-[40px] tw-w-full xs:tw-hidden sm:tw-block md:tw-block lg:tw-block"
                src="~/assets/logo.svg"
                alt="logo"
              />
              <img
                src="~/assets/logo-mini.svg"
                class="xs:tw-block sm:tw-h-auto md:tw-h-auto sm:tw-hidden md:tw-hidden lg:tw-hidden"
                alt="mini logo"
              />
            </div>
          </q-item-section>
          <q-item-section class="tw-h-[60px] tw-w-[60px]" avatar v-else>
            <img src="~/assets/logo-mini.svg" alt="mini logo" />
          </q-item-section>
        </q-item>
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
      <div class="tw-gap-2 tw-flex tw-items-center tw-mx-4 tw-justify-end">
        <q-btn
          round
          class="xs:tw-hidden sm:tw-block"
          size="md"
          text-color="primary"
          flat
          @click="toggle"
          :icon="activeFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
        />
        <q-btn-dropdown
          :menu-offset="[0, 10]"
          size="sm"
          color="primary"
          unelevated
          no-caps
          flat
        >
          <template v-slot:label>
            <div class="row q-gutter-x-sm tw-items-center no-wrap">
              <app-user-avatar />
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
                <div
                  class="tw-justify-center tw-h-full tw-items-center q-pa-md column"
                >
                  <app-user-avatar class="q-mb-sm" size="60px" />
                  <b
                    class="tw-max-w-[150px] tw-leading-5 ellipsis"
                    :title="profile.name"
                  >
                    {{ profile.name }}
                  </b>
                  <div
                    :title="profile.email"
                    class="tw-leading-5 tw-max-w-[150px] tw-text-[12px] tw-text-primary ellipsis"
                  >
                    {{ profile.email }}
                  </div>
                  <div class="tw-w-full tw-flex tw-justify-center tw-mt-2">
                    <q-btn
                      label="Sair"
                      icon="mdi-power"
                      no-caps
                      size="sm"
                      outline
                      :loading="loading"
                      :disable="loading"
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
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useCacheStorage } from '../composable/storage';
import { useAuthStore } from 'src/modules/signin/stores/auth.store';
import { AppFullscreen } from 'quasar';

export default defineComponent({
  name: 'MenuHeader',
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const authStore = useAuthStore();
    const storage = useCacheStorage();
    const state = reactive({
      loading: false,
    });

    const user = Object.freeze(storage.getItemStorage('user-storage'));

    const profile = computed(() => {
      return user;
    });

    const activeFullscreen = computed(() => {
      return AppFullscreen.isActive;
    });

    const toggle = () => {
      if (activeFullscreen.value) {
        AppFullscreen.exit().catch((err) => {
          console.log(err);
        });
      } else {
        AppFullscreen.request().catch((err) => {
          console.log(err);
        });
      }
    };

    const logout = async () => {
      state.loading = true;
      await authStore.REQUEST_LOGOUT();
      state.loading = false;
    };

    return {
      profile,
      activeFullscreen,
      ...toRefs(state),
      toggle,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.logo-img {
  @apply tw-py-2 tw-justify-start tw-items-center;
  @apply xs:tw-w-[42px] xs:tw-h-[40px];
  @apply sm:tw-w-[280px] sm:tw-h-[60px];
  @apply md:tw-w-[280px] md:tw-h-[60px];
  @apply lg:tw-w-[280px] lg:tw-h-[60px];
}
</style>
