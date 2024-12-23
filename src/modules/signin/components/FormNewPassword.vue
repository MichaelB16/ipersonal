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
              Olá, {{ username }}!
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
        :type="password_1 ? 'text' : 'password'"
        placeholder="Senha"
      >
        <template v-slot:prepend>
          <q-icon size="xs" name="mdi-lock-outline" />
        </template>
        <template v-slot:append>
          <q-btn
            :icon="password_1 ? 'mdi-eye-off' : 'mdi-eye'"
            @click="password_1 = !password_1"
            flat
            round
            size="xs"
          />
        </template>
      </q-input>
      <q-input
        :rules="rulesPassword()"
        v-model="form.new_password"
        rounded
        hide-bottom-space
        outlined
        dense
        :type="password_2 ? 'text' : 'password'"
        placeholder="Confirme senha"
      >
        <template v-slot:prepend>
          <q-icon size="xs" name="mdi-lock-outline" />
        </template>
        <template v-slot:append>
          <q-btn
            :icon="password_2 ? 'mdi-eye-off' : 'mdi-eye'"
            @click="password_2 = !password_2"
            flat
            round
            size="xs"
          />
        </template>
      </q-input>
      <q-btn
        class="full-width"
        color="primary"
        label="Salvar"
        no-caps
        type="submit"
        :loading="loading"
        :disable="loading"
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
import { formRules } from 'src/shared/utils';
import { useNewPassowrdStore } from '../stores/new_password.store';

export default defineComponent({
  name: 'FormNewPassword',
  props: {
    username: {
      type: String,
      default: '',
    },
    userId: {
      type: [String],
      default: null,
    },
  },
  setup(props) {
    const formRef = ref();
    const newPasswordStore = useNewPassowrdStore();

    enum STATUS_FORM {
      FORM = 'form',
      FORM_SUCCESS = 'success',
    }

    const state = reactive({
      status: STATUS_FORM.FORM,
      password_1: false,
      password_2: false,
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
      return newPasswordStore.loading;
    });

    const rulesPassword = () => {
      return formRules([
        (val) =>
          val === state.form.password ||
          'Ops! Parece que as senhas não são iguais!',
      ]);
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const result = await newPasswordStore.REQUEST_UPDATE_PASSWORD(
            parseInt(props.userId),
            {
              password: state.form.password,
            }
          );

          if (result) {
            state.status = STATUS_FORM.FORM_SUCCESS;
          }
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
      rulesPassword,
      handleSubmit,
      formRules,
      ...toRefs(state),
      textTitle,
      loading,
    };
  },
});
</script>
