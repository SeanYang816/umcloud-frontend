import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, StringStringType } from 'types'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { clearProperty } from 'reducers/firewall'
import { Form } from './Form'
import { EditDialog } from './EditDialog'
import { PageHeader } from 'components/PageHeader'
import { Box, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { toggleStrNum } from 'utils'
import { EditDeleteButtons } from 'components/EditDeleteButtons'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'

export const OneToOneNat = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: DefaultRootStateProps) => state.firewall.oneToOneNat,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}

  const [list, setList] = useApiResultObjectToArrayByCommonId(
    result,
    'staticnat',
  )
  const [isFetch, setIsFetch] = useState(false)
  const [editKey, setEditKey] = useState('')

  const handleDialogOpen = (key: string) => {
    setEditKey(key)
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
    dispatch(clearProperty('oneToOneNatEdit'))
  }

  const handleEnabledChange = (key: string) => {
    setList(
      list.map((item) =>
        item.key === key
          ? { ...item, enabled: toggleStrNum(item.enabled) }
          : item,
      ),
    )
  }

  const handleRowMove = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return

    const newList = [...list]
    const movedItem = newList[fromIndex]

    newList.splice(fromIndex, 1)
    newList.splice(toIndex, 0, movedItem)

    setList(newList)
  }

  const handleDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.FIREWALL_DELETE_ONE_TO_ONE_NAT, {
      'cbi.submit': '1',
      [`cbi.rts.firewall.${key}`]: 'Delete',
    })
  }

  const handleApply = () => {
    const keysArray = list.map((item: StringStringType) => item.key)
    const concatenatedKeys = keysArray.join(' ')
    const enabledProps: StringStringType = {}
    list.forEach((item: StringStringType) => {
      enabledProps[`cbid.firewall.${item.key}.enabled`] = item.enabled
    })
    sendWsSetMessage(SERVER_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_PAGE, {
      'cbi.sts.firewall.staticnat': concatenatedKeys,
      ...enabledProps,
    })
  }

  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Name',
      accessorFn: (row) => row.name,
      size: 150,
    },
    {
      header: 'Private IP',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.dest_ip }} />
      ),
      size: 150,
    },
    {
      header: 'Public IP',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.src_ip }} />
      ),
      size: 150,
    },
    {
      header: 'Interface',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.iface }} />
      ),
      size: 150,
    },
    {
      header: 'Forwarding Mode',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.fwdmode }} />
      ),
      size: 150,
    },
    {
      header: 'Schedule',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.time_schedule }} />
      ),
      size: 150,
    },
    {
      accessorFn: (row) => row.enabled,
      header: 'Enable',
      size: 150,
      Cell: ({ renderedCellValue, row }) => (
        <Checkbox
          checked={renderedCellValue === '1'}
          onClick={() => handleEnabledChange(row.original.key)}
          size='small'
        />
      ),
    },
    {
      accessorKey: 'Sort',
      header: 'Sort',
      size: 150,
      Cell: ({ row }) => {
        const index = row.index

        return (
          <>
            <Box>
              <IconButton
                disabled={index === 0}
                onClick={() => handleRowMove(index, index - 1)}
              >
                <ExpandLessIcon />
              </IconButton>
              <IconButton
                disabled={index === list.length - 1}
                onClick={() => handleRowMove(index, index + 1)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </>
        )
      },
    },
    {
      accessorKey: '編輯',
      header: '',
      size: 150,
      Cell: ({ row }) => (
        <DialogController>
          {({ open, onOpen, onClose }) => (
            <>
              <EditDeleteButtons
                id={row.original.key}
                onEdit={() => {
                  onOpen()
                  handleDialogOpen(row.original.key)
                }}
                onDelete={handleDelete}
              />
              <EditDialog
                id={editKey}
                open={open}
                onClose={() => {
                  onClose()
                  handleDialogClose()
                }}
              />
            </>
          )}
        </DialogController>
      ),
    },
  ]

  useEffect(() => {
    setIsFetch(true)
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - One-to-One NAT'
        subtitle={
          <>
            <Typography
              variant='subtitle2'
              sx={{ marginTop: '4px', color: 'gray' }}
            >
              One-to-One NAT is a way to make systems behind a firewall and
              configured with private IP addresses appear to have public IP
              addresses.
            </Typography>
            <Typography
              variant='subtitle1'
              sx={{ marginTop: '4px', color: 'darkergray' }}
            >
              {
                'NOTE: The rules take effect only when the connection type of the interface is "Static address".'
              }
            </Typography>
          </>
        }
      />
      <Stack gap={2}>
        <StyledMuiReactTable
          title='One-to-One NAT Rules'
          rows={list}
          columns={columns}
        />

        <Form suggest={suggest} options={options} list={list} />
      </Stack>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={handleApply} />
      </Stack>
    </>
  )
}
