import { ColumnDef } from '../../../shared/components/table/table.component';
import { Patient } from '../../../shared/models/patient.model';

export const defaultColumns: ColumnDef[] = [
  {name: 'identifier', label: 'stms.orders.table.identifier'},
  {name: 'orderName', label: 'Order Name'},
  {
    name: 'status',
    label: 'Status',
    dataAccessor: <T extends { name: string; identifier: string }>(status) => status.name
  },
  {
    name: 'patient',
    label: 'Patient',
    dataAccessor: <T extends Patient>(patient) => patient.fullName
  },
  {
    name: 'physician',
    label: 'Physician',
    dataAccessor: <T extends { name: string }>(physician) => physician.name
  },
]
