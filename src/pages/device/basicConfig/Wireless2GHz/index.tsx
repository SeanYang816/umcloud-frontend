import { useEffect } from 'react'
import { Card, CardContent, Stack } from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { MRT_ColumnDef } from 'material-react-table'
import { AssocMac, Lease } from '../BasicInformation/type'
import { durationConvert } from 'utils/old/utility'
import { Wireless2Chart } from './Wireless2Chart'
import { CardHeader } from 'components/extends/CardHeader'
import { ERROR_MAC, SERVER_ACTIONS } from 'constant'
import { isEmpty } from 'lodash'
import { PageHeader } from 'components/PageHeader'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'

export type ExtendedType = {
  mac: string
  ssid: string
}

export const Wireless2GHz = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const result = useSelector(
    (state: DefaultRootStateProps) => state.basicConfig.basicConfig.result,
  )
  const { dataRefresher } = useSelector(
    (state: DefaultRootStateProps) => state.config.refetchData,
  )

  const leases = result?.leases ?? []

  const networks = result?.wifinets?.[0].networks ?? []

  const activeNetworks = networks
    .filter((item) => !isEmpty(item.assoclist))
    .flatMap(({ ssid, assoclist }) =>
      Object.entries(assoclist).map(([key, value]) => ({
        mac: key.toUpperCase(),
        ssid,
        ...value,
      })),
    )
    .filter((item) => item.mac !== ERROR_MAC)

  const activeClients = leases.reduce(
    (prev: Array<Lease & AssocMac & ExtendedType>, current: Lease) => {
      const mac = current.macaddr.toUpperCase()
      const findMac = activeNetworks.find((item) => item.mac === mac)

      if (findMac) {
        const mergedObject = {
          ...current,
          ...findMac,
        }

        return [...prev, mergedObject]
      }

      return prev
    },
    [],
  )

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.OVERVIEW_GET_STATUS_OVERVIEW_PAGE)
  }, [sendWsGetMessage, dataRefresher])

  const columns: MRT_ColumnDef<Lease & AssocMac & ExtendedType>[] = [
    {
      id: 'name',
      header: 'Device Name',
      accessorFn: (row) => row.hostname || row.mac,
      size: 50,
    },
    {
      id: 'mac',
      header: 'MAC Address',
      accessorFn: (row) => row.mac,
      size: 50,
    },
    {
      id: 'ssid',
      header: 'SSID',
      accessorFn: (row) => row.ssid,
      size: 50,
    },
    {
      id: 'model',
      header: 'Signal',
      accessorFn: (row) => `${row.signal} dBm`,
      size: 50,
    },
    {
      id: 'rx_rate',
      header: 'RX Rate',
      accessorFn: (row) => `${row.rx_rate / 1000} Mbit/s`,
      size: 50,
    },
    {
      id: 'tx_rate',
      header: 'TX Rate',
      accessorFn: (row) => `${row.tx_rate / 1000} Mbit/s`,
      size: 50,
    },
    {
      id: 'inactive',
      header: 'idle',
      accessorFn: (row) => durationConvert(row.inactive / 1000),
      size: 50,
    },
  ]

  return (
    <>
      <PageHeader
        title='Wireless 2.4GHz'
        subtitle='This section displays the device and client information.'
      />
      <Stack gap={2}>
        <Card>
          <CardHeader title='Current Usage' />
          <CardContent>
            <Wireless2Chart list={activeClients} />
          </CardContent>
        </Card>

        <StyledMuiReactTable
          title='Client List'
          rows={activeClients}
          columns={columns}
        />
      </Stack>
    </>
  )
}
