import { iPagination } from '../model/paginate.type';
import * as crypto from 'crypto-js';

export const configPagination = (paginate = {} as any): iPagination => {
  return {
    sortBy: paginate?.sortBy || '',
    descending: paginate?.descending || false,
    page: paginate?.current_page || 1,
    rowsPerPage: paginate?.per_page || 15,
    total: paginate?.last_page,
  };
};

export const configModalTitle = (
  id: boolean,
  title: { add: string; edit: string }
) => {
  const icon = id ? 'mdi-lead-pencil' : 'mdi-plus-circle';
  const text = id ? title.edit : title.add;
  return {
    text,
    icon,
  };
};

export const formRules = (otherRules = []) => {
  return [(value: any) => !!value || 'campo obrigatório!', ...otherRules];
};

export const parseLocalValue = (value: string) => {
  if (typeof value !== 'string') return '';
  value = value.trim();
  const converted = value.replace(/\./g, '').replace(/,/, '.').replace('R$','');
  const result = parseFloat(converted).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return result
};

export const encrypt = (payload: any) => {
  return crypto.AES.encrypt(
    JSON.stringify(payload),
    process.env.HASH_STORAGE
  ).toString();
};

export const decrypt = (payload: string | null) => {
  if (payload) {
    const data = crypto.AES.decrypt(payload, process.env.HASH_STORAGE).toString(
      crypto.enc.Utf8
    );
    return JSON.parse(data);
  }
  return null;
};
