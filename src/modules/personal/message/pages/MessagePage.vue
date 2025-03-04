<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <template v-if="loadingPage">
      <message-skeleton />
    </template>
    <template v-else>
      <div class="row q-col-gutter-y-md">
        <div class="col-12">
          <app-title-page
            icon="mdi-message-outline"
            title="Configure suas mensagens"
            subtitle="Configure aqui suas mensagens para envios"
          ></app-title-page>
        </div>
        <div class="col-12">
          <q-card class="tw-w-full no-shadow" flat>
            <app-card-title title="Suas mensagens" hide-add hide-search />
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
                      :loading="loading"
                      v-model="form.message_pre_class"
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
                      :loading="loading"
                      v-model="form.message_pre_expiry"
                      outlined
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <div class="row tw-justify-end">
                      <q-btn
                        unelevated
                        no-caps
                        :loading="loading"
                        :disable="loading"
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
      </div>
    </template>
  </q-intersection>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue';
import { formRules } from 'src/shared/utils';
import { useMessageStore } from '../stores/message.store';
import MessageSkeleton from '../components/MessageSkeleton.vue';
import AppCardTitle from 'src/shared/components/AppCardTitle.vue';
export default defineComponent({
  name: 'MessagePage',
  components: { MessageSkeleton, AppCardTitle },
  setup() {
    const messageStore = useMessageStore();
    const formRef = ref();
    const state = reactive({
      loadingPage: false,
      form: {
        message_pre_class: '',
        message_pre_expiry: '',
      },
    });

    onMounted(async () => {
      state.loadingPage = true;
      await messageStore.REQUEST_GET_MESSAGE();
      setForm();
      state.loadingPage = false;
    });

    const loading = computed(() => {
      return messageStore.loading;
    });

    const handleSubmit = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await messageStore.REQUEST_ADD_OR_UPDATE_MESSAGE(state.form);
          setForm();
        }
      });
    };

    const setForm = () => {
      const data: any = messageStore.listMessage;
      state.form = {
        message_pre_class: data.message_pre_class || '',
        message_pre_expiry: data.message_pre_expiry || '',
      };
    };

    return {
      handleSubmit,
      formRules,
      loading,
      formRef,
      ...toRefs(state),
    };
  },
});
</script>
