import { useMemo } from 'react'
import { GetWireless2PrimaryStatus } from '../type'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'

type WmmParamsProps = {
  statusData: GetWireless2PrimaryStatus
}

export const WmmParams = ({ statusData }: WmmParamsProps) => {
  const statusResult = statusData?.result

  const createData = (
    name: string,
    dataCmin: string,
    dataCmax: string,
    dataAifsn: string,
    dataTxop: string,
  ) => ({ name, dataCmin, dataCmax, dataAifsn, dataTxop })

  const tableList = useMemo(
    () =>
      statusResult
        ? [
            createData(
              'AC_BE',
              statusResult.wmm.CWmin['AC_BE'],
              statusResult.wmm.CWmax['AC_BE'],
              statusResult.wmm.aifs['AC_BE'],
              statusResult.wmm.txoplimit['AC_BE'],
            ),
            createData(
              'AC_BK',
              statusResult.wmm.CWmin['AC_BK'],
              statusResult.wmm.CWmax['AC_BK'],
              statusResult.wmm.aifs['AC_BK'],
              statusResult.wmm.txoplimit['AC_BK'],
            ),
            createData(
              'AC_VI',
              statusResult.wmm.CWmin['AC_VI'],
              statusResult.wmm.CWmax['AC_VI'],
              statusResult.wmm.aifs['AC_VI'],
              statusResult.wmm.txoplimit['AC_VI'],
            ),
            createData(
              'AC_VO',
              statusResult.wmm.CWmin['AC_VO'],
              statusResult.wmm.CWmax['AC_VO'],
              statusResult.wmm.aifs['AC_VO'],
              statusResult.wmm.txoplimit['AC_VO'],
            ),
          ]
        : [],
    [statusResult],
  )

  return (
    <Card>
      <CardHeader title='WMM Params' />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>AC</TableCell>
              <TableCell align='center'>CWmin</TableCell>
              <TableCell align='center'>CWmax</TableCell>
              <TableCell align='center'>AIFSN</TableCell>
              <TableCell align='center'>TXOP Limit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableList.map((item) => (
              <TableRow key={item.name}>
                <TableCell align='center'>{item.name}</TableCell>
                <TableCell align='center'>{item.dataCmin}</TableCell>
                <TableCell align='center'>{item.dataCmax}</TableCell>
                <TableCell align='center'>{item.dataAifsn}</TableCell>
                <TableCell align='center'>{item.dataTxop}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
