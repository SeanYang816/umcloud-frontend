import React from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { TextField, Select, MultiSelect, Checkbox } from 'components/fields'
import { boolToStrNum, strNumToBool } from 'utils'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { modalValidationSchema } from './validationSchema'
import { XPB_EVENT_ACTIONS } from 'constant'
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
import { PortForwardEditPageResult } from 'types/xpb510/network/firewall'

export const PortForwardEditDialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.portForwardEdit,
  )
  const result = data?.result ?? ({} as PortForwardEditPageResult)
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const protoList = optionsConverter(suggest, `cbid.firewall.${id}.proto`)
  const macList = optionsConverter(suggest, `cbid.firewall.${id}.src_mac`)
  const srcIpList = optionsConverter(suggest, `cbid.firewall.${id}.src_ip`)
  const extIfaceList = optionsConverter(
    options,
    `cbid.firewall.${id}.src_iface`,
  )
  const scheduleList = optionsConverter(
    options,
    `cbid.firewall.${id}.time_schedule`,
  )

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`cbid.firewall.${id}.__enabled`] ?? '1',
      name: result[`cbid.firewall.${id}.name`] ?? '',
      proto: result[`cbid.firewall.${id}.proto`] ?? 'tcp udp',
      src_mac: result[`cbid.firewall.${id}.src_mac`] ?? [],
      src_ip: result[`cbid.firewall.${id}.src_ip`] ?? '',
      src_port: result[`cbid.firewall.${id}.src_port`] ?? '',
      src_iface: result[`cbid.firewall.${id}.src_iface`] ?? 'wan',
      src_dport: result[`cbid.firewall.${id}.src_dport`] ?? '', // external port
      dest_ip: result[`cbid.firewall.${id}.dest_ip`] ?? '', // internal IP address
      dest_port: result[`cbid.firewall.${id}.dest_port`] ?? '', // internal port
      reflection: strNumToBool(result[`cbid.firewall.${id}.reflection`] ?? '1'), // Enable NAT Loopback
      time_schedule: result[`cbid.firewall.${id}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`cbid.firewall.${id}.__enabled`]: values.__enabled,
        [`cbid.firewall.${id}.name`]: values.name,
        [`cbid.firewall.${id}.proto`]: values.proto,
        [`cbid.firewall.${id}.src_mac`]: values.src_mac,
        [`cbid.firewall.${id}.src_ip`]: values.src_ip,
        [`cbid.firewall.${id}.src_port`]: values.src_port,
        [`cbid.firewall.${id}.src_iface`]: values.src_iface,
        [`cbid.firewall.${id}.src_dport`]: values.src_dport,
        [`cbid.firewall.${id}.dest_ip`]: values.dest_ip,
        [`cbid.firewall.${id}.dest_port`]: values.dest_port,
        [`cbid.firewall.${id}.reflection`]: boolToStrNum(!!values.reflection),
        [`cbid.firewall.${id}.time_schedule`]: values.time_schedule,
        [`cbid.firewall.${id}.extra`]: '',
        [`cbid.firewall.${id}.src`]: 'wan',
        [`cbid.firewall.${id}.dest`]: 'lan',
        [`cbid.firewall.${id}.src_dip`]: '',
      }

      await sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_FORWARD_EDIT_PAGE,
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
        {!data ? (
          <CircularProgress />
        ) : (
          <>
            <Select
              {...selectProps(
                '__enabled',
                'Rule is enabled:',
                booleanList,
                formik,
              )}
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
              {...selectProps(
                'src_ip',
                'Source IP address:',
                srcIpList,
                formik,
              )}
            />
            <TextField
              {...textfieldProps('src_port', 'Source port:', formik)}
            />
            <Select
              {...selectProps(
                'src_iface',
                'External interface:',
                extIfaceList,
                formik,
              )}
            />
            <TextField
              {...textfieldProps('src_dport', 'External port:', formik)}
            />
            <TextField
              {...textfieldProps('dest_ip', 'Internal IP address:', formik)}
            />
            <TextField
              {...textfieldProps('dest_port', 'Internal port:', formik)}
            />
            <Checkbox
              {...checkboxProps('reflection', 'Enable NAT Loopback:', formik)}
            />
            <Select
              {...selectProps(
                'time_schedule',
                'Schedule:',
                scheduleList,
                formik,
              )}
            />
          </>
        )}
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
