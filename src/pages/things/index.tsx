import { durationConvert, bytesToSize } from 'utils/old/utility'

import {
  OrderingInputType,
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

import { Button, Stack, Typography } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { useNavigate } from 'react-router-dom'
import { genChannelId } from 'utils'
import { Dot } from 'components/Dot'
import { toast } from 'react-toastify'
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { format } from 'date-fns'
import { isNil } from 'lodash'
import { useDispatch } from 'react-redux'
import { updateDevice } from 'reducers/device'
import { useTableState } from 'hooks/useTableState'
import { modelType } from 'constant/things'

const fakeList = {
  id: 'thing-001',
  mac: 'AA:BB:CC:DD:EE:FF',
  alias: 'FakeRouter',
  model: 'xpb-506',
  isAuthorized: true,
  isArchived: false,
  isOnline: true,
  authorizeExpireAt: '2025-12-31T23:59:59Z',
  archivedAt: null,
  archiveReason: null,
  archiveTitle: null,
  thingType: `${modelType.xpb506}`,
  publicIp: '203.0.113.42',
  localIp: '192.168.1.1',
  serialNumber: 'SN123456789',
  firmwareVersion: 'v1.2.3',
  firmwareUpgradeDate: '2025-06-01T12:00:00Z',
  lastContactDate: '2025-07-18T09:00:00Z',
  channel2ghz: 6,
  channel5ghz1: 36,
  channel5ghz2: null,
  txBytes: 123456789,
  rxBytes: 987654321,
  cpuUsage: 28,
  memoryUsage: 62,
  tenantId: 101,
  ownerId: 2001,
  upTime: 123456,
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-07-18T08:59:00Z',
}

export default function Things() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wslogout = () => console.info(wslogout)
  const [filterString] = useState<string>('')

  const [unregisterThing] = useUnregisterThingMutation()

  const [getThings, { loading: isFetching, data: thingsData }] =
    useGetThingsLazyQuery({ fetchPolicy: 'cache-and-network' })
  const thingsList = thingsData?.things?.list || []

  const {
    sorting,
    setSorting,
    setGlobalFilter,
    setColumnFilters,
    pagination,
    Pagination,
  } = useTableState({
    pageSize: 25,
    pageIndex: 0,
    total: thingsData?.things?.total || 0,
    rowsLength: thingsData?.things?.list.length || 0,
  })

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
    if (row.thingType === 'Router') {
      navigate(`/things/${modelType.bgw5105}`)
    }
    if (row.thingType === `${modelType.xpb506}`) {
      navigate(`/things/${modelType.bgw5105}`)
    }
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
              onClick={() => handleEditWsClick(row.original)}
            >
              Edit
            </Button>
            <Button
              variant='outlined'
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
    data: [...thingsList, fakeList],
    columns: columns,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableSorting: true,
    enableStickyHeader: true,

    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

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
    muiTableHeadCellProps: {
      sx: {
        py: 2,
        color: '#D1F1FF',
        backgroundColor: '#0095AE',
      },
    },

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
    <Stack>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={1}
        ml={1}
      >
        <Typography variant='h4' color='#01334D' fontWeight='bold'>
          Device List
        </Typography>
        <Stack direction='row'>
          <Stack direction='row'>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleGlobalFilterButton table={table} />
          </Stack>
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
        </Stack>
      </Stack>

      <MaterialReactTable table={table} />
      <Pagination />
    </Stack>
  )
}
