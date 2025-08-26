import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { RootStateProps } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { formikArrayField, formikField } from 'utils/formik'
import { modalValidationSchema } from './validationSchema'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import {
  SetTrafficEditCbidKey,
  SetTrafficEditPayload,
  SetTrafficFieldMap,
} from 'types/xpb510/network/firewall'
import { MultiSelect, Select, TextField, Radios } from 'components/formik'

export const AddTrafficRulesEditDialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.trafficRulesEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const protoList = optionsConverter(suggest, `cbid.firewall.${id}.proto`)
  const familyList = optionsConverter(options, `cbid.firewall.${id}.family`)
  const imcpTypeList = optionsConverter(
    suggest,
    `cbid.firewall.${id}.icmp_type`,
  )
  const srcMacList = optionsConverter(suggest, `cbid.firewall.${id}.src_mac`)
  const srcIpList = optionsConverter(suggest, `cbid.firewall.${id}.src_ip`)
  const destIpList = optionsConverter(suggest, `cbid.firewall.${id}.dest_ip`)
  const scheduleList = optionsConverter(
    options,
    `cbid.firewall.${id}.time_schedule`,
  )
  const destList = optionsConverter(options, `cbid.firewall.${id}.dest`)
  const srcList = optionsConverter(options, `cbid.firewall.${id}.src`)
  const targetList = optionsConverter(options, `cbid.firewall.${id}.target`)

  const formik = useFormik<SetTrafficFieldMap>({
    initialValues: {
      __enabled: result[`cbid.firewall.${id}.__enabled`] ?? '',
      name: result[`cbid.firewall.${id}.name`] ?? '',
      family: result[`cbid.firewall.${id}.family`] ?? '',
      proto: result[`cbid.firewall.${id}.proto`] ?? 'tcpudp',
      icmp_type: result[`cbid.firewall.${id}.icmp_type`] ?? [],
      src: result[`cbid.firewall.${id}.src`] ?? 'wan',
      src_mac: result[`cbid.firewall.${id}.src_mac`] ?? '',
      src_ip: result[`cbid.firewall.${id}.src_ip`] ?? '',
      src_port: result[`cbid.firewall.${id}.src_port`] ?? '',
      dest: result[`cbid.firewall.${id}.dest`] ?? '',
      dest_ip: result[`cbid.firewall.${id}.dest_ip`] ?? '',
      dest_port: result[`cbid.firewall.${id}.dest_port`] ?? '',
      target: result[`cbid.firewall.${id}.target`] ?? '',
      extra: result[`cbid.firewall.${id}.extra`] ?? '',
      time_schedule: result[`cbid.firewall.${id}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const k = <K extends keyof SetTrafficFieldMap>(kk: K) =>
        `cbid.firewall.${id}.${kk}` as SetTrafficEditCbidKey<typeof id, K>

      const payload: SetTrafficEditPayload<typeof id> = {}

      payload[k('__enabled')] = values.__enabled
      payload[k('name')] = values.name
      payload[k('family')] = values.family
      payload[k('proto')] = values.proto
      payload[k('icmp_type')] = values.icmp_type // string[]
      payload[k('src')] = values.src
      payload[k('src_mac')] = values.src_mac
      payload[k('src_ip')] = values.src_ip
      payload[k('src_port')] = values.src_port
      payload[k('dest')] = values.dest
      payload[k('dest_ip')] = values.dest_ip
      payload[k('dest_port')] = values.dest_port
      payload[k('target')] = values.target
      payload[k('extra')] = values.extra
      payload[k('time_schedule')] = values.time_schedule

      await sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE,
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
              label='Rule is enabled'
              options={booleanList}
              {...formikField(formik, '__enabled')}
            />
            <TextField label='Name' {...formikField(formik, 'name')} />
            <Select
              label='Restrict to address family'
              options={familyList}
              {...formikField(formik, 'family')}
            />
            <Select
              label='Protocol'
              options={protoList}
              {...formikField(formik, 'proto')}
            />
            <MultiSelect
              freeSolo
              label='Match ICMP type'
              options={imcpTypeList}
              {...formikArrayField(formik, 'icmp_type')}
            />
            <Radios
              label='Source zone'
              options={srcList}
              {...formikField(formik, 'src')}
            />
            <Select
              label='Source MAC address'
              options={srcMacList}
              {...formikField(formik, 'src_mac')}
            />
            <Select
              label='Source address'
              options={srcIpList}
              {...formikField(formik, 'src_ip')}
            />
            <TextField
              label='Source port'
              {...formikField(formik, 'src_port')}
            />
            <Radios
              label='Destination zone'
              options={destList}
              {...formikField(formik, 'dest')}
            />
            <Select
              label='Destination address'
              options={destIpList}
              {...formikField(formik, 'dest_ip')}
            />
            <TextField
              label='Destination port'
              {...formikField(formik, 'dest_port')}
            />
            <Select
              label='Action'
              options={targetList}
              {...formikField(formik, 'target')}
            />{' '}
            <TextField
              label='Extra arguments'
              {...formikField(formik, 'extra')}
              helperText='Passes additional arguments to iptables. Use with care!'
            />
            <Select
              label='Schedule'
              options={scheduleList}
              {...formikField(formik, 'time_schedule')}
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
