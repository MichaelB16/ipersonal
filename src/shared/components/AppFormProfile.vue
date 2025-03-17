<template>
  <q-form @submit="handleUpdateProfile" ref="formProfileRef">
    <div class="row q-gutter-y-sm">
      <q-input
        class="col-12"
        hide-bottom-space
        outlined
        v-model="form.name"
        dense
        :rules="formRules()"
        rounded
        input-class="tw-text-[12px]"
        label="Nome"
      />

      <q-input
        class="col-12"
        hide-bottom-space
        outlined
        dense
        rounded
        input-class="tw-text-[12px]"
        v-model="form.password"
        :rules="formRules()"
        :type="visible.password1 ? 'text' : 'password'"
        label="Senha"
      >
        <template v-slot:append>
          <q-btn
            @click="showPassword('password1')"
            size="xs"
            flat
            round
            :icon="
              visible.password1 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
          />
        </template>
      </q-input>

      <q-input
        class="col-12"
        hide-bottom-space
        outlined
        dense
        rounded
        :type="visible.password2 ? 'text' : 'password'"
        input-class="tw-text-[12px]"
        :rules="formRules(comparePassword)"
        v-model="form.compare_password"
        label="Confirmar Senha"
      >
        <template v-slot:append>
          <q-btn
            size="xs"
            @click="showPassword('password2')"
            flat
            round
            :icon="
              visible.password2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
          />
        </template>
      </q-input>

      <q-btn
        type="submit"
        label="Salvar"
        color="primary"
        rounded
        class="col-12"
        unelevated
        no-caps
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  defineComponent,
  ref,
  onMounted,
  computed,
} from 'vue';
import { formRules } from 'src/shared/utils';
import { useCacheStorage } from '../composable/storage';
import { userService } from 'src/modules/signin/services/user.service';
export default defineComponent({
  name: 'AppFormProfile',
  setup() {
    const storage = useCacheStorage();
    const formProfileRef = ref();
    const state = reactive({
      form: {
        compare_password: '',
        name: '',
        password: '',
      },
      visible: {
        password1: false,
        password2: false,
      },
    });

    const user = storage.getItemStorage('user-storage');

    onMounted(() => {
      state.form = {
        name: user.name,
        password: '',
        compare_password: '',
      };
    });

    const userId = computed(() => {
      return user.id;
    });

    const comparePassword = computed(() => {
      return [
        (value) => value === state.form.password || 'Senha não conferem!',
      ];
    });

    const showPassword = (password: string) => {
      state.visible[password] = !state.visible[password];
    };

    const handleUpdateProfile = () => {
      formProfileRef.value.validate().then((success: boolean) => {
        if (success) {
          console.log('request update');
          userService.updateUser(userId.value, {
            name: state.form.name,
            password: state.form.password,
          });
        }
      });
    };

    return {
      comparePassword,
      formProfileRef,
      formRules,
      showPassword,
      handleUpdateProfile,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss"></style>
