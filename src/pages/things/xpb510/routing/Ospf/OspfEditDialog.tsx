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
import { BGW_EVENT_ACTIONS } from 'constant'
import { formikField } from 'utils/formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { modalValidationSchema } from './validationSchema'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import React from 'react'

export const OspfEditDialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.routing.ospfEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const networkList = optionsConverter(options, `cbid.ospfd.${id}.network_type`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      ospf_enable: result[`cbid.ospfd.${id}.ospf_enable`] ?? '1',
      network_type: result[`cbid.ospfd.${id}.network_type`] ?? 'broadcast',
      authentication: strNumToBool(
        (result[`cbid.ospfd.${id}.authentication`] as string) ?? '0',
      ),
      key_string: result[`cbid.ospfd.${id}.key_string`] ?? '123',
      key_mode: strNumToBool(
        (result[`cbid.ospfd.${id}.key_mode`] as string) ?? '0',
      ),
      cost:
        result[`cbid.ospfd.${id}.cost`] != null
          ? Number(result[`cbid.ospfd.${id}.cost`])
          : 15,
      priority:
        result[`cbid.ospfd.${id}.priority`] != null
          ? Number(result[`cbid.ospfd.${id}.priority`])
          : 1,
      area:
        result[`cbid.ospfd.${id}.area`] != null
          ? Number(result[`cbid.ospfd.${id}.area`])
          : 0,
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: (values) => {
      sendWsSetMessage(
        BGW_EVENT_ACTIONS.ROUTING_SET_OSPF_EDIT_PAGE,
        {
          [`cbid.ospfd.${id}.ospf_enable`]: values.ospf_enable,
          [`cbid.ospfd.${id}.network_type`]: values.network_type,
          [`cbid.ospfd.${id}.authentication`]: boolToStrNum(
            !!values.authentication,
          ),
          [`cbid.ospfd.${id}.key_string`]: values.key_string,
          [`cbid.ospfd.${id}.key_mode`]: boolToStrNum(!!values.key_mode),
          [`cbid.ospfd.${id}.cost`]: String(values.cost),
          [`cbid.ospfd.${id}.priority`]: String(values.priority),
          [`cbid.ospfd.${id}.area`]: String(values.area),
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
        <>
          <DialogContent>
            <Select
              label='OSPF enable'
              options={booleanList}
              {...formikField(formik, 'ospf_enable')}
            />
            <Select
              label='Network type'
              options={networkList}
              {...formikField(formik, 'network_type')}
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
              label='Plain text password string'
              {...formikField(formik, 'key_mode')}
            />
            <TextField
              type='number'
              label='Cost'
              placeholder='1~65535'
              {...formikField(formik, 'cost')}
            />
            <TextField
              type='number'
              label='Priority'
              placeholder='0~255'
              {...formikField(formik, 'priority')}
            />
            <TextField
              type='number'
              label='Area'
              {...formikField(formik, 'area')}
              placeholder='ip or 0~4294967295'
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              icon='confirm'
              text='confirm'
              onClick={() => formik.handleSubmit()}
            />
            <Button
              icon='cancel'
              text='cancel'
              color='error'
              onClick={onClose}
            />
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
