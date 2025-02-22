import { boot } from 'quasar/wrappers';

const components = {
  AppAlert: () => import('src/shared/components/AppAlert.vue'),
  AppLoading: () => import('src/shared/components/AppLoading.vue'),
  AppSkeletonTitle: () => import('src/shared/components/AppSkeletonTitle.vue'),
  AppSkeletonTable: () => import('src/shared/components/AppSkeletonTable.vue'),
  AppLoadingScreen: () => import('src/shared/components/AppLoadingScreen.vue'),
  AppTitlePage: () => import('src/shared/components/AppTitlePage.vue'),
  AppInformationToggle: () => import('src/shared/components/AppInformationToggle.vue'),
  AppMenuHeader: () => import('src/shared/components/AppMenuHeader.vue'),
  AppInputMoney: () => import('src/shared/components/AppInputMoney.vue'),
  AppSidebarLeft: () => import('src/shared/components/AppSidebarLeft.vue'),
  AppMenuItem: () => import('src/shared/components/AppMenuItem.vue'),
  AppTable: () => import('src/shared/components/AppTable.vue'),
  AppCardTitle: () => import('src/shared/components/AppCardTitle.vue'),
  AppUserAvatar: () => import('src/shared/components/AppUserAvatar.vue'),
  AppFormProfile: () => import('src/shared/components/AppFormProfile.vue'),
  AppPagination: () => import('src/shared/components/AppPagination.vue'),
  AppBtnGoogle: () => import('src/shared/components/AppBtnGoogle.vue'),
  AppModal: () => import('src/shared/components/AppModal.vue'),
  AppFormFooter: () => import('src/shared/components/AppFormFooter.vue'),
  AppInput: () => import('src/shared/components/AppInput.vue'),
  AppSelect: () => import('src/shared/components/AppSelect.vue'),
  AppNoData: () => import('src/shared/components/AppNoData.vue'),
  AppBtnActions: () => import('src/shared/components/AppBtnActions.vue'),
  AppGoogleCalendar: () => import('src/shared/components/AppGoogleCalendar.vue'),
};

import { Money3Directive } from 'v-money3';

export default boot(async ({ app }) => {
  app.directive('money', Money3Directive);
  for (const [name, component] of Object.entries(components)) {
    app.component(name, (await component()).default);
  }
});
