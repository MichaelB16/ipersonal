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
              Esqueceu a senha?
            </b>
            Por favor, envie seu e-mail para que possamos ajudá-lo a recuperar o
            acesso ao seu sistema de forma rápida e segura!
          </div>
        </div>
      </div>
      <div class="tw-flex tw-mb-2 tw-mt-2" v-if="notification.visible">
        <app-alert
          :message="notification.message"
          :type="notification.type"
          @close="closeAlert"
        />
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
    <q-btn
      class="full-width"
      color="primary"
      label="Enviar"
      no-caps
      type="submit"
      :loading="loading"
      :disable="loading"
      rounded
      unelevated
    />
    <q-btn
      to="/login"
      unelevated
      icon="mdi-arrow-left-thin"
      rounded
      glossy
      class="full-width"
      no-caps
      label="Voltar para login"
    />
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
import { formRules } from 'src/shared/utils';
import { useForgotPassowrdStore } from '../stores/forgot_password.store';

export default defineComponent({
  name: 'FormSignin',
  setup() {
    const formRef = ref();
    const forgotStore = useForgotPassowrdStore();
    const state = reactive({
      form: {
        email: '',
      },
    });

    onBeforeUnmount(() => {
      reset();
      closeAlert();
    });

    const notification = computed(() => {
      return forgotStore.notification;
    });

    const loading = computed(() => {
      return forgotStore.loading;
    });

    const closeAlert = () => {
      forgotStore.notification = {
        type: '',
        message: '',
        visible: false,
      };
    };

    const reset = () => {
      state.form = {
        email: '',
      };
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const result = await forgotStore.REQUEST_FORGOT_PASSWORD(state.form);
          result && reset();
        }
      });
    };

    return {
      closeAlert,
      handleSubmit,
      formRef,
      formRules,
      ...toRefs(state),
      loading,
      notification,
    };
  },
});
</script>
