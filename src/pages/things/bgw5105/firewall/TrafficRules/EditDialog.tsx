import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import {
  multiSelectProps,
  radiosProps,
  selectProps,
  textfieldProps,
} from 'utils/formik'
import { TextField, Select, MultiSelect, Radios } from 'components/fields'
import { modalValidationSchema } from './validationSchema'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const EditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.trafficRulesEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const rootId = `cbid.firewall.${id}`

  const protoList = optionsConverter(suggest, `${rootId}.proto`)
  const familyList = optionsConverter(options, `${rootId}.family`)
  const imcpTypeList = optionsConverter(suggest, `${rootId}.icmp_type`)
  const srcMacList = optionsConverter(suggest, `${rootId}.src_mac`)
  const srcIpList = optionsConverter(suggest, `${rootId}.src_ip`)
  const destIpList = optionsConverter(suggest, `${rootId}.dest_ip`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)
  const destList = optionsConverter(options, `${rootId}.dest`)
  const srcList = optionsConverter(options, `${rootId}.src`)
  const targetList = optionsConverter(options, `${rootId}.target`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '',
      name: result[`${rootId}.name`] ?? '',
      family: result[`${rootId}.family`] ?? '',
      proto: result[`${rootId}.proto`] ?? 'tcpudp',
      icmp_type: result[`${rootId}.icmp_type`] ?? [],
      src: result[`${rootId}.src`] ?? 'wan',
      src_mac: result[`${rootId}.src_mac`] ?? '',
      src_ip: result[`${rootId}.src_ip`] ?? '',
      src_port: result[`${rootId}.src_port`] ?? '',
      dest: result[`${rootId}.dest`] ?? '',
      dest_ip: result[`${rootId}.dest_ip`] ?? '',
      dest_port: result[`${rootId}.dest_port`] ?? '',
      target: result[`${rootId}.target`] ?? '',
      extra: result[`${rootId}.extra`] ?? '',
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.__enabled`]: values.__enabled, // Rule is enabled/disabled
        [`${rootId}.name`]: values.name, // Name
        [`${rootId}.family`]: values.family, // Restrict to address family
        [`${rootId}.proto`]: values.proto, // Protocol
        [`${rootId}.icmp_type`]: values.icmp_type, // Match ICMP type
        [`${rootId}.src`]: values.src, // Source zone (Radio)
        [`${rootId}.src_mac`]: values.src_mac, // Source MAC address
        [`${rootId}.src_ip`]: values.src_ip, // Source address
        [`${rootId}.src_port`]: values.src_port, // Source port
        [`${rootId}.dest`]: values.dest, // Destination zone (Radio)
        [`${rootId}.dest_ip`]: values.dest_ip, // Destination address
        [`${rootId}.dest_port`]: values.dest_port, // Destination port
        [`${rootId}.target`]: values.target, // action
        [`${rootId}.extra`]: values.extra, // Extra arguments
        [`${rootId}.time_schedule`]: values.time_schedule, // Schedule
      }
      await sendWsSetMessage(
        BGW_EVENT_ACTIONS.FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE,
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
        <Select
          {...selectProps(
            'family',
            'Restrict to address family:',
            familyList,
            formik,
          )}
        />
        <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
        <MultiSelect
          {...multiSelectProps(
            'icmp_type',
            'Match ICMP type',
            imcpTypeList,
            formik,
          )}
          freeSolo
        />
        <Radios {...radiosProps('src', 'Source zone:', srcList, formik)} />
        <Select
          {...selectProps('src_mac', 'Source MAC address:', srcMacList, formik)}
        />
        <Select
          {...selectProps('src_ip', 'Source address:', srcIpList, formik)}
        />
        <TextField
          {...textfieldProps('src_port', 'Source port:', formik)}
          placeholder='Any'
        />
        <Radios
          {...radiosProps('dest', 'Destination zone:', destList, formik)}
        />
        <Select
          {...selectProps(
            'dest_ip',
            'Destination address:',
            destIpList,
            formik,
          )}
        />
        <TextField
          {...textfieldProps('dest_port', 'Destination port:', formik)}
          placeholder='Any'
        />
        <Select {...selectProps('target', 'Action:', targetList, formik)} />
        <TextField
          {...textfieldProps('extra', 'Extra arguments:', formik)}
          helperText='Passes additional arguments to iptables. Use with care!'
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
