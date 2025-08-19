import { useEffect, useMemo } from 'react'
import { PageHeader } from 'components/PageHeader'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { CardHeader } from 'components/extends/CardHeader'

export const Cellular = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const { result } = useSelector(
    (state: RootStateProps) => state.bgw5105.status.cellular,
  )

  const someArr = useMemo(
    () => [
      { label: 'Connection Status', value: result.status },
      { label: 'Connection Type', value: result.type },
      { label: 'Network', value: result.net },
      { label: 'IPv4 Address', value: 'N/A' }, // result.wwan.ipaddr // DOC: no data from backend, add initial value
      { label: 'Current Radio Band', value: result.band },
      { label: 'RSRP', value: result.rsrp },
      { label: 'RSRQ', value: result.rsrq },
      { label: 'RSSI', value: result.rssi },
      { label: 'IMEI', value: result.imei },
      { label: 'IMSI', value: result.imsi },
    ],
    [result],
  )

  useEffect(() => {
    sendWsGetMessage(BGW_EVENT_ACTIONS.CELLULAR_GET_CELLULAR_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader title='Cellular Status' />

      <Card>
        <CardHeader noLine title='Status' />
        <CardContent>
          <Table>
            <TableBody sx={{ border: '1px #eeeeee solid' }}>
              {someArr.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: '#F9F9F9',
                    },
                  }}
                >
                  <TableCell sx={{ width: '200px' }}>{row.label}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
