import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, StringStringType } from 'types'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { clearProperty } from 'reducers/bgw5105/firewall'
import { AddPortTriggerForm } from './AddPortTriggerForm'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PortTriggerEditDialog } from './PortTriggerEditDialog'
import { PageHeader } from 'components/PageHeader'
import { Box, Checkbox, IconButton, LinearProgress, Stack } from '@mui/material'
import { EditDeleteButtons } from 'components/EditDeleteButtons'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { toggleStrNum } from 'utils'
import { MRT_ColumnDef } from 'material-react-table'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'
import { resetFirewallState } from 'reducers/xpb510/network/firewall'

export const PortTrigger = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.portTrigger,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}

  const [list, setList] = useApiResultObjectToArrayByCommonId(result, 'trigger')
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

  const handleDelete = (key: string) => {
    sendWsSetMessage(
      XPB_EVENT_ACTIONS.XPB_510_FIREWALL_DELETE_PORT_TRIGGER_RULE,
      {
        'cbi.submit': '1',
        [`cbi.rts.firewall.${key}`]: 'Delete',
      },
    )
  }

  const handleDialogOpen = (key: string) => {
    setEditKey(key)
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE,
      key,
    )
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
    dispatch(clearProperty('portTriggerEdit'))
  }

  const handleApply = () => {
    const keysArray = list.map((item: StringStringType) => item.key)
    const concatenatedKeys = keysArray.join(' ')
    const enabledProps: StringStringType = {}
    list.forEach((item: StringStringType) => {
      enabledProps[`cbid.firewall.${item.key}.enabled`] = item.enabled
    })

    sendWsSetMessage(XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_TRIGGER_PAGE, {
      'cbi.sts.firewall.trigger': concatenatedKeys,
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
      header: 'Interface',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.iface }} />
      ),
      size: 150,
    },
    {
      header: 'Match port',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.match }} />
      ),
      size: 150,
    },
    {
      header: 'Trigger port',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.trigger }} />
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
              {open && (
                <PortTriggerEditDialog
                  id={editKey}
                  open={open}
                  onClose={() => {
                    onClose()
                    handleDialogClose()
                  }}
                />
              )}
            </>
          )}
        </DialogController>
      ),
    },
  ]

  useEffect(() => {
    setIsFetch(true)
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_TRIGGER_PAGE)

    return () => {
      dispatch(resetFirewallState())
    }
  }, [dispatch, isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - Port Trigger'
        subtitle='Automatically forward connections.'
      />
      {!data ? (
        <LinearProgress />
      ) : (
        <Stack gap={2}>
          <StyledMuiReactTable
            title='Port Trigger Rules'
            rows={list}
            columns={columns}
          />

          <AddPortTriggerForm options={options} list={list} />
        </Stack>
      )}
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={handleApply} />
      </Stack>
    </>
  )
}
