<template>
  <q-btn
    icon="mdi-google"
    rounded
    glossy
    type="button"
    no-caps
    :disable="loading"
    :loading="loading"
    class="tw-w-full"
    unelevated
    @click="loginWithGoogle"
    label="Login com o google"
  />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { googleSdkLoaded } from 'vue3-google-login';
import axios from 'axios';
import { useAuthStore } from 'src/modules/signin/stores/auth.store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const token: string | undefined = process.env.GOOGLE_CLIENT_ID;

    const loading = computed(() => {
      return authStore.loadingGoogle;
    });

    const loginWithGoogle = () => {
      if (token) {
        googleSdkLoaded((google) => {
          google.accounts.oauth2
            .initCodeClient({
              client_id: token,
              scope: 'email profile openid',
              callback: async (response) => {
                if (response?.code) {
                  await requestInfoUserGoogle(response.code);
                }
              },
            })
            .requestCode();
        });
      }
    };

    const requestInfoUserGoogle = async (code: string) => {
      await axios
        .post('https://oauth2.googleapis.com/token', {
          code: code,
          client_id: token,
          redirect_uri: 'postmessage',
          client_secret: process.env.GOOGLE_KEY_SECRET,
          grant_type: 'authorization_code',
        })
        .then(async ({ data }) => {
          const access_token = data.access_token;
          await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            })
            .then(async ({ data }) => {
              await oauth2Callback({
                name: data.name,
                email: data.email,
                picture: data.picture,
                sub: data.sub,
                google_access_token: access_token,
              });
            });
        });
    };

    const oauth2Callback = async (params) => {
      const result = await authStore.REQUEST_LOGIN_GOOGLE(params);
      if (result) {
        router.push({ name: 'dashboard' });
      }
    };

    return {
      loading,
      loginWithGoogle,
    };
  },
});
</script>
