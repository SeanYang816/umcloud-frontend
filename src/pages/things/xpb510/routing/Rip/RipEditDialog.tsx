import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { TextField, Select, Checkbox } from 'components/formik'
import { RootStateProps, DialogProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { formikField } from 'utils/formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { modalValidationSchema } from './validationSchema'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import React from 'react'

export const RipEditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.routing.ripEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  // Extract the rootId

  const receiveList = optionsConverter(
    options,
    `cbid.ripd.${id}.receive_version`,
  )
  const sendList = optionsConverter(options, `cbid.ripd.${id}.send_version`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      rip_enable: result[`cbid.ripd.${id}.rip_enable`] ?? '1',
      send_version: result[`cbid.ripd.${id}.send_version`] ?? '2',
      receive_version: result[`cbid.ripd.${id}.receive_version`] ?? '2',
      authentication: strNumToBool(
        result[`cbid.ripd.${id}.authentication`] ?? '0',
      ),
      key_string: result[`cbid.ripd.${id}.key_string`] ?? '123',
      key_mode: strNumToBool(result[`cbid.ripd.${id}.key_mode`] ?? '0'),
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (values) => {
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_RIP_EDIT_PAGE,
        {
          [`cbid.ripd.${id}.rip_enable`]: values.rip_enable,
          [`cbid.ripd.${id}.send_version`]: values.send_version,
          [`cbid.ripd.${id}.receive_version`]: values.receive_version,
          [`cbid.ripd.${id}.authentication`]: boolToStrNum(
            !!values.authentication,
          ),
          [`cbid.ripd.${id}.key_string`]: values.key_string,
          [`cbid.ripd.${id}.key_mode`]: boolToStrNum(!!values.key_mode),
        },
        id,
      )
      onClose()
    },
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      {!data ? (
        <CircularProgress />
      ) : (
        <DialogContent>
          <Select
            label='RIP enable'
            options={booleanList}
            {...formikField(formik, 'rip_enable')}
          />
          <Select
            label='Send version'
            options={sendList}
            {...formikField(formik, 'send_version')}
          />
          <Select
            label='Receive version'
            options={receiveList}
            {...formikField(formik, 'receive_version')}
          />
          <Checkbox
            label='Key authentication'
            {...formikField(formik, 'authentication')}
          />
          <TextField
            label='Key string'
            {...formikField(formik, 'key_string')}
          />
          <Checkbox
            label='Plain text password'
            {...formikField(formik, 'key_mode')}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button
          disabled={!data || formik.isSubmitting || !formik.dirty}
          icon='confirm'
          text='confirm'
          onClick={() => formik.handleSubmit()}
        />
        <Button icon='cancel' text='cancel' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
