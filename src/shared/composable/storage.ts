import { useStorage } from '@vueuse/core';
import { decrypt, encrypt } from '../utils';

export const useCacheStorage = () => {
  const setItemStorage = (key: string, value: any) => {
    useStorage(key, encrypt(value), localStorage, { mergeDefaults: true });
  };

  const getItemStorage = (key: string) => {
    const storage:string = useStorage(key,undefined,localStorage)?.value ?? ''
    return storage ? decrypt(storage) : null;
  };

  return {
    setItemStorage,
    getItemStorage,
  };
};
