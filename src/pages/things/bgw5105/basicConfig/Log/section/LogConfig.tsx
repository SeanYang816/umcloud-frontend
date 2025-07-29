import { ConfigLog } from 'generated/graphql'
import { MRT_ColumnDef } from 'material-react-table'
import { StyledMaterialReactTable } from '../../components/StyledMaterialReactTable'

type LogConfigProps = {
  logs: ConfigLog[]
}

export const LogConfig = ({ logs }: LogConfigProps) => {
  const columns: MRT_ColumnDef<ConfigLog>[] = [
    {
      id: 'item',
      header: 'Item',
      accessorFn: (row) => row.item,
    },
    {
      id: 'operator',
      header: 'Operator',
      accessorFn: (row) => row.operator,
    },
    {
      id: 'status',
      header: 'Status',
      accessorFn: (row) => row.status,
    },
    {
      id: 'createdAt',
      header: 'Delivery Time',
      accessorFn: (row) => row.createdAt,
    },
  ]

  return <StyledMaterialReactTable rows={logs} columns={columns} />
}
