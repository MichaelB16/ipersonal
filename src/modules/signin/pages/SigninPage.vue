<template>
  <div class="row tw-min-h-[100dvh] tw-h-full">
    <div class="col-md-8 col-sm-6 sm:block bg-primary"></div>
    <div class="col">
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
        class="tw-flex tw-h-[calc(100vh_-_45px)] tw-items-center tw-justify-center"
      >
        <template v-if="isLogin">
          <q-intersection once transition="jump-up" transition-duration="600">
            <form-signin />
          </q-intersection>
        </template>
        <template v-else-if="isRegister">
          <q-intersection once transition-duration="600" transition="jump-up">
            <form-register />
          </q-intersection>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import FormSignin from '../components/FormSignin.vue';
import FormRegister from '../components/FormRegister.vue';
export default defineComponent({
  name: 'SigninPage',
  components: { FormSignin, FormRegister },
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
