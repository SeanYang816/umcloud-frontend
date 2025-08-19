import { useEffect, useState } from 'react'
import { BGW_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType, StringStringType } from 'types'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { Form } from './Form'
import { clearProperty } from 'reducers/bgw5105/firewall'
import { EditDialog } from './EditDialog'
import { ModeForm } from './ModeForm'
import { toggleStrNum } from 'utils'
import { useFormik } from 'formik'
import { modeValidationSchema } from './validationSchema'
import { PageHeader } from 'components/PageHeader'
import { Box, Checkbox, Stack } from '@mui/material'
import { EditDeleteButtons } from 'components/EditDeleteButtons'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { type MRT_ColumnDef } from 'material-react-table'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { DialogController } from 'components/DialogController'
import { Button } from 'components/extends/Button'

export const MacFiltering = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.macFiltering,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}

  const [list, setList] = useApiResultObjectToArrayByCommonId(
    result,
    'macfilter',
  )
  const [isFetch, setIsFetch] = useState(false)
  const [editKey, setEditKey] = useState('')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enabled: result['cbid.firewall.mac_filter.enabled'] ?? '0',
      mode: result['cbid.firewall.mac_filter.mode'] ?? '0',
    },
    enableReinitialize: true,
    validationSchema: modeValidationSchema,
    onSubmit: (values) => {
      const enabledProps: StringStringType = {}
      list.forEach((item: StringStringType) => {
        enabledProps[`cbid.firewall.${item.key}.enabled`] = item.enabled
        enabledProps[`cbid.firewall.${item.key}.name`] = item.name
        enabledProps[`cbid.firewall.${item.key}.mac_addr`] = item.mac
        enabledProps[`cbid.firewall.${item.key}.time_schedule`] =
          item.time_schedule
      })

      sendWsSetMessage(BGW_EVENT_ACTIONS.FIREWALL_SET_MAC_FILTERING_PAGE, {
        'cbid.firewall.mac_filter.enabled': values.enabled,
        'cbid.firewall.mac_filter.mode': values.mode,
        ...enabledProps,
      })
    },
  })

  const handleDialogOpen = (key: string) => {
    setEditKey(key)
    sendWsGetMessage(
      BGW_EVENT_ACTIONS.FIREWALL_GET_MAC_FILTERING_EDIT_PAGE,
      key,
    )
  }

  const handleDialogClose = () => {
    setEditKey('')
    setIsFetch(false)
    dispatch(clearProperty('macFilteringEdit'))
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

  const handleDelete = (key: string) => {
    sendWsSetMessage(BGW_EVENT_ACTIONS.FIREWALL_DELETE_MAC_FILTERING_RULE, {
      'cbid.firewall.mac_filter.enabled': formik.values.enabled,
      'cbid.firewall.mac_filter.mode': formik.values.mode,
      [`cbi.rts.firewall.${key}`]: 'Delete',
    })
  }

  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Name',
      accessorFn: (row) => row.name,
      size: 150,
    },
    {
      header: 'MAC Address',
      accessorFn: (row) => (
        <div dangerouslySetInnerHTML={{ __html: row.mac }} />
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
    sendWsGetMessage(BGW_EVENT_ACTIONS.FIREWALL_GET_MAC_FILTERING_PAGE)
  }, [isFetch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - MAC Filtering'
        subtitle='MAC Filtering will allow/block clients computers or devices which on your Local Area Network (LAN) from accessing to the Router and Internet.'
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <ModeForm formik={formik} options={options} />

        {formik.values.enabled === '1' && (
          <StyledMuiReactTable
            title='MAC Filtering Rules'
            rows={list}
            columns={columns}
          />
        )}

        {formik.values.enabled === '1' && (
          <Form
            parentformik={formik}
            suggest={suggest}
            options={options}
            list={list}
          />
        )}
      </Box>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
