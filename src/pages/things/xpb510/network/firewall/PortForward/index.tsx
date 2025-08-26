import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BGW_EVENT_ACTIONS, XPB_EVENT_ACTIONS } from 'constant'
import { RootStateProps, StringStringType } from 'types'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { MRT_ColumnDef } from 'material-react-table'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AddPortForwardForm } from './AddPortForwardForm'
import { PortForwardEditDialog } from './PortForwardEditDialog'
import { PageHeader } from 'components/PageHeader'
import { Box, Checkbox, IconButton, LinearProgress, Stack } from '@mui/material'
import { toggleStrNum } from 'utils'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'
import { resetFirewallState } from 'reducers/xpb510/network/firewall'

export const PortForward = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.portForward,
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
    sendWsGetMessage(BGW_EVENT_ACTIONS.FIREWALL_GET_PORT_FORWARD_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
  }

  const handleDelete = (key: string) => {
    sendWsSetMessage(BGW_EVENT_ACTIONS.FIREWALL_DELETE_PORT_FORWARD_RULE, {
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

    sendWsSetMessage(BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_FORWARD_PAGE, {
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
              <Stack direction='row' spacing={1.5}>
                <Button
                  icon='edit'
                  text='edit'
                  onClick={() => {
                    onOpen()
                    handleDialogOpen(row.original.key)
                  }}
                />
                <Button
                  icon='delete'
                  text='delete'
                  color='error'
                  onClick={() => handleDelete(row.original.key)}
                />
              </Stack>
              {open && (
                <PortForwardEditDialog
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
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_FORWARD_PAGE)

    return () => {
      dispatch(resetFirewallState())
    }
  }, [dispatch, isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - Port Forward'
        subtitle='Port forwarding allows remote computers on the Internet to connect to a specific computer or service within the private LAN.'
      />

      {!data ? (
        <LinearProgress />
      ) : (
        <>
          <Stack gap={2}>
            <StyledMuiReactTable
              title='Port Forward Rules'
              rows={list}
              columns={columns}
            />

            <AddPortForwardForm
              suggest={suggest}
              options={options}
              list={list}
            />
          </Stack>
          <Stack direction='row' ml='auto'>
            <Button icon='save' text='save' onClick={handleApply} />
          </Stack>
        </>
      )}
    </>
  )
}
