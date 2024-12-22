<template>
  <auth-wrapper>
    <template v-slot:banner>
      <div
        class="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-justify-center tw-items-center"
      >
        <q-intersection
          tag="span"
          class="tw-w-[600px]"
          once
          transition="jump-up"
          transition-duration="3000"
        >
          <div>
            <img src="~/assets/banner-new-password.svg" />
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
          <form-new-password />
        </q-intersection>
      </div>
    </template>
  </auth-wrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AuthWrapper from '../components/AuthWrapper.vue';
import FormNewPassword from '../components/FormNewPassword.vue';
export default defineComponent({
  name: 'NewPasswordPage',
  components: { AuthWrapper, FormNewPassword },
});
</script>
