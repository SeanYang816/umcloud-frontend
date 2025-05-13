import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { TextField, Select, Checkbox } from 'components/fields'
import { DefaultRootStateProps, DialogProps, FormikValuesType } from 'types'
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
    (state: DefaultRootStateProps) => state.routing.ripEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  // Extract the rootId
  const rootId = `cbid.ripd.${id}`

  const receiveList = optionsConverter(options, `${rootId}.receive_version`)
  const sendList = optionsConverter(options, `${rootId}.send_version`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      rip_enable: result[`${rootId}.rip_enable`] ?? '1',
      send_version: result[`${rootId}.send_version`] ?? '2',
      receive_version: result[`${rootId}.receive_version`] ?? '2',
      authentication: strNumToBool(result[`${rootId}.authentication`] ?? '0'),
      key_string: result[`${rootId}.key_string`] ?? '123',
      key_mode: strNumToBool(result[`${rootId}.key_mode`] ?? '0'),
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (values) => {
      sendWsSetMessage(
        SERVER_ACTIONS.ROUTING_SET_RIP_EDIT_PAGE,
        {
          [`${rootId}.rip_enable`]: values.rip_enable,
          [`${rootId}.send_version`]: values.send_version,
          [`${rootId}.receive_version`]: values.receive_version,
          [`${rootId}.authentication`]: boolToStrNum(!!values.authentication),
          [`${rootId}.key_string`]: values.key_string,
          [`${rootId}.key_mode`]: boolToStrNum(!!values.key_mode),
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
          {...selectProps('rip_enable', 'RIP enable:', booleanList, formik)}
        />
        <Select
          {...selectProps('send_version', 'Send version:', sendList, formik)}
        />
        <Select
          {...selectProps(
            'receive_version',
            'Receive version:',
            receiveList,
            formik,
          )}
        />
        <Checkbox
          {...checkboxProps('authentication', 'Key authentication:', formik)}
        />
        <TextField {...textfieldProps('key_string', 'Key string:', formik)} />
        <Checkbox
          {...checkboxProps('key_mode', 'Plain text password:', formik)}
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
