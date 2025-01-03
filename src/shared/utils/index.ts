import moment from 'moment';
import { iPagination } from '../model/paginate.type';
import * as crypto from 'crypto-js';

export const configPagination = (paginate = {} as any): iPagination => {
  return {
    sortBy: paginate?.sortBy || '',
    descending: paginate?.descending || false,
    page: paginate?.current_page || 1,
    rowsPerPage: paginate?.per_page || 15,
    total_data: paginate?.total,
    total: paginate?.last_page || 1,
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

export const formRules = (otherRules: any = []) => {
  return [(value: any) => !!value || 'campo obrigatório!', ...otherRules];
};

export const rulesDate = (otherRules: any = []) => {
  return formRules([
    (val: any) => moment(val, 'DD/MM/YYYY').isValid() || 'Data inválida!',
    ...otherRules
  ]);
};

export const rulesEmail = (otherRules: any = []) => {
  return formRules([
    (val: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) || 'E-mail inválido!';
    },
    ...otherRules
  ]);
};

export const parseLocalValue = (value: string) => {
  if (typeof value !== 'string') return '';
  value = value.trim();
  const converted = value
    .replace(/\./g, '')
    .replace(/,/, '.')
    .replace('R$', '');
  const result = parseFloat(converted).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return result;
};

export const moneyFormatBr = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(value);
};

export const encrypt = (payload: any) => {
  const data = JSON.stringify(payload);
  const hash = process.env.HASH_STORAGE;
  return crypto.AES.encrypt(data, hash).toString();
};

export const decrypt = (payload: string | null) => {
  if (payload) {
    const hash = process.env.HASH_STORAGE;
    const code = crypto.enc.Utf8;
    const data = crypto.AES.decrypt(payload, hash).toString(code);
    return JSON.parse(data);
  }
  return null;
};
