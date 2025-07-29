import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SERVER_ACTIONS } from 'constant'
import { DefaultRootStateProps, StringStringType } from 'types'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { clearProperty } from 'reducers/firewall'
import { MRT_ColumnDef } from 'material-react-table'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Form } from './Form'
import { EditDialog } from './EditDialog'
import { PageHeader } from 'components/PageHeader'
import { Box, Checkbox, IconButton, Stack } from '@mui/material'
import { toggleStrNum } from 'utils'
import { EditDeleteButtons } from 'components/EditDeleteButtons'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'

export const PortForward = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: DefaultRootStateProps) => state.firewall.portForward,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}

  const [list, setList] = useApiResultObjectToArrayByCommonId(
    result,
    'portforward',
  )
  const [isFetch, setIsFetch] = useState(false)
  const [editKey, setEditKey] = useState('')

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

  const handleDialogOpen = (key: string) => {
    setEditKey(key)
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_PORT_FORWARD_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
    dispatch(clearProperty('portForwardEdit'))
  }

  const handleDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.FIREWALL_DELETE_PORT_FORWARD_RULE, {
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

    sendWsSetMessage(SERVER_ACTIONS.FIREWALL_SET_PORT_FORWARD_PAGE, {
      'cbi.sts.firewall.portforward': concatenatedKeys,
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
      header: 'Match',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.match }} />
      ),
      size: 150,
    },
    {
      header: 'Forward to',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.dest }} />
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
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_PORT_FORWARD_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - Port Forward'
        subtitle='Port forwarding allows remote computers on the Internet to connect to a specific computer or service within the private LAN.'
      />

      <Stack gap={2}>
        <StyledMuiReactTable
          title='Port Forward Rules'
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
