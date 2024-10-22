<template>
  <div class="row tw-min-h-[100dvh] tw-h-full">
    <div class="col-md-8 col-sm-6 sm:block bg-primary"></div>
    <div class="col">
      <div class="tw-flex tw-h-full tw-items-center tw-justify-center">
        <q-form
          ref="formRef"
          @submit.prevent.stop="handleSubmit"
          class="tw-justify-center tw-w-[300px] tw-h-auto q-gutter-y-md"
        >
          <div class="col-12">
            <div class="tw-flex tw-justify-center">
              <img src="~/assets/logo.svg" class="tw-h-[60px]"/>
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
              <q-icon name="mdi-email"/>
            </template>
          </q-input>
          <q-input
            type="password"
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
              <q-icon name="mdi-lock"/>
            </template>
          </q-input>
          <q-btn
            class="full-width"
            color="primary"
            label="Entrar"
            no-caps
            type="submit"
            :loading="loading"
            rounded
            unelevated
          />
          <app-btn-google/>
          <q-card v-if="error" class="bg-negative text-white no-shadow">
            <q-card-section class="tw-flex tw-justify-between tw-items-center">
              <div>
                <q-icon class="q-mr-sm tw-text-[18px]" name="mdi-alert"/>
                {{ error }}
              </div>
              <q-btn size="xs" @click="closeAlert" round flat icon="mdi-close"/>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, toRefs, reactive, ref, computed} from 'vue';
import {formRules} from 'src/shared/utils';
import {useAuthStore} from 'src/modules/signin/stores/auth.store';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'SigninPage',
  setup() {
    const formRef = ref();
    const storeAuth = useAuthStore();
    const router = useRouter();
    const state = reactive({
      form: {
        email: '',
        password: '',
      },
    });

    const error = computed(() => {
      return storeAuth.error;
    });

    const loading = computed(() => {
      return storeAuth.loading;
    });

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          const result: boolean = await storeAuth.REQUEST_LOGIN(state.form)
          result && redirect();
        }
      });
    };

    const closeAlert = () => {
      storeAuth.error = '';
    }

    const redirect = () => {
      const name = router.resolve({name: 'dashboard'});
      window.location.href = name.href;
    };

    return {
      formRef,
      error,
      ...toRefs(state),
      formRules,
      closeAlert,
      loading,
      handleSubmit,
    };
  },
});
</script>
