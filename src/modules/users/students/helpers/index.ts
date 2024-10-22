import {iFormStudent} from 'src/modules/users/students/model/student.model';

export const setFormStudent = (data: iFormStudent = {} as iFormStudent) => {
  return {
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || '',
    date_of_birth: data?.date_of_birth || '',
    age: data?.age || '',
    weight: data?.weight || null,
    height: data?.height || null,
    id: data?.id || null,
    access: data?.access || 0
  }
}

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
    name: 'phone',
    label: 'Telefone',
    field: 'phone',
    align: 'left',
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
