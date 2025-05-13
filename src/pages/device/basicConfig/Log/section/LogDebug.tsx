import { format } from 'date-fns'
import { MRT_ColumnDef } from 'material-react-table'
import { DebugLog } from 'generated/graphql'
import { StyledMaterialReactTable } from '../../components/StyledMaterialReactTable'

type LogDebugProps = {
  logs: DebugLog[]
}

export const LogDebug = ({ logs }: LogDebugProps) => {
  const columns: MRT_ColumnDef<DebugLog>[] = [
    {
      id: 'content',
      header: 'Content',
      accessorFn: (row) => row.content,
    },
    {
      id: 'customContent',
      header: 'Custom log content',
      accessorFn: (row) => row.customContent,
    },
    {
      id: 'createdAt',
      header: 'Create Time',
      accessorFn: (row) =>
        format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    },
  ]

  return <StyledMaterialReactTable rows={logs} columns={columns} />
}
