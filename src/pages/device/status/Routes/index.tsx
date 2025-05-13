import { useEffect } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { PageHeader } from 'components/PageHeader'
import { Box, Tooltip } from '@mui/material'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { MRT_ColumnDef } from 'material-react-table'
import {
  AprTable,
  Routes_v4Table,
  Routes_v6Table,
  Neighbours_v6Table,
} from 'types/reducers'
import { useStyles } from 'components/fields'

export const Routes = () => {
  const classes = useStyles()
  const { sendWsGetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: DefaultRootStateProps) => state.status.routes,
  )
  const result = data?.result ?? {}

  const arpData = result.arp
  const arpColumns: MRT_ColumnDef<AprTable>[] = [
    {
      accessorFn: (row) => row.network,
      header: 'Network',
      size: 150,
    },
    {
      accessorFn: (row) => row.address,
      header: 'IPv4-Address',
      size: 150,
      Header: () => (
        <Box>
          <Tooltip title='Internet Protocol Version 4'>
            <Box component='span' className={classes.tooltipStyle}>
              IPv4
            </Box>
          </Tooltip>
          -Address
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.mac,
      header: 'MAC-Address',
      size: 150,
      Header: () => (
        <Box>
          <Tooltip title='Media Access Control'>
            <Box component='span' className={classes.tooltipStyle}>
              MAC
            </Box>
          </Tooltip>
          -Address
        </Box>
      ),
    },
  ]

  const routesV4Data = result.routes_v4
  const v4columns: MRT_ColumnDef<Routes_v4Table>[] = [
    {
      accessorFn: (row) => row.network,
      header: 'Network',
      size: 150,
    },
    {
      accessorFn: (row) => row.target,
      header: 'Target',
      size: 150,
    },
    {
      accessorFn: (row) => row.gateway,
      header: 'IPv4-Gateway',
      size: 150,
      Header: () => (
        <Box>
          <Tooltip title='Internet Protocol Version 4'>
            <Box component='span' className={classes.tooltipStyle}>
              IPv4
            </Box>
          </Tooltip>
          -Gateway
        </Box>
      ),
    },
    {
      accessorFn: (row) => row.metric,
      header: 'Metric',
      size: 150,
    },
    {
      accessorFn: (row) => row.table,
      header: 'Table',
      size: 150,
    },
  ]

  const routesV6Data = result.routes_v6
  const v6columns: MRT_ColumnDef<Routes_v6Table>[] = [
    {
      accessorFn: (row) => row.network,
      header: 'Network',
      size: 150,
    },
    {
      accessorFn: (row) => row.target,
      header: 'Target',
      size: 150,
    },
    {
      accessorFn: (row) => row.source,
      header: 'Source',
      size: 150,
    },
    {
      accessorFn: (row) => row.metric,
      header: 'Metric',
      size: 150,
    },
    {
      accessorFn: (row) => row.table,
      header: 'Table',
      size: 150,
    },
  ]

  const v6NeighboursData = result.neighbours_v6
  const v6NeighboursColumns: MRT_ColumnDef<Neighbours_v6Table>[] = [
    {
      accessorFn: (row) => row.network,
      header: 'Network',
      size: 150,
    },
    {
      accessorFn: (row) => row.address,
      header: 'IPv6-Address',
      size: 150,
    },
    {
      accessorFn: (row) => row.mac,
      header: 'MAC-Address',
      size: 150,
    },
  ]

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.ROUTES_GET_ROUTE_ARP_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Routes'
        subtitle='The following rules are currently active on this system.'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <StyledMuiReactTable title='ARP' rows={arpData} columns={arpColumns} />
        <StyledMuiReactTable
          title='Active IPv4-Routes'
          rows={routesV4Data}
          columns={v4columns}
        />
        <StyledMuiReactTable
          title='Active IPv6-Routes'
          rows={routesV6Data}
          columns={v6columns}
        />
        <StyledMuiReactTable
          title='IPv6 Neighbours'
          rows={v6NeighboursData}
          columns={v6NeighboursColumns}
        />
      </Box>
    </>
  )
}
