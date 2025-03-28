import { IFormStudent } from 'src/modules/personal/students/model/student.model';
import { moneyFormatBr } from 'src/shared/utils';
import { IFormEvaluation } from '../model/evaluation.model';

export const setFormStudent = (data: IFormStudent = {} as IFormStudent) => {
  return {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    date_of_birth: data?.date_of_birth || '',
    weight: data?.weight || '',
    price: data?.price || '0',
    height: data?.height || '',
    id: data?.id || null,
    access: data?.access || 0,
  };
};

export const formEvaluation = (
  data: IFormEvaluation = {} as IFormEvaluation
) => {
  return {
    id: data?.id || null,
    weight: data?.weight || null,
    height: data?.height || null,
    percent_weight: data?.percent_weight || null,
    arm: data?.arm || null,
    waist: data?.waist || null,
    breastplate: data?.breastplate || null,
    leg: data?.leg || null,
    observation: data?.observation || null,
  };
};

export const studentColumns = [
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    sortable: true,
    align: 'left',
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    sortable: true,
    align: 'left',
  },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
    align: 'center',
    format: (val) => moneyFormatBr(val),
    sortable: true,
  },
  {
    name: 'phone',
    label: 'Telefone',
    field: 'phone',
    align: 'left',
    sortable: true,
  },
  {
    name: 'access',
    label: 'Aréa do aluno',
    field: 'access',
    align: 'center',
    sortable: true,
  },
  {
    name: 'situation',
    label: 'Avaliação',
    field: 'active',
    align: 'center',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    sortable: true,
    align: 'center',
  },
];
