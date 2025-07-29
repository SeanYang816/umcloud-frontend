import { format } from 'date-fns'
import { MRT_ColumnDef } from 'material-react-table'
import { DeviceLog } from 'generated/graphql'
import { StyledMaterialReactTable } from '../../components/StyledMaterialReactTable'

type LogDeviceType = {
  logs: DeviceLog[]
}

export const LogDevice = ({ logs }: LogDeviceType) => {
  const columns: MRT_ColumnDef<DeviceLog>[] = [
    {
      id: 'content',
      header: 'Content',
      accessorFn: (row) => row.content,
    },
    {
      id: 'eventType',
      header: 'EventType',
      accessorFn: (row) => row.eventType,
    },
    {
      id: 'createdAt',
      header: 'Create Time',
      accessorFn: (row) =>
        format(new Date(row.createdAt), 'yyyy-MM-dd HH:mm:ss'),
    },
  ]

  return (
    <>
      <StyledMaterialReactTable rows={logs} columns={columns} />
    </>
  )
}
