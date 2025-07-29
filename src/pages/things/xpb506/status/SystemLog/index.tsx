import { Card, CardContent } from '@mui/material'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'

type newLogsType = {
  no: string
  time: string
  level: string
  source: string
  message: string
}

function read_log_data(data: string) {
  const logs: string[] = data.trim().split(/\n/)
  const logsData: string[][] = [[]]
  const newLogs: newLogsType[] = []
  for (let i = 0; i < logs.length; i++) {
    let time, level, source, message
    logsData[i] = logs[i].split(' ')
    if (logsData[i][2] == '') {
      // Day 1~9 have two spaces (ex: Thu Jan  1 00:00:00 1970)
      time = logsData[i].slice(0, 6).join(' ')
      level = logsData[i][6]
      source = logsData[i][7].replace(/:$/, '')
      message = logsData[i].slice(8, logsData[i].length).join(' ')
    } else {
      time = logsData[i].slice(0, 5).join(' ')
      level = logsData[i][5]
      source = logsData[i][6].replace(/:$/, '')
      message = logsData[i].slice(7, logsData[i].length).join(' ')
    }
    newLogs[i] = {
      no: `${i}`,
      time: time,
      level: level,
      source: source,
      message: message,
    }
  }

  return newLogs
}
export const SystemLog = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const { result } = useSelector(
    (state: DefaultRootStateProps) => state.status.systemLog,
  )

  const dataList = useMemo(() => {
    return result.data ? read_log_data(result.data) : []
  }, [result])

  const columns: MRT_ColumnDef<newLogsType>[] = [
    {
      header: 'Time',
      accessorFn: ({ time }) => time,
    },
    {
      header: 'Level',
      accessorFn: ({ level }) => level,
    },
    {
      header: 'Source',
      accessorFn: ({ source }) => source,
    },
    {
      header: 'Message',
      accessorFn: ({ message }) => (
        <div style={{ whiteSpace: 'normal' }}>{message}</div>
      ),
    },
  ]

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.SYSTEM_LOG_GET_SYSTEM_LOG)
  }, [sendWsGetMessage])

  return (
    <Card>
      <CardContent>
        <MaterialReactTable
          data={dataList}
          columns={columns}
          enableTopToolbar={false}
          enableColumnActions={false}
          enableSorting={false}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              border: '1px #f5f5f5 solid',
            },
          }}
          muiTableBodyRowProps={{
            sx: {
              ':nth-of-type(even)': {
                backgroundColor: '#f5f5f5',
              },
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              width: '25%',
            },
          }}
          initialState={{
            density: 'compact',
            showColumnFilters: true,
            pagination: { pageIndex: 0, pageSize: 100 },
          }}
        />
      </CardContent>
    </Card>
  )
}
