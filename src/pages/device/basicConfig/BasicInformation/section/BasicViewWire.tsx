import { Box, Card, CardContent, Grid, useTheme } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import React from 'react'
import { Networks, OverviewResult } from '../type'
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { isEmpty } from 'lodash'
import { Loading } from 'components/Loading'
import { get_wifi_encryption } from 'utils/getWifiEncryption'

const getChannelLabel = (channel: string) => {
  // Where does the convertion case come from ???
  switch (channel) {
    case 'auto':
      return 'Auto'
    // case '1':
    //   return '1 (2412 MHz)'
    // case '2':
    //   return '2 (2417 MHz)'
    // case '3':
    //   return '3 (2422 MHz)'
    // case '4':
    //   return '4 (2427 MHz)'
    // case '5':
    //   return '5 (2432 MHz)'
    // case '6':
    //   return '6 (2437 MHz)'
    // case '7':
    //   return '7 (2442 MHz)'
    // case '8':
    //   return '8 (2447 MHz)'
    // case '9':
    //   return '9 (2452 MHz)'
    // case '10':
    //   return '10 (2457 MHz)'
    // case '11':
    //   return '11 (2462 MHz)'
    default:
      return channel
  }
}

type BasicViewWireProps = {
  hwMode: string
  title: string
  result: OverviewResult
  wifinet: number
}
export const BasicViewWire = ({
  hwMode,
  title,
  result,
  wifinet,
}: BasicViewWireProps) => {
  const theme = useTheme()
  const isUp = isEmpty(result) ?? result?.wifinets[wifinet].up
  const networks = result?.wifinets?.[wifinet].networks ?? []
  const activeWireList =
    networks.filter((item) => Object.keys(item.assoclist).length) ?? []
  const activeWireInfo = activeWireList[0] ?? {}
  const selectedChannel = activeWireInfo.channel?.toString()
  const list = [
    { label: 'Operation Mode', value: activeWireInfo.mode },
    { label: 'Wireless Mode', value: hwMode },
    {
      label: 'Channel',
      value: `${getChannelLabel(selectedChannel)} (${activeWireInfo.frequency} GHz)`,
    },
    { label: 'Bitrate', value: `${activeWireInfo.bitrate} Mbit/s` },
  ]

  const columns: MRT_ColumnDef<Networks>[] = [
    {
      id: 'ssid',
      header: 'SSID',
      accessorFn: (row) => row.ssid,
      size: 50,
    },
    {
      id: 'bssid',
      header: 'BSSID',
      accessorFn: (row) => row.bssid,
      size: 50,
    },
    {
      id: 'encryption',
      header: 'Encryption',
      accessorFn: (row) =>
        get_wifi_encryption(row.encryption, row.wpa_key_mgmt),
      size: 50,
    },
  ]
  const table = useMaterialReactTable({
    data: activeWireList,
    columns,

    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    enablePagination: false,

    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        border: `1px ${theme.palette.grey[300]} solid`,
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: 'none',
      },
    },
  })

  return (
    <Card>
      <CardHeader title={title} />

      <CardContent>
        {isUp ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Grid container spacing={2}>
              {list.map((row) => (
                <React.Fragment key={row.label}>
                  <Grid size={{ xs: 6 }}>{row.label}</Grid>
                  <Grid size={{ xs: 6 }}>{row.value}</Grid>
                </React.Fragment>
              ))}
            </Grid>

            <Box mt={4} mb={1}>
              Primary SSID
            </Box>

            <MaterialReactTable table={table} />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
}
