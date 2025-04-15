<template>
  <div class="row full-width">
    <app-card bordered dense class="full-width no-shadow">
      <q-card-section class="tw-px-[45px]">
        <app-logo />
      </q-card-section>
    </app-card>
  </div>
  <div class="row q-mt-sm tw-px-[60px] q-col-gutter-y-md">
    <div
      class="col-12 flex flex-column"
      v-for="(item, index) in listText"
      :key="index"
    >
      <div class="full-width">
        <b class="tw-text-[20px]">{{ item.title }}</b>
      </div>
      <p
        class="tw-text-[14px] text-justify tw-leading-6 tw-w-[60%]"
        v-html="item.text"
      ></p>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyPage',
  setup() {
    const listText = computed(() => {
      return [
        {
          title: '1. Política de Privacidade',
          text: `Introdução Este aplicativo respeita sua privacidade e está comprometido em proteger suas informações pessoais. <br />
          Esta Política de Privacidade explica como coletamos, usamos e protegemos os dados acessados por meio da integração com o Google Calendar.
          `,
        },
        {
          title: '2. Coleta e Uso de',
          text: ` Dados Nosso aplicativo acessa apenas os eventos do Google Calendar do
      usuário para fins de exibição de informações. <br />
      Nenhum dado é armazenado, compartilhado ou utilizado para outros
      propósitos além do funcionamento do próprio aplicativo.`,
        },
        {
          title: '3. Permissões Necessárias',
          text: ` O aplicativo requer permissão para acessar seu Google Calendar para: Ler
      eventos do seu calendário e exibi-los na interface do aplicativo. <br />
      Nenhuma outra informação pessoal é coletada ou processada.`,
        },
        {
          title: '4. Compartilhamento de Dados',
          text: ` Este aplicativo não compartilha suas informações com terceiros. Toda a
      leitura de eventos ocorre de maneira segura e local no dispositivo do
      usuário.`,
        },
        {
          title: '5. Segurança',
          text: `Adotamos medidas adequadas para proteger suas informações contra acessos
      não autorizados ou uso indevido. Nenhum dado é armazenado nos servidores
      do aplicativo.`,
        },
        {
          title: '6. Consentimento',
          text: ` Ao utilizar o aplicativo, você concorda com esta Política de Privacidade e
      autoriza o acesso aos seus eventos do Google Calendar para exibição.`,
        },
        {
          title: '7. Contato',
          text: ` Se tiver alguma dúvida sobre esta Política de Privacidade, entre em
      contato pelo e-mail <b>michaelbatistasousa@gmail.com</b>
      <br />Esta Política de Privacidade pode ser atualizada a qualquer momento. <br />
      Recomendamos que os usuários revisem periodicamente esta página para se
      manterem informados sobre eventuais mudanças.`,
        },
      ];
    });

    return {
      listText,
    };
  },
});
</script>
