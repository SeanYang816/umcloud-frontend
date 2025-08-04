import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { TextField, Select, MultiSelect, Checkbox } from 'components/fields'
import { boolToStrNum, strNumToBool } from 'utils'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { modalValidationSchema } from './validationSchema'
import { SERVER_ACTIONS } from 'constant'
import {
  checkboxProps,
  multiSelectProps,
  selectProps,
  textfieldProps,
} from 'utils/formik'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const EditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.portForwardEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const rootId = `cbid.firewall.${id}`
  const protoList = optionsConverter(suggest, `${rootId}.proto`)
  const macList = optionsConverter(suggest, `${rootId}.src_mac`)
  const srcIpList = optionsConverter(suggest, `${rootId}.src_ip`)
  const extIfaceList = optionsConverter(options, `${rootId}.src_iface`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '1',
      name: result[`${rootId}.name`] ?? '',
      proto: result[`${rootId}.proto`] ?? 'tcp udp',
      src_mac: result[`${rootId}.src_mac`] ?? [],
      src_ip: result[`${rootId}.src_ip`] ?? '',
      src_port: result[`${rootId}.src_port`] ?? '',
      src_iface: result[`${rootId}.src_iface`] ?? 'wan',
      src_dport: result[`${rootId}.src_dport`] ?? '', // external port
      dest_ip: result[`${rootId}.dest_ip`] ?? '', // internal IP address
      dest_port: result[`${rootId}.dest_port`] ?? '', // internal port
      reflection: strNumToBool(result[`${rootId}.reflection`] ?? '1'), // Enable NAT Loopback
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.__enabled`]: values.__enabled,
        [`${rootId}.name`]: values.name,
        [`${rootId}.proto`]: values.proto,
        [`${rootId}.src_mac`]: values.src_mac,
        [`${rootId}.src_ip`]: values.src_ip,
        [`${rootId}.src_port`]: values.src_port,
        [`${rootId}.src_iface`]: values.src_iface,
        [`${rootId}.src_dport`]: values.src_dport,
        [`${rootId}.dest_ip`]: values.dest_ip,
        [`${rootId}.dest_port`]: values.dest_port,
        [`${rootId}.reflection`]: boolToStrNum(!!values.reflection),
        [`${rootId}.time_schedule`]: values.time_schedule,
        [`${rootId}.extra`]: '',
        [`${rootId}.src`]: 'wan',
        [`${rootId}.dest`]: 'lan',
        [`${rootId}.src_dip`]: '',
      }

      await sendWsSetMessage(
        SERVER_ACTIONS.FIREWALL_SET_PORT_FORWARD_EDIT_PAGE,
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
        <MultiSelect
          freeSolo
          {...multiSelectProps(
            'src_mac',
            'Source MAC address:',
            macList,
            formik,
          )}
        />
        <Select
          {...selectProps('src_ip', 'Source IP address:', srcIpList, formik)}
        />
        <TextField {...textfieldProps('src_port', 'Source port:', formik)} />
        <Select
          {...selectProps(
            'src_iface',
            'External interface:',
            extIfaceList,
            formik,
          )}
        />
        <TextField {...textfieldProps('src_dport', 'External port:', formik)} />
        <TextField
          {...textfieldProps('dest_ip', 'Internal IP address:', formik)}
        />
        <TextField {...textfieldProps('dest_port', 'Internal port:', formik)} />
        <Checkbox
          {...checkboxProps('reflection', 'Enable NAT Loopback:', formik)}
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
