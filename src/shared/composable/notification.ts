import { Notify } from 'quasar';

export const useNotification = () => {
  const confirm = (callback: VoidFunction, config: any = {}) => {
    Notify.create({
      message: config?.message || 'Você tem certeza?',
      caption: config?.caption || 'Você realmente deseja realizar essa ação?',
      color: config?.color || 'white',
      position: 'center',
      timeout:0,
      classes: 'text-grey-8 q-pa-md notification-confirm',
      multiLine: true,
      icon: config?.icon || 'mdi-help-circle-outline',
      actions: config?.actions || [
        {
          label: 'Cancelar',
          noCaps: true,
          color: 'grey-13 glossy q-mt-sm',
          flat: false,
          size: 'sm',
          unelevated: true,
          handler: () => {},
        },
        {
          label: 'Sim',
          noCaps: true,
          color: 'primary',
          flat: false,
          size: 'sm',
          class: 'tw-ml-2 glossy q-mt-sm',
          unelevated: true,
          handler: callback,
        },
      ],
    });
  };

  const success = (config:any = {}) => {
    Notify.create({
      message: config?.message || 'Realizado com successo!',
      position: 'top-right',
      icon: 'mdi-check-circle',
      color: 'green-5',
      timeout: 3500,
      progress: true
    })
  }

  const error = (config:any = {}) => {
    Notify.create({
      message: config?.message || 'Oops, ocorreu um erro!',
      position: 'top-right',
      icon: 'mdi-information',
      color: 'red-5',
      timeout: 3500,
      progress: true
    })
  }

  return {
    confirm,
    success,
    error
  };
};
