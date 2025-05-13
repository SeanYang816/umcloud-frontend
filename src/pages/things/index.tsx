import { durationConvert, bytesToSize } from 'utils/old/utility'

import {
  OrderingInputType,
  PaginationInputType,
  SortOrder,
  Thing,
  useGetThingsLazyQuery,
  useUnregisterThingMutation,
} from 'generated/graphql'
import { useEffect, useMemo, useState } from 'react'

import { clearConfigProperty } from 'reducers/config'
import { clearFirewallProperty } from 'reducers/firewall'
import { clearAlgProperty } from 'reducers/alg'
import { clearRoutingProperty } from 'reducers/routing'
import { clearAdministratorProperty } from 'reducers/administrator'
import { clearStatusProperty } from 'reducers/status'
import { clearBasicConfigProperty } from 'reducers/basicConfig'
import { clearWirelessProperty } from 'reducers/wireless'
import { clearNetworkProperty } from 'reducers/network'

import { Box, Button, Card, CardContent, Stack, useTheme } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useNavigate } from 'react-router-dom'
import { genChannelId } from 'utils'
import { Dot } from 'components/Dot'
import { CardHeader } from 'components/extends/CardHeader'
import { toast } from 'react-toastify'
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { format } from 'date-fns'
import { isNil } from 'lodash'
import { useDispatch } from 'react-redux'
import { updateDevice } from 'reducers/device'

export default function Things() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wslogout = () => console.info(wslogout)
  const [filterString, setFilterString] = useState<string>('')
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
  const [pagination, setPagination] = useState<PaginationInputType>({
    pageIndex: 0,
    pageSize: 25,
  })

  const [unregisterThing] = useUnregisterThingMutation()

  const [getThings, { loading: isFetching, data: thingsData }] =
    useGetThingsLazyQuery({ fetchPolicy: 'cache-and-network' })
  const thingsList = thingsData?.things?.list || []
  const thingsCount = thingsData?.things?.total || 9999999

  const handleEditWsClick = async (row: Thing) => {
    const channel = genChannelId()
    const { mac, serialNumber } = row
    const payload = { mac, sn: serialNumber, channel, row }
    dispatch(updateDevice(payload))
    dispatch(clearConfigProperty())
    dispatch(clearFirewallProperty())
    dispatch(clearAlgProperty())
    dispatch(clearRoutingProperty())
    dispatch(clearAdministratorProperty())
    dispatch(clearStatusProperty())
    dispatch(clearBasicConfigProperty())
    dispatch(clearWirelessProperty())
    dispatch(clearNetworkProperty())
    navigate('/things/device')
  }

  const ordering: OrderingInputType | null = useMemo(() => {
    if (isNil(sorting?.[0])) return null
    const { id, desc } = sorting[0]
    const sortOrder = desc ? SortOrder.Desc : SortOrder.Asc

    return { sortOrder, id }
  }, [sorting])

  const columns: MRT_ColumnDef<Thing>[] = [
    {
      id: 'id',
      header: '#',
      enableHiding: false,
      accessorFn: (row) => row.id,
      size: 50,
    },
    {
      id: 'isOnline',
      header: 'Status',
      accessorFn: (row) => row.isOnline,
      Cell: ({ cell }) => {
        const value = cell.getValue()

        return <Dot variant={value ? 'success' : 'error'} />
      },
      size: 50,
    },
    {
      id: 'isAuthorized',
      header: 'Authorize Status',
      accessorFn: (row) => row.isAuthorized,
      Cell: ({ cell }) => {
        const value = cell.getValue()

        return value ? 'Authorized' : null
      },
      size: 50,
    },
    {
      id: 'authorizeExpireAt',
      header: 'Authorize End Time',
      accessorFn: (row) => row.authorizeExpireAt,
      Cell: ({ cell }) => {
        const value = cell.getValue()
        const isValid = typeof value === 'string'

        return isValid ? format(new Date(value), 'yyyy-MM-dd HH:mm:ss') : null
      },
    },
    {
      id: 'thingType',
      header: 'Type',
      accessorFn: (row) => row.thingType,
      size: 50,
    },
    {
      id: 'model',
      header: 'Model',
      accessorFn: (row) => row.model,
      size: 50,
    },
    {
      id: 'mac',
      header: 'MAC',
      accessorFn: (row) => row.mac,
      size: 50,
    },
    {
      id: 'serialNumber',
      header: 'SN',
      accessorFn: (row) => row.serialNumber,
      size: 50,
    },
    {
      id: 'alias',
      header: 'Alias',
      accessorFn: (row) => row.alias,
      size: 50,
    },
    {
      id: 'publicIp',
      header: 'Public IP',
      accessorFn: (row) => row.publicIp,
    },
    {
      id: 'localIp',
      header: 'Local IP',
      accessorFn: (row) => row.localIp,
    },
    {
      id: 'firmwareVersion',
      header: 'FW Version',
      accessorFn: (row) => row.firmwareVersion,
    },
    {
      id: 'upTime',
      header: 'Startup Time',
      accessorFn: (row) => row.upTime,
      Cell: ({ cell, row }) => {
        const { isOnline } = row.original
        const value = cell.getValue()
        const isValid = typeof value === 'number'

        return isOnline && isValid ? durationConvert(value) : null
      },
    },
    {
      id: 'txBytes',
      header: 'TxBytes',
      accessorFn: (row) => row.txBytes,
      Cell: ({ cell, row }) => {
        const { isOnline } = row.original
        const value = cell.getValue() as string

        return (
          <>
            {isOnline && (
              <Stack direction='row' alignItems='center'>
                <KeyboardDoubleArrowUpIcon color='error' />
                {bytesToSize(parseInt(value))}
              </Stack>
            )}
          </>
        )
      },
    },
    {
      id: 'rxBytes',
      header: 'RxBytes',
      accessorFn: (row) => row.rxBytes,
      Cell: ({ cell, row }) => {
        const { isOnline } = row.original
        const value = cell.getValue() as string

        return (
          <>
            {isOnline && (
              <Stack direction='row' alignItems='center'>
                <KeyboardDoubleArrowUpIcon color='success' />
                {bytesToSize(parseInt(value))}
              </Stack>
            )}
          </>
        )
      },
    },
    {
      id: 'lastContactDate',
      header: 'Last Seen',
      accessorFn: (row) => row.lastContactDate,
    },
    {
      id: 'cpuUsage',
      header: 'CPU Usage',
      accessorFn: (row) => row.cpuUsage,
      Cell: ({ cell, row }) => {
        const { isOnline } = row.original
        const value = cell.getValue()

        return isOnline && value ? `${value} %` : null
      },
    },
    {
      id: 'memoryUsage',
      header: 'Memory Usage',
      accessorFn: (row) => row.memoryUsage,
      Cell: ({ cell, row }) => {
        const { isOnline } = row.original
        const value = cell.getValue()

        return isOnline && value ? `${value} %` : null
      },
    },
    {
      id: 'actions',
      header: 'Action',
      enableHiding: false,
      Cell: ({ row }) => {
        const { id, isOnline } = row.original

        return (
          <Stack direction='row' spacing={1}>
            <Button
              disabled={!isOnline}
              variant='outlined'
              size='small'
              style={{ fontSize: '16px' }}
              onClick={() => handleEditWsClick(row.original)}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
              size='small'
              style={{ fontSize: '16px' }}
              onClick={async () => {
                try {
                  if (window.confirm('Conifrm  Unregister ?')) {
                    await unregisterThing({
                      variables: { id },
                      refetchQueries: ['getThings'],
                    })
                    toast.success('Successfully Deleted')
                  }
                } catch (error: unknown) {
                  toast.error('There is a problem with deletion! !')
                  throw new Error('There is a problem with deletion! !')
                }
              }}
            >
              Unregister
            </Button>
          </Stack>
        )
      },
      size: 50,
    },
  ]

  const table = useMaterialReactTable({
    data: thingsList,
    columns: columns,
    enableTopToolbar: true,
    enableGlobalFilter: true,
    enableDensityToggle: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableFullScreenToggle: false,
    state: {
      isLoading: isFetching,
    },
    muiSkeletonProps: {
      animation: 'wave',
    },
    muiLinearProgressProps: {
      color: 'secondary',
    },
    muiCircularProgressProps: {
      color: 'secondary',
    },

    renderTopToolbar: ({ table }) => (
      <Stack direction='row' justifyContent='space-between'>
        <MRT_GlobalFilterTextField
          margin='none'
          placeholder='Mac address'
          table={table}
        />
        <Box mt={1}>
          <MRT_ShowHideColumnsButton table={table} />
        </Box>
      </Stack>
    ),

    manualSorting: true,
    onSortingChange: setSorting,

    manualFiltering: true,
    onGlobalFilterChange: setFilterString,

    manualPagination: true,
    rowCount: thingsCount,
    pageCount: Math.ceil(thingsCount / pagination.pageSize),
    onPaginationChange: setPagination,

    initialState: {
      showGlobalFilter: true,
      density: 'compact',
      columnVisibility: {
        authorizeExpireAt: false,
        publicIp: false,
        localIp: false,
        upTime: false,
        uplink: false,
        downlink: false,
        txBytes: false,
        rxBytes: false,
        lastContactDate: false,
        cpuUsage: false,
        memoryUsage: false,
      },
    },

    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        border: `1px ${theme.palette.grey[300]} solid`,
        padding: `0 ${theme.spacing(2)}`,
      },
    },

    muiTableContainerProps: {
      sx: {
        boxShadow: 'none',
        marginTop: theme.spacing(2),
      },
    },
  })

  useEffect(() => {
    wslogout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const payload = { variables: { pagination, filterString, ordering } }

  useEffect(() => {
    getThings(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, filterString, ordering])

  return (
    <Card>
      <CardHeader title='Device list' />
      <CardContent>
        <MaterialReactTable table={table} />
      </CardContent>
    </Card>
  )
}
