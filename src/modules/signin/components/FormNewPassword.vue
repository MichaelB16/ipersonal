<template>
  <q-form
    ref="formRef"
    @submit.prevent.stop="handleSubmit"
    class="tw-justify-center tw-w-[330px] tw-h-auto q-gutter-y-md"
  >
    <div class="col-12">
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div>
          <img src="~/assets/logo.svg" class="tw-h-[60px]" />
        </div>
        <div class="tw-text-[16px] tw-text-center">
          <div class="tw-text-[13px] text-grey-8">
            <b class="tw-text-[20px] tw-animate-pulse tw-text-primary">
              Olá, Michael!
            </b>
            {{ textTitle }}
          </div>
        </div>
      </div>
    </div>
    <template v-if="status === STATUS_FORM.FORM">
      <q-input
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
          <q-btn icon="mdi-eye" flat round size="xs" />
        </template>
      </q-input>
      <q-input
        :rules="rulesEmail()"
        v-model="form.new_password"
        rounded
        hide-bottom-space
        outlined
        dense
        type="email"
        placeholder="Confirme senha"
      >
        <template v-slot:prepend>
          <q-icon size="xs" name="mdi-lock-outline" />
        </template>
        <template v-slot:append>
          <q-btn icon="mdi-eye" flat round size="xs" />
        </template>
      </q-input>
      <q-btn
        class="full-width"
        color="primary"
        label="Salvar"
        no-caps
        type="submit"
        :loading="loading"
        rounded
        unelevated
      />
    </template>
    <template v-else>
      <div class="tw-flex tw-mt-5 tw-justify-center tw-animate-bounce">
        <q-btn
          to="/login"
          unelevated
          icon="mdi-arrow-left-thin"
          rounded
          no-caps
          color="primary"
          label="Voltar para login"
        />
      </div>
    </template>
  </q-form>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { formRules, rulesDate, rulesEmail } from 'src/shared/utils';

export default defineComponent({
  name: 'FormNewPassword',
  setup() {
    const formRef = ref();
    const storeAuth = useAuthStore();

    enum STATUS_FORM {
      FORM = 'form',
      FORM_SUCCESS = 'success',
    }

    const state = reactive({
      status: STATUS_FORM.FORM,
      form: {
        password: '',
        new_password: '',
      },
    });

    onBeforeMount(() => {
      reset();
    });

    const textTitle = computed(() => {
      const text_form =
        'Defina uma senha segura para começar a acessar a plataforma.';
      const text_success =
        'Parabéns! Agora volte ao login para começar a gerenciar seus alunos.';

      return STATUS_FORM.FORM === state.status ? text_form : text_success;
    });

    const loading = computed(() => {
      return storeAuth.loading;
    });

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          console.log('SUCCESS');
        }
      });
    };

    const reset = () => {
      state.form = {
        password: '',
        new_password: '',
      };
    };

    return {
      STATUS_FORM,
      formRef,
      rulesDate,
      rulesEmail,
      handleSubmit,
      formRules,
      ...toRefs(state),
      textTitle,
      loading,
    };
  },
});
</script>
