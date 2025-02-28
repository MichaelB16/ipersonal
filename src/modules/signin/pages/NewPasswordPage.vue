<template>
  <auth-wrapper>
    <template v-slot:banner>
      <div
        class="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-justify-center tw-items-center"
      >
        <q-intersection
          tag="span"
          class="sm:tw-w-[350px] md:tw-w-[400px]"
          once
          transition="jump-up"
          transition-duration="3000"
        >
          <div class="tw-flex tw-w-full tw-items-center tw-justify-center">
            <div class="sm:tw-w-[250px] md:tw-w-full tw-flex tw-justify-center">
              <img
                src="~/assets/banner-new-password.svg"
                alt="banner"
                loading="lazy"
              />
            </div>
          </div>

          <div class="tw-text-white tw-text-center tw-w-full tw-mt-4">
            <b class="tw-text-[24px]">Defina sua nova senha!</b>
            <div>
              Crie uma senha forte para proteger sua conta. Combine letras,
              números e símbolos de forma única e evite sequências fáceis de
              adivinhar
            </div>
          </div>
        </q-intersection>
      </div>
    </template>
    <template v-slot:content>
      <div class="row tw-w-full tw-justify-center tw-items-center tw-h-full">
        <q-intersection once transition="jump-up" transition-duration="3000">
          <template v-if="loadingPage">
            <app-loading />
          </template>
          <template v-else>
            <template v-if="tokenIsValid">
              <form-new-password :user-id="userId" :username="name" />
            </template>
            <template v-else>
              <div
                class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-font-bold text-grey-8 tw-text-[32px]"
              >
                <q-icon
                  class="text-grey-8"
                  name="mdi-information"
                  size="80px"
                />
                Acesso inválido!
              </div>
            </template>
          </template>
        </q-intersection>
      </div>
    </template>
  </auth-wrapper>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import AuthWrapper from '../components/AuthWrapper.vue';
import FormNewPassword from '../components/FormNewPassword.vue';
import { useNewPassowrdStore } from '../stores/new_password.store';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'NewPasswordPage',
  components: { AuthWrapper, FormNewPassword },
  setup() {
    const newPasswordStore = useNewPassowrdStore();
    const route = useRoute();

    const state = reactive({
      tokenIsValid: true,
      name: '',
      userId: '',
    });

    onMounted(async () => {
      const token = route?.params?.token as string;
      const result = await newPasswordStore.REQUEST_CHECK_TOKEN(token);
      state.tokenIsValid = !!result;
      if (result) {
        state.name = result?.user?.name;
        state.userId = result?.user?.id;
      }
    });

    const loadingPage = computed(() => {
      return newPasswordStore.loadingPage;
    });

    return {
      ...toRefs(state),
      loadingPage,
    };
  },
});
</script>
