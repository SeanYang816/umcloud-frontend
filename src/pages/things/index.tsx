import { durationConvert, bytesToSize } from 'utils/old/utility'

import {
  OrderingInputType,
  SortOrder,
  Thing,
  useGetThingsLazyQuery,
  useUnregisterThingMutation,
} from 'generated/graphql'
import { useEffect, useMemo, useState } from 'react'

import { clearConfigProperty } from 'reducers/bgw5105/config'
import { clearFirewallProperty } from 'reducers/bgw5105/firewall'
import { clearAlgProperty } from 'reducers/bgw5105/alg'
import { clearRoutingProperty } from 'reducers/bgw5105/routing'
import { clearAdministratorProperty } from 'reducers/bgw5105/administrator'
import { clearStatusProperty } from 'reducers/bgw5105/status'
import { clearBasicConfigProperty } from 'reducers/bgw5105/basicConfig'
import { clearWirelessProperty } from 'reducers/bgw5105/wireless'
import { clearNetworkProperty } from 'reducers/bgw5105/network'

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
import { useTableState } from 'hooks/useTableState'
import { boardType } from 'constant/things'
import { updateDevice } from 'reducers/device'
import { updateDevice as updateDevice_bgw } from 'reducers/bgw5105/device'

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
    dispatch(updateDevice(row))
    dispatch(updateDevice_bgw({ channel, sn: row.serialNumber, ...row }))
    dispatch(clearConfigProperty())
    dispatch(clearFirewallProperty())
    dispatch(clearAlgProperty())
    dispatch(clearRoutingProperty())
    dispatch(clearAdministratorProperty())
    dispatch(clearStatusProperty())
    dispatch(clearBasicConfigProperty())
    dispatch(clearWirelessProperty())
    dispatch(clearNetworkProperty())
    if (row.board !== `${boardType.xpb506}`) {
      navigate(`/things/${boardType.bgw5105}`)
    }
    if (row.board === `${boardType.xpb506}`) {
      navigate(`/things/${boardType.xpb506}`)
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
      id: 'board',
      header: 'Board',
      accessorFn: (row) => row.board ?? 'Other',
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
                  console.info(error)
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
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
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
