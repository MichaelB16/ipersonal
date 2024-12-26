<template>
  <auth-wrapper>
    <template v-slot:banner>
      <div
        class="tw-flex tw-flex-col tw-h-full tw-justify-center tw-items-center"
      >
        <template v-if="isLogin">
          <q-intersection once transition="jump-up" transition-duration="3000">
            <div class="tw-flex tw-w-full tw-items-center tw-justify-center">
              <div
                class="sm:tw-w-[250px] md:tw-w-full tw-flex tw-justify-center"
              >
                <img src="~/assets/banner-login.svg" alt="banner" />
              </div>
            </div>

            <div
              class="tw-flex tw-mt-4 tw-flex-col tw-justify-center tw-items-center tw-text-white tw-w-[500px] tw-gap-1"
            >
              <b
                class="tw-text-[21px] sm:tw-w-[350px] md:tw-w-auto tw-w-full tw-text-center"
              >
                Faça seu login para acessar seus dados e recursos
              </b>
              <div
                class="tw-text-left text-center tw-w-[330px] q-px-sm tw-text-[14px]"
              >
                <li class="tw-font-medium">
                  <i>Plataforma personalizada de gestão de alunos</i>
                </li>
                <li class="tw-font-medium">
                  <i>Organização de horários</i>
                </li>
                <li class="tw-font-medium">
                  <i>Acompanhamento do progresso individual</i>
                </li>
                <li class="tw-font-medium">
                  <i>Ferramentas para personalizar treinos e dietas</i>
                </li>
              </div>
            </div>
          </q-intersection>
        </template>
        <template v-else>
          <q-intersection
            class="tw-w-full tw-flex tw-justify-center"
            once
            transition="jump-up"
            transition-duration="3000"
          >
            <div class="tw-flex tw-w-full tw-items-center tw-justify-center">
              <div
                class="sm:tw-w-[250px] md:tw-w-full tw-flex tw-justify-center"
              >
                <img src="~/assets/banner-register.svg" alt="banner" />
              </div>
            </div>

            <div
              class="tw-flex tw-mt-4 tw-flex-col tw-justify-center tw-items-center tw-text-white tw-w-[500px] tw-gap-1"
            >
              <b
                class="tw-text-[21px] sm:tw-w-[350px] md:tw-w-full lg:tw-w-full tw-text-center"
              >
                Transforme a gestão dos seus alunos com mais eficiência e
                personalização
              </b>
              <p
                class="tw-text-center sm:tw-w-[350px] md:tw-w-full lg:tw-w-full tw-text-[14px]"
              >
                Transforme a maneira como você gerencia seus alunos com uma
                plataforma intuitiva e totalmente adaptada às suas necessidades.
                Com nosso sistema de gestão, você poderá organizar horários,
                acompanhar o progresso individual de cada aluno, e personalizar
                os treinos e dietas de forma eficiente, tudo em um único lugar.
              </p>
            </div>
          </q-intersection>
        </template>
      </div>
    </template>
    <template v-slot:content>
      <div class="tw-flex q-pa-xs tw-h-[45px] tw-justify-center">
        <q-btn-group unelevated rounded>
          <q-btn
            size="sm"
            color="primary"
            :outline="!isLogin"
            no-caps
            @click="toggleLogin"
            label="Login"
            unelevated
          />
          <q-btn
            size="sm"
            color="primary"
            :outline="!isRegister"
            @click="toggleRegister"
            no-caps
            label="Cadastra-se"
            unelevated
          />
        </q-btn-group>
      </div>
      <div
        class="tw-flex tw-h-[calc(100dvh_-_45px)] tw-items-center tw-justify-center"
      >
        <template v-if="isLogin">
          <q-intersection once transition="jump-up" transition-duration="3000">
            <form-signin />
          </q-intersection>
        </template>
        <template v-else-if="isRegister">
          <q-intersection once transition-duration="3000" transition="jump-up">
            <form-register />
          </q-intersection>
        </template>
      </div>
    </template>
  </auth-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import FormSignin from '../components/FormSignin.vue';
import FormRegister from '../components/FormRegister.vue';
import AuthWrapper from '../components/AuthWrapper.vue';
export default defineComponent({
  name: 'SigninPage',
  components: { FormSignin, FormRegister, AuthWrapper },
  setup() {
    const state = reactive({
      isLogin: true,
      isRegister: false,
    });

    const toggleLogin = () => {
      state.isLogin = true;
      state.isRegister = false;
    };

    const toggleRegister = () => {
      state.isLogin = false;
      state.isRegister = true;
    };

    return {
      toggleLogin,
      toggleRegister,
      ...toRefs(state),
    };
  },
});
</script>
