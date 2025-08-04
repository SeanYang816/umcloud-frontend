import { Card, Stack } from '@mui/material'
import { SERVER_ACTIONS } from 'constant'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType, StringStringType } from 'types'
import { CardHeader } from 'components/extends/CardHeader'
import { Select, TextField } from 'components/fields'
import { selectProps, textfieldProps } from 'utils/formik'
import { clearProperty } from 'reducers/bgw5105/routing'
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

export const Ospf = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.routing.ospf,
  )
  const result = data?.result ?? {}

  const [list] = useApiResultObjectToArrayByCommonId(result, 'ospf-interface')
  const [isFetch, setIsFetch] = useState(false)

  const editKey = useRef('')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enable: result['cbid.ospfd.config.enable'] ?? '0',
      router_id: result['cbid.ospfd.config.router_id'] ?? '192.168.10.1',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      sendWsSetMessage(SERVER_ACTIONS.ROUTING_SET_OSPF_PAGE, {
        'cbid.ospfd.config.enable': values.enable,
        'cbid.ospfd.config.router_id': values.router_id,
        'cbid.ospfd.config.neighbor_ip': [],
      })
    },
  })

  const handleDialogOpen = (key: string) => {
    editKey.current = key
    sendWsGetMessage(SERVER_ACTIONS.ROUTING_GET_OSPF_EDIT_PAGE, key)
  }

  const handleDialogClose = () => {
    editKey.current = ''
    setIsFetch(false)
    dispatch(clearProperty('ospfEdit'))
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
      header: 'Network',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.network_type }} />
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
      header: 'Cost',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.cost }} />
      ),
      size: 150,
    },
    {
      header: 'Priority',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.priority }} />
      ),
      size: 150,
    },
    {
      header: 'Area',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.area }} />
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
    sendWsGetMessage(SERVER_ACTIONS.ROUTING_GET_OSPF_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader title='OSPF' subtitle='OSPF (Open Shortest Path First)' />
      <Stack gap={2}>
        <Card>
          <CardHeader title='OSPF Configuration' />
          <StyledCardContent>
            <Select
              {...selectProps('enable', 'OSPF enable:', booleanList, formik)}
            />
            <TextField {...textfieldProps('router_id', 'Router ID:', formik)} />
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
