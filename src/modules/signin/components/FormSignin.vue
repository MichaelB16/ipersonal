<template>
  <q-form
    ref="formRef"
    @submit.prevent.stop="handleSubmit"
    class="tw-justify-center tw-w-[330px] tw-h-auto q-gutter-y-md"
  >
    <div class="col-12">
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div>
          <app-logo />
        </div>
        <div class="tw-text-[16px] tw-text-center">
          <div class="tw-text-[13px] text-grey-8">
            <b class="tw-text-[20px] tw-animate-pulse tw-text-primary">
              Bem-vindo!
            </b>
            Faça login na plataforma e simplifique a gestão dos seus alunos.
          </div>
        </div>
      </div>
      <div class="tw-flex tw-mb-2 tw-mt-2" v-if="error">
        <template v-if="error">
          <app-alert :message="error" type="danger" @close="closeAlert" />
        </template>
      </div>
    </div>
    <q-input
      :rules="formRules()"
      v-model="form.email"
      rounded
      hide-bottom-space
      outlined
      dense
      type="email"
      placeholder="E-mail"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-email-outline" />
      </template>
    </q-input>
    <q-input
      :type="showPassword ? 'text' : 'password'"
      outlined
      dense
      hide-bottom-space
      v-model="form.password"
      rounded
      :rules="formRules()"
      icon="mdi-lock"
      placeholder="Senha"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-lock-outline" />
      </template>
      <template v-slot:append>
        <q-btn
          size="xs"
          @click="showPassword = !showPassword"
          round
          flat
          :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        />
      </template>
    </q-input>
    <q-btn
      class="full-width"
      color="primary"
      label="Entrar"
      no-caps
      type="submit"
      :disable="loading"
      :loading="loading"
      rounded
      unelevated
    />
    <app-btn-google />
    <a
      @click="redirectForgot"
      class="tw-flex tw-font-medium tw-justify-center tw-items-center tw-underline tw-cursor-pointer"
    >
      Esqueceu a senha?
    </a>
  </q-form>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  toRefs,
  onBeforeUnmount,
} from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { formRules } from 'src/shared/utils';

export default defineComponent({
  name: 'FormSignin',
  setup() {
    const formRef = ref();
    const router = useRouter();
    const storeAuth = useAuthStore();

    const state = reactive({
      showPassword: false,
      form: {
        email: '',
        password: '',
      },
    });

    onBeforeUnmount(() => {
      state.showPassword = false;
      state.form = {
        email: '',
        password: '',
      };
    });

    const error = computed(() => {
      return storeAuth.error;
    });

    const loading = computed(() => {
      return storeAuth.loading;
    });

    const closeAlert = () => {
      storeAuth.error = '';
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const result: boolean = await storeAuth.REQUEST_LOGIN(state.form);
          result && redirect();
        }
      });
    };

    const redirectForgot = () => {
      router.push({ name: 'forgot_password' });
    };

    const redirect = () => {
      const name = router.resolve({ name: 'dashboard' });
      window.location.href = name.href;
    };

    return {
      closeAlert,
      handleSubmit,
      redirectForgot,
      formRules,
      ...toRefs(state),
      formRef,
      loading,
      error,
    };
  },
});
</script>
