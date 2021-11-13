import { ColumnDef } from '../../../shared/components/table/table.component';

export const defaultColumns: ColumnDef[] = [
  {name: 'defaultId', label: 'stms.patients.table.identifier'},
  {
    name: 'fullName',
    label: 'Full Name',
  },
  {
    name: 'sex',
    label: 'Sex',
    dataAccessor: <T extends { name: string }>(sex) => sex.name
  },
  {
    name: 'birthDate',
    label: 'Birth Date',
    dataAccessor: <T extends { formattedDate: string }>(obj) => obj.formattedDate
  }
]
