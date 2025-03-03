import * as crypto from 'crypto-js';

export const useCripto = () => {
  const encrypt = (payload: any) => {
    const data = JSON.stringify(payload);
    const hash = process.env.HASH_STORAGE;
    return crypto.AES.encrypt(data, hash).toString();
  };

  const decrypt = (payload: string | null) => {
    if (payload) {
      const hash = process.env.HASH_STORAGE;
      const code = crypto.enc.Utf8;
      const data = crypto.AES.decrypt(payload, hash).toString(code);
      return JSON.parse(data);
    }
    return null;
  };

  return { encrypt, decrypt };
};
