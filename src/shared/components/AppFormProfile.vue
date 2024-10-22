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
        :rules="formRules()"
        rounded
        v-model="form.email"
        input-class="tw-text-[12px]"
        label="E-mail"
      />

      <q-input
        class="col-12"
        hide-bottom-space
        outlined
        dense
        rounded
        input-class="tw-text-[12px]"
        v-model="form.password"
        label="Senha"
      />

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
import {reactive, toRefs, defineComponent, ref, onMounted} from 'vue';
import {formRules} from 'src/shared/utils';
import {useCacheStorage} from '../composable/storage';

export default defineComponent({
  name: 'AppFormProfile',
  setup() {
    const storage = useCacheStorage();
    const formProfileRef = ref();
    const state = reactive({
      form: {
        email: '',
        name: '',
        password: '',
      },
    });

    onMounted(() => {
      const user = storage.getItemStorage('user-storage');
      state.form = {
        email: user.email,
        name: user.name,
        password: '',
      };
    });

    const handleUpdateProfile = () => {
      formProfileRef.value.validate().then((success: boolean) => {
        if (success) {
          console.log('request update')
        }
      })
    }

    return {
      formRules,
      formProfileRef,
      handleUpdateProfile,
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="scss">

</style>
