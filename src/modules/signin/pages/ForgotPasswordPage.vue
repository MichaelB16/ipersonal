<template>
  <auth-wrapper>
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
