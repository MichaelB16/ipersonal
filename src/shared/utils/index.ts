import { IPagination } from '../model/paginate.type';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const configPagination = (paginate = {} as any): IPagination => {
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

export const fileDownload = (url: any, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const isGrid = (grid: boolean) => {
  return {
    text: `Modo de visualização ${grid ? 'grid' : 'linha'}`,
    icon: grid ? 'mdi-view-grid' : 'mdi-view-list',
  };
};

export const formRules = (otherRules: any = []) => {
  return [(value: any) => !!value || 'campo obrigatório!', ...otherRules];
};

export const rulesDate = (otherRules: any = []) => {
  return formRules([
    (val: any) => {
      const checkdate = dayjs(val, 'DD/MM/YYYY', true).isValid();
      return checkdate || 'Data inválida!';
    },
    ...otherRules,
  ]);
};

export const rulesEmail = (otherRules: any = []) => {
  return formRules([
    (val: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) || 'E-mail inválido!';
    },
    ...otherRules,
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
