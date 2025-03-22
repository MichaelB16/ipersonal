<template>
  <q-header class="tw-h-[60px] tw-bg-white">
    <div class="tw-flex tw-h-full tw-justify-between tw-w-full">
      <div class="tw-flex tw-items-center tw-justify-start tw-w-full">
        <q-item dense>
          <q-item-section v-if="menu">
            <div class="tw-flex logo-img">
              <app-logo
                class="tw-h-[40px] tw-w-full xs:tw-hidden sm:tw-block md:tw-block lg:tw-block"
              />

              <app-logo
                type="mini"
                class="xs:tw-block sm:tw-h-auto md:tw-h-auto sm:tw-hidden md:tw-hidden lg:tw-hidden"
              />
            </div>
          </q-item-section>
          <q-item-section class="tw-h-[60px] tw-w-[60px]" avatar v-else>
            <app-logo type="mini" />
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
            <app-profile
              :loading="loadingPage"
              :name="profile.name"
              :email="profile.email"
            />
          </template>
          <q-list class="xs:tw-w-[345px] sm:tw-w-[450px]">
            <div class="row tw-w-full bg-grey-2 q-pa-sm">
              <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5">
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
              <div
                class="col-xs-12 col-sm col-md col-lg q-pa-md bg-white tw-rounded-md"
              >
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
import { useAuthStore } from 'src/modules/signin/stores/auth.store';
import { AppFullscreen } from 'quasar';
import { useSettingStore } from 'src/stores/settings';
import AppFormProfile from './AppFormProfile.vue';
import AppUserAvatar from './AppUserAvatar.vue';

import AppProfile from './AppProfile.vue';
export default defineComponent({
  name: 'AppMenuHeader',
  components: {
    AppFormProfile,
    AppProfile,
    AppUserAvatar,
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const authStore = useAuthStore();
    const settingStore = useSettingStore();
    const state = reactive({
      loading: false,
    });

    const loadingPage = computed(() => {
      return settingStore.loadingSetting;
    });

    const profile = computed(() => {
      return settingStore.userData;
    });

    const activeFullscreen = computed(() => {
      return AppFullscreen.isActive;
    });

    const toggle = () => {
      activeFullscreen.value ? AppFullscreen.exit() : AppFullscreen.request();
    };

    const logout = async () => {
      state.loading = true;
      await authStore.REQUEST_LOGOUT();
      state.loading = false;
    };

    return {
      loadingPage,
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
  @apply sm:tw-w-[230px] sm:tw-h-[60px];
  @apply md:tw-w-[230px] md:tw-h-[60px];
  @apply lg:tw-w-[230px] lg:tw-h-[60px];
}
</style>
