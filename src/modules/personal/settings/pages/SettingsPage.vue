<template>
  <q-intersection once transition="jump-up" transition-duration="3000">
    <div class="row q-col-gutter-y-md">
      <div class="col-12">
        <app-title-page
          icon="mdi-cog-outline"
          title="Configurações"
          subtitle="configure sua logo e informações"
        ></app-title-page>
      </div>
      <div class="col-12">
        <app-card bordered class="no-shadow">
          <q-card-section class="tw-h-[250px]" v-if="loading">
            <div class="row q-col-gutter-y-md">
              <div class="col-12" v-for="value in 4" :key="value">
                <q-skeleton height="40px" class="tw-rounded-full" />
              </div>
            </div>
          </q-card-section>
          <q-card-section v-else>
            <q-form ref="formRef" @submit.prevent="handleSubmit">
              <div class="row q-col-gutter-y-md q-col-gutter-x-md">
                <div class="col-6">
                  <app-input
                    v-model="form.name"
                    :rules="formRules()"
                    label="Nome"
                    bg-color="white"
                    hide-bottom-space
                  >
                    <template v-slot:prepend>
                      <q-icon size="xs" name="mdi-account-outline" />
                    </template>
                  </app-input>
                </div>
                <div class="col-6">
                  <app-input
                    v-model="form.phone"
                    :rules="formRules()"
                    label="Celular"
                    lazy-rules
                    bg-color="white"
                    mask="(##)#####-####"
                    hide-bottom-space
                  >
                    <template v-slot:prepend>
                      <q-icon size="xs" name="mdi-whatsapp" />
                    </template>
                  </app-input>
                </div>
                <div class="col-12">
                  <q-file
                    label="Sua logo"
                    placeholder="Faça o upload da sua logo para sair nos pdf de dieta e treino"
                    outlined
                    dense
                    bg-color="white"
                    hide-bottom-space
                    rounded
                    v-model="file"
                    clearable
                  >
                    <template v-slot:prepend>
                      <q-btn
                        flat
                        round
                        dense
                        color="grey-8"
                        size="sm"
                        icon="mdi-upload"
                      />
                    </template>
                  </q-file>
                </div>
                <div class="col-12">
                  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                    <div class="col-xs-12 col-sm-12 col-md col-lg">
                      <app-card bordered class="no-shadow">
                        <q-card-section
                          class="tw-border q-py-sm bg-grey-2 tw-border-t-2"
                        >
                          <div class="row items-center justify-between">
                            <b class="tw-text-[16px] text-grey-8">
                              Redimensione sua logo
                            </b>
                          </div>
                        </q-card-section>
                        <q-card-section class="tw-flex tw-justify-center">
                          <div>
                            <cropper
                              ref="cropperRef"
                              class="cropper"
                              :src="form.logo"
                              :auto-zoom="true"
                              image-restriction="stencil"
                              :stencil-props="{
                                aspectRatio: 1,
                              }"
                              :resize-image="{
                                adjustStencil: false,
                              }"
                              :stencil-size="{
                                width: 200,
                                height: 200,
                              }"
                            />
                            <q-btn
                              size="sm"
                              unelevated
                              class="tw-w-[300px] tw-mt-2 tw-h-[30px]"
                              :color="form.logo ? 'secondary' : 'red'"
                              icon="mdi-crop"
                              no-caps
                              label="Cortar imagem"
                              :disable="!form.logo"
                              @click="handleCrop"
                            >
                            </q-btn>
                          </div>
                        </q-card-section>
                      </app-card>
                    </div>
                    <div class="col-auto xs-hide sm-hide">
                      <div class="row full-height items-center justify-center">
                        <q-btn
                          class="tw-w-[30px] tw-h-[30px]"
                          round
                          unelevated
                          size="sm"
                          glossy
                          color="primary"
                          icon="mdi-arrow-right"
                        />
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md col-lg">
                      <app-card bordered class="no-shadow">
                        <q-card-section
                          class="tw-border q-py-sm bg-grey-2 tw-border-t-2"
                        >
                          <b class="tw-text-[16px] text-grey-8">Minha logo</b>
                        </q-card-section>
                        <q-card-section
                          class="tw-h-[370px] tw-flex tw-justify-center tw-items-center tw-w-full"
                        >
                          <template v-if="form.logo">
                            <q-img
                              fit="contain"
                              alt="banner"
                              class="tw-h-full tw-w-full"
                              :src="form.logo"
                            />
                          </template>
                          <template v-else>
                            <app-alert
                              permanent
                              hide-close
                              type="info"
                              message="Faça o upload da sua logo para sair nos pdf de dieta e treino"
                            />
                          </template>
                        </q-card-section>
                      </app-card>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <q-btn
                    class="tw-w-full"
                    color="primary"
                    unelevated
                    rounded
                    :loading="loadingSubmit"
                    :disable="loadingSubmit"
                    no-caps
                    glossy
                    type="submit"
                    label="Salvar"
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </app-card>
      </div>
    </div>
  </q-intersection>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { formRules, base64ToFile } from 'src/shared/utils';
import { useSettingStore } from 'src/stores/settings';
import { useNotification } from 'src/shared/composable/notification';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default defineComponent({
  name: 'PersonalizePage',
  components: {
    Cropper,
  },
  setup() {
    const { success } = useNotification();
    const settingStore = useSettingStore();
    const formRef = ref();
    const cropperRef = ref();
    const file = ref();
    const loading = ref(true);
    const loadingSubmit = ref(false);
    const form = reactive({
      name: '',
      phone: '',
      logo: '',
    });

    watch(
      () => settingStore.userData,
      (value) => {
        form.name = value.name;
        form.phone = value.phone;
        form.logo = value.logo;
        if (value.name) {
          loading.value = false;
        }
      },
      {
        immediate: true,
      }
    );

    watch(
      () => file.value,
      (value) => {
        if (value) {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          reader.onload = () => {
            form.logo = reader.result as string;
          };
        } else {
          form.logo = '';
        }
      }
    );

    const handleCrop = () => {
      const cropper = cropperRef.value;
      const { canvas } = cropper.getResult();
      file.value = base64ToFile(canvas.toDataURL(), 'logo.png');
      form.logo = canvas.toDataURL();
      success({ message: 'Imagem cortada com sucesso!' });
    };

    const handleSubmit = () => {
      formRef.value.validate().then(async (isSuccess) => {
        if (isSuccess) {
          const formData = new FormData();
          formData.append('phone', form.phone);
          formData.append('name', form.name);
          form.logo && formData.append('logo', file.value);

          loadingSubmit.value = true;
          await settingStore.requestSetSettings(formData);
          loadingSubmit.value = false;
        }
      });
    };

    return {
      form,
      loading,
      loadingSubmit,
      formRef,
      file,
      cropperRef,
      handleCrop,
      formRules,
      handleSubmit,
    };
  },
});
</script>
<style lang="scss">
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}
</style>
