import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import { TextField, Select } from 'components/fields'
import { useFormik } from 'formik'
import { modalValidationSchema } from './validationSchema'
import { selectProps, textfieldProps } from 'utils/formik'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const PortTriggerEditDialog = ({ id, open, onClose }: DialogProps) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.portTriggerEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()
  const ifaceList = optionsConverter(options, `cbid.firewall.${id}.iface`)
  const matchProtoList = optionsConverter(
    suggest,
    `cbid.firewall.${id}.match_proto`,
  )
  const triggerProtoList = optionsConverter(
    suggest,
    `cbid.firewall.${id}.trigger_proto`,
  )
  const scheduleList = optionsConverter(
    options,
    `cbid.firewall.${id}.time_schedule`,
  )
  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`cbid.firewall.${id}.__enabled`] ?? '1',
      name: result[`cbid.firewall.${id}.name`] ?? '',
      iface: result[`cbid.firewall.${id}.iface`] ?? 'all',
      match_proto: result[`cbid.firewall.${id}.match_proto`] ?? 'all',
      match_port: result[`cbid.firewall.${id}.match_port`] ?? '',
      trigger_proto: result[`cbid.firewall.${id}.trigger_proto`] ?? 'all',
      trigger_port: result[`cbid.firewall.${id}.trigger_port`] ?? '',
      time_schedule: result[`cbid.firewall.${id}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`cbid.firewall.${id}.__enabled`]: values.__enabled,
        [`cbid.firewall.${id}.name`]: values.name,
        [`cbid.firewall.${id}.iface`]: values.iface,
        [`cbid.firewall.${id}.match_proto`]: values.match_proto,
        [`cbid.firewall.${id}.match_port`]: values.match_port,
        [`cbid.firewall.${id}.trigger_proto`]: values.trigger_proto,
        [`cbid.firewall.${id}.trigger_port`]: values.trigger_port,
        [`cbid.firewall.${id}.time_schedule`]: values.time_schedule,
      }
      await sendWsSetMessage(
        BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE,
        payload,
        id,
      )
      await sleep(1000)
      await onClose()
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
              {...selectProps(
                '__enabled',
                'Rule is enabled:',
                booleanList,
                formik,
              )}
            />
            <TextField {...textfieldProps('name', 'Name:', formik)} />
            <Select
              {...selectProps('iface', 'Interface:', ifaceList, formik)}
            />
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
              {...selectProps(
                'time_schedule',
                'Schedule:',
                scheduleList,
                formik,
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!data}
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
