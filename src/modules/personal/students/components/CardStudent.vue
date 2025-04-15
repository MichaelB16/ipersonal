<template>
  <div class="col-sm-6 col-md-3 col-xs-12">
    <app-card bordered class="no-shadow">
      <q-card-section class="tw-p-4">
        <div class="tw-flex text-center tw-flex-col tw-justify-center">
          <div class="tw-absolute tw-right-0 tw-top-0 tw-m-1">
            <btn-views :row="row" />
            <btn-pdf :row="row" />
            <actions :row="row" v-bind="$attrs" />
          </div>
          <div>
            <q-avatar
              size="60px"
              class="text-uppercase"
              text-color="white"
              color="primary"
            >
              {{ username.slice(0, 2) }}
            </q-avatar>
          </div>
          <div class="tw-flex tw-flex-col tw-mt-2 tw-mb-1 tw-gap-2">
            <b
              class="tw-text-[16px] text-grey-8 tw-leading-3 tw-text-ellipsis text-capitalize"
            >
              {{ row.name }} ({{ row.age }} anos)
            </b>
            <span class="tw-text-[14px] ellipsis text-grey-8">
              {{ row.email }}
            </span>
            <span class="tw-text-[12px] tw-tracking-widest text-grey-8">
              {{ row.phone }}
            </span>
          </div>
          <span>
            <q-chip
              size="sm"
              class="text-white"
              :color="parseInt(row.access) ? 'secondary' : 'red'"
              :label="parseInt(row.access) ? 'Com acesso' : 'Sem acesso'"
            />
          </span>
        </div>
      </q-card-section>
    </app-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Actions from './Actions.vue';
import BtnViews from './BtnViews.vue';
import BtnPdf from './BtnPdf.vue';
export default defineComponent({
  name: 'CardStudent',
  components: { Actions, BtnViews, BtnPdf },
  props: {
    row: {
      type: Object as PropType<any>,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const username = computed(() => {
      return props.row.name || '';
    });

    return { username };
  },
});
</script>
