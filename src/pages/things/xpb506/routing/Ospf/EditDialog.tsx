import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { TextField, Select, Checkbox } from 'components/fields'
import { RootStateProps, DialogProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { checkboxProps, selectProps, textfieldProps } from 'utils/formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { modalValidationSchema } from './validationSchema'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import React from 'react'

export const EditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.routing.ospfEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  // Extract the rootId
  const rootId = `cbid.ospfd.${id}`

  const networkList = optionsConverter(options, `${rootId}.network_type`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      ospf_enable: result[`${rootId}.ospf_enable`] ?? '1',
      network_type: result[`${rootId}.network_type`] ?? 'broadcast',
      authentication: strNumToBool(
        (result[`${rootId}.authentication`] as string) ?? '0',
      ),
      key_string: result[`${rootId}.key_string`] ?? '123',
      key_mode: strNumToBool((result[`${rootId}.key_mode`] as string) ?? '0'),
      cost:
        result[`${rootId}.cost`] != null
          ? Number(result[`${rootId}.cost`])
          : 15,
      priority:
        result[`${rootId}.priority`] != null
          ? Number(result[`${rootId}.priority`])
          : 1,
      area:
        result[`${rootId}.area`] != null ? Number(result[`${rootId}.area`]) : 0,
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (values) => {
      sendWsSetMessage(
        SERVER_ACTIONS.ROUTING_SET_OSPF_EDIT_PAGE,
        {
          [`${rootId}.ospf_enable`]: values.ospf_enable,
          [`${rootId}.network_type`]: values.network_type,
          [`${rootId}.authentication`]: boolToStrNum(!!values.authentication),
          [`${rootId}.key_string`]: values.key_string,
          [`${rootId}.key_mode`]: boolToStrNum(!!values.key_mode),
          [`${rootId}.cost`]: String(values.cost),
          [`${rootId}.priority`]: String(values.priority),
          [`${rootId}.area`]: String(values.area),
        },
        id,
      )
      onClose()
    },
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Select
          {...selectProps('ospf_enable', 'OSPF enable:', booleanList, formik)}
        />
        <Select
          {...selectProps('network_type', 'Network type:', networkList, formik)}
        />
        <Checkbox
          {...checkboxProps('authentication', 'Key authentication:', formik)}
        />
        <TextField {...textfieldProps('key_string', 'Key string:', formik)} />
        <Checkbox
          {...checkboxProps('key_mode', 'Plain text password:', formik)}
        />
        <TextField
          type='number'
          {...textfieldProps('cost', 'Cost:', formik)}
          helperText='1~65535'
        />
        <TextField
          type='number'
          {...textfieldProps('priority', 'Priority:', formik)}
          helperText='0~255'
        />
        <TextField
          type='number'
          {...textfieldProps('area', 'Area:', formik)}
          helperText=' ip or 0~4294967295'
        />
      </DialogContent>
      <DialogActions>
        <Button
          icon='confirm'
          text='confirm'
          onClick={() => formik.handleSubmit()}
        />
        <Button icon='cancel' text='cancel' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
