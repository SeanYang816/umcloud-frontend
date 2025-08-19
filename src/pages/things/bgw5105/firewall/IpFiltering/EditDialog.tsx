import React from 'react'
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
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

export const EditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.ipFilteringEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()
  const rootId = `cbid.firewall.${id}`
  const protoList = optionsConverter(suggest, `${rootId}.proto`)
  const srcIpList = optionsConverter(suggest, `${rootId}.src_ip`)
  const destIpList = optionsConverter(suggest, `${rootId}.dest_ip`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '1',
      name: result[`${rootId}.name`] ?? '',
      proto: result[`${rootId}.proto`] ?? 'all',
      src_ip: result[`${rootId}.src_ip`] ?? '',
      src_port: result[`${rootId}.src_port`] ?? '',
      dest_ip: result[`${rootId}.dest_ip`] ?? '',
      dest_port: result[`${rootId}.dest_port`] ?? '',
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.__enabled`]: values.__enabled,
        [`${rootId}.name`]: values.name,
        [`${rootId}.proto`]: values.proto,
        [`${rootId}.src_ip`]: values.src_ip,
        [`${rootId}.src_port`]: values.src_port,
        [`${rootId}.dest_ip`]: values.dest_ip,
        [`${rootId}.dest_port`]: values.dest_port,
        [`${rootId}.time_schedule`]: values.time_schedule,
      }
      await sendWsSetMessage(
        BGW_EVENT_ACTIONS.FIREWALL_SET_IP_FILTERING_EDIT_PAGE,
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
        <Typography variant='subtitle2' gutterBottom>
          This page allows you to change advanced properties of the port
          forwarding entry. In most cases, there is no need to modify those
          settings.
        </Typography>
        <Select
          {...selectProps('__enabled', 'Rule is enabled:', booleanList, formik)}
        />
        <TextField {...textfieldProps('name', 'Name:', formik)} />
        <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
        <Select
          {...selectProps('src_ip', 'Source address:', srcIpList, formik)}
        />
        <TextField {...textfieldProps('src_port', 'Source Port:', formik)} />
        <Select
          {...selectProps(
            'dest_ip',
            'Destination address:',
            destIpList,
            formik,
          )}
        />
        <TextField
          {...textfieldProps('dest_port', 'Destination Port:', formik)}
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
