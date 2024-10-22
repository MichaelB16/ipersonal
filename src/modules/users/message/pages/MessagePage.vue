<template>
  <div class="row">
    <app-title title="Lista mensagens" hide-add hide-search />
    <q-card class="tw-w-full no-shadow" flat>
      <q-card-section class="q-px-md">
        <q-form ref="formRef" @submit.prevent="handleSubmit">
          <div class="row q-col-gutter-y-md">
            <div class="col-12">
              <q-input
                bg-color="white"
                label="Mensagem de pré aula"
                type="textarea"
                outlined
                :rules="formRules()"
                hide-bottom-space
                v-model="form.message_before_class"
                dense
              />
            </div>
            <div class="col-12">
              <q-input
                bg-color="white"
                label="Mensagem de pré vencimento da mensalidade"
                type="textarea"
                :rules="formRules()"
                hide-bottom-space
                v-model="form.message_before_payment"
                outlined
                dense
              />
            </div>
            <div class="col-12">
              <div class="row tw-justify-end">
                <q-btn
                  unelevated
                  label="Salvar"
                  type="submit"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { formRules } from 'src/shared/utils';

export default defineComponent({
  name: 'MessagePage',
  setup() {
    const formRef = ref();
    const state = reactive({
      form: {
        message_before_class: '',
        message_before_payment: '',
      },
    });

    const handleSubmit = () => {
      console.log(formRef);
      formRef.value.validate().then((success: boolean) => {
        if (success) {
          console.log(state.form);
        }
      });
    };

    return {
      handleSubmit,
      formRules,
      formRef,
      ...toRefs(state),
    };
  },
});
</script>
