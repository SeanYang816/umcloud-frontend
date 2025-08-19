import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
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

  const formik = useFormik<FormikValuesType>({
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
      const payload = {
        [`cbid.firewall.${id}.__enabled`]: values.__enabled, // Rule is enabled/disabled
        [`cbid.firewall.${id}.name`]: values.name, // Name
        [`cbid.firewall.${id}.family`]: values.family, // Restrict to address family
        [`cbid.firewall.${id}.proto`]: values.proto, // Protocol
        [`cbid.firewall.${id}.icmp_type`]: values.icmp_type, // Match ICMP type
        [`cbid.firewall.${id}.src`]: values.src, // Source zone (Radio)
        [`cbid.firewall.${id}.src_mac`]: values.src_mac, // Source MAC address
        [`cbid.firewall.${id}.src_ip`]: values.src_ip, // Source address
        [`cbid.firewall.${id}.src_port`]: values.src_port, // Source port
        [`cbid.firewall.${id}.dest`]: values.dest, // Destination zone (Radio)
        [`cbid.firewall.${id}.dest_ip`]: values.dest_ip, // Destination address
        [`cbid.firewall.${id}.dest_port`]: values.dest_port, // Destination port
        [`cbid.firewall.${id}.target`]: values.target, // action
        [`cbid.firewall.${id}.extra`]: values.extra, // Extra arguments
        [`cbid.firewall.${id}.time_schedule`]: values.time_schedule, // Schedule
      }
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
              {...selectProps(
                '__enabled',
                'Rule is enabled:',
                booleanList,
                formik,
              )}
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
              {...selectProps(
                'src_mac',
                'Source MAC address:',
                srcMacList,
                formik,
              )}
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
