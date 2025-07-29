import { Card, Stack } from '@mui/material'
import { SERVER_ACTIONS } from 'constant'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DefaultRootStateProps,
  FormikValuesType,
  StringStringType,
} from 'types'
import { CardHeader } from 'components/extends/CardHeader'
import { Select } from 'components/fields'
import { selectProps } from 'utils/formik'
import { clearProperty } from 'reducers/routing'
import { EditDialog } from './EditDialog'
import { PageHeader } from 'components/PageHeader'
import { MRT_ColumnDef } from 'material-react-table'
import { EditButton } from 'components/EditButton'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { DialogController } from 'components/DialogController'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

export interface RipItem {
  key: string
  name: string
  enabled: string
  send_version: string
  receive_version: string
  authentication: string
  key_string: string
  key_mode: string
}

export const Rip = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector((state: DefaultRootStateProps) => state.routing.rip)
  const result = data?.result ?? {}

  const [list] = useApiResultObjectToArrayByCommonId(result, 'rip-interface')
  const [isFetch, setIsFetch] = useState(false)

  const editKey = useRef('')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enable: result['cbid.ripd.config.enable'] ?? '0',
      version: result['cbid.ripd.config.version'] ?? '2',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      sendWsSetMessage(SERVER_ACTIONS.ROUTING_SET_RIP_PAGE, {
        'cbid.ripd.config.enable': values.enable,
        'cbid.ripd.config.version': values.version,
      })
    },
  })

  const handleDialogOpen = (key: string) => {
    editKey.current = key
    sendWsGetMessage(SERVER_ACTIONS.ROUTING_GET_RIP_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    editKey.current = ''
    setIsFetch(false)
    dispatch(clearProperty('ripEdit'))
  }

  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Interface',
      accessorFn: (row) => row.name,
      size: 150,
    },
    {
      header: 'Enable',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.enabled }} />
      ),
      size: 150,
    },
    {
      header: 'Send version',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.send_version }} />
      ),
      size: 150,
    },
    {
      header: 'Receive version',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.receive_version }} />
      ),
      size: 150,
    },
    {
      header: 'Authentication',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.authentication }} />
      ),
      size: 150,
    },
    {
      header: 'Key',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.key_string }} />
      ),
      size: 150,
    },
    {
      header: 'Key mode',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.key_mode }} />
      ),
      size: 150,
    },
    {
      accessorKey: '編輯',
      header: '',
      size: 150,
      Cell: ({ row }) => (
        <DialogController>
          {({ open, onOpen, onClose }) => (
            <>
              <EditButton
                id={row.original.key}
                onEdit={() => {
                  onOpen()
                  handleDialogOpen(row.original.key)
                }}
              />
              <EditDialog
                id={editKey.current}
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
    sendWsGetMessage(SERVER_ACTIONS.ROUTING_GET_RIP_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader title='RIP' subtitle='RIP (Routing Information Protocol)' />
      <Stack gap={2}>
        <Card>
          <CardHeader title='RIP Configuration' />
          <StyledCardContent>
            <Select
              {...selectProps('enable', 'RIP enable:', booleanList, formik)}
            />
          </StyledCardContent>
        </Card>

        <StyledMuiReactTable title='Overview' rows={list} columns={columns} />
      </Stack>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
