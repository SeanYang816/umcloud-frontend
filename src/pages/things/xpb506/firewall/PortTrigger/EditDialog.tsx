import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { TextField, Select } from 'components/fields'
import { useFormik } from 'formik'
import { modalValidationSchema } from './validationSchema'
import { selectProps, textfieldProps } from 'utils/formik'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const EditDialog = ({ id, open, onClose }: DialogProps) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.portTriggerEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()
  const rootId = `cbid.firewall.${id}`
  const ifaceList = optionsConverter(options, `${rootId}.iface`)
  const matchProtoList = optionsConverter(suggest, `${rootId}.match_proto`)
  const triggerProtoList = optionsConverter(suggest, `${rootId}.trigger_proto`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)
  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '1',
      name: result[`${rootId}.name`] ?? '',
      iface: result[`${rootId}.iface`] ?? 'all',
      match_proto: result[`${rootId}.match_proto`] ?? 'all',
      match_port: result[`${rootId}.match_port`] ?? '',
      trigger_proto: result[`${rootId}.trigger_proto`] ?? 'all',
      trigger_port: result[`${rootId}.trigger_port`] ?? '',
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.__enabled`]: values.__enabled,
        [`${rootId}.name`]: values.name,
        [`${rootId}.iface`]: values.iface,
        [`${rootId}.match_proto`]: values.match_proto,
        [`${rootId}.match_port`]: values.match_port,
        [`${rootId}.trigger_proto`]: values.trigger_proto,
        [`${rootId}.trigger_port`]: values.trigger_port,
        [`${rootId}.time_schedule`]: values.time_schedule,
      }
      await sendWsSetMessage(
        SERVER_ACTIONS.FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE,
        payload,
        id,
      )
      await sleep(1000)
      await onClose()
    },
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Select
          {...selectProps('__enabled', 'Rule is enabled:', booleanList, formik)}
        />
        <TextField {...textfieldProps('name', 'Name:', formik)} />
        <Select {...selectProps('iface', 'Interface:', ifaceList, formik)} />
        <Select
          {...selectProps(
            'match_proto',
            'Match protocol:',
            matchProtoList,
            formik,
          )}
        />
        <TextField
          {...textfieldProps('match_port', 'Match port:', formik)}
          helperText='Match incoming traffic directed at the given destination port or port range on this host'
        />
        <Select
          {...selectProps(
            'trigger_proto',
            'Trigger protocol:',
            triggerProtoList,
            formik,
          )}
        />
        <TextField
          {...textfieldProps('trigger_port', 'Trigger port:', formik)}
        />
        <Select
          {...selectProps('time_schedule', 'Schedule:', scheduleList, formik)}
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
