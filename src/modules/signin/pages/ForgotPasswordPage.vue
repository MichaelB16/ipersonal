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
              <q-img
                src="~/assets/banner-forgot-password.svg"
                alt="banner"
                spinner-color="white"
              />
            </div>
          </div>

          <div class="tw-text-white tw-text-center tw-w-full tw-mt-4">
            <b class="tw-text-[24px]">Esqueceu sua senha?</b>
            <div>
              Insira o e-mail associado à sua conta para receber um link de
              redefinição. Caso não encontre o e-mail na caixa de entrada,
              verifique o spam ou lixo eletrônico. Estamos aqui para garantir
              sua segurança!
            </div>
          </div>
        </q-intersection>
      </div>
    </template>
    <template v-slot:content>
      <div class="tw-flex tw-h-full tw-items-center tw-justify-center">
        <form-forgot-password />
      </div>
    </template>
  </auth-wrapper>
</template>
<script>
import { defineComponent } from 'vue';
import AuthWrapper from '../components/AuthWrapper.vue';
import FormForgotPassword from '../components/FormForgotPassword.vue';

export default defineComponent({
  name: 'ForgotPasswordPage',
  components: { AuthWrapper, FormForgotPassword },
});
</script>
