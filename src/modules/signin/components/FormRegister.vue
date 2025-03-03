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
              Olá, personal!
            </b>
            Cadastre-se na plataforma e simplifique a gestão dos seus alunos.
          </div>
        </div>
      </div>
      <div class="tw-flex tw-mb-2 tw-mt-2" v-if="error || success">
        <template v-if="error">
          <app-alert :message="error" type="danger" @close="closeAlert" />
        </template>
        <template v-if="success">
          <app-alert
            :message="success"
            permanent
            type="success"
            @close="closeAlert"
          />
        </template>
      </div>
    </div>
    <q-input
      outlined
      dense
      hide-bottom-space
      v-model="form.name"
      rounded
      lazy-rules
      :rules="formRules()"
      icon="mdi-lock"
      placeholder="Nome"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-account-outline" />
      </template>
    </q-input>
    <q-input
      :rules="rulesEmail()"
      v-model="form.email"
      rounded
      hide-bottom-space
      outlined
      lazy-rules
      dense
      type="email"
      placeholder="E-mail"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-email-outline" />
      </template>
    </q-input>
    <q-input
      :rules="formRules()"
      v-model="form.phone"
      rounded
      hide-bottom-space
      outlined
      lazy-rules
      mask="(##)#####-####"
      dense
      placeholder="Celular"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-whatsapp" />
      </template>
    </q-input>
    <q-input
      :rules="rulesDate()"
      v-model="form.date_of_birth"
      rounded
      hide-bottom-space
      mask="##/##/####"
      outlined
      lazy-rules
      dense
      placeholder="Data de nascimento"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="mdi-calendar-outline" />
      </template>
    </q-input>
    <q-btn
      class="full-width"
      color="primary"
      label="Cadastrar"
      no-caps
      type="submit"
      :loading="loading"
      rounded
      unelevated
    />
    <app-btn-google />
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
import AppBtnGoogle from 'src/shared/components/AppBtnGoogle.vue';
import moment from 'moment';

export default defineComponent({
  name: 'FormSignin',
  components: {
    AppBtnGoogle,
  },
  setup() {
    const formRef = ref();
    const storeAuth = useAuthStore();

    const state = reactive({
      form: {
        email: '',
        name: '',
        phone: '',
        date_of_birth: '',
      },
    });

    onBeforeMount(() => {
      reset();
      storeAuth.error = '';
      storeAuth.success = '';
    });

    const error = computed(() => {
      return storeAuth.error;
    });

    const success = computed(() => {
      return storeAuth.success;
    });

    const loading = computed(() => {
      return storeAuth.loading;
    });

    const closeAlert = () => {
      storeAuth.error = '';
      storeAuth.success = '';
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const date = moment(state.form.date_of_birth, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          );
          const result = await storeAuth.REQUEST_CREATE_USER({
            ...state.form,
            date_of_birth: date,
          });

          if (result) {
            reset();
          }
        }
      });
    };

    const reset = () => {
      state.form = {
        email: '',
        name: '',
        phone: '',
        date_of_birth: '',
      };
    };

    return {
      closeAlert,
      formRef,
      rulesDate,
      rulesEmail,
      handleSubmit,
      formRules,
      ...toRefs(state),
      success,
      loading,
      error,
    };
  },
});
</script>
