import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { TextField, Select, Checkbox } from 'components/fields'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { textfieldProps, selectProps, checkboxProps } from 'utils/formik'
import { modalValidationSchema } from './validationSchema'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const AddOneToOneNatEditDialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.oneToOneNatEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const destIpList = optionsConverter(suggest, `cbid.firewall.${id}.dest_ip`)
  const ifaceList = optionsConverter(options, `cbid.firewall.${id}.iface`)
  const fwdmodeList = optionsConverter(options, `cbid.firewall.${id}.fwdmode`)
  const protoList = optionsConverter(suggest, `cbid.firewall.${id}.proto`)
  const scheduleList = optionsConverter(
    options,
    `cbid.firewall.${id}.time_schedule`,
  )

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`cbid.firewall.${id}.__enabled`] ?? '1',
      name: result[`cbid.firewall.${id}.name`] ?? '',
      dest_ip: result[`cbid.firewall.${id}.dest_ip`] ?? '',
      src_ip: result[`cbid.firewall.${id}.src_ip`] ?? '',
      iface: result[`cbid.firewall.${id}.iface`] ?? 'wan',
      fwdmode: result[`cbid.firewall.${id}.fwdmode`] ?? 'dmz',
      proto: result[`cbid.firewall.${id}.proto`] ?? 'tcpudp', // When fwdmode === 'portforward'
      src_port: result[`cbid.firewall.${id}.src_port`] ?? '', // When fwdmode === 'portforward'
      dest_port: result[`cbid.firewall.${id}.dest_port`] ?? '', // When fwdmode === 'portforward'
      reflection: result[`cbid.firewall.${id}.reflection`] ?? '1', // When fwdmode === 'portforward'
      time_schedule: result[`cbid.firewall.${id}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`cbid.firewall.${id}.__enabled`]: values.__enabled,
        [`cbid.firewall.${id}.name`]: values.name,
        [`cbid.firewall.${id}.dest_ip`]: values.dest_ip,
        [`cbid.firewall.${id}.src_ip`]: values.src_ip,
        [`cbid.firewall.${id}.iface`]: values.iface,
        [`cbid.firewall.${id}.fwdmode`]: values.fwdmode,
        ...(isfwdmodePortForward
          ? {
              [`cbid.firewall.${id}.proto`]: values.proto,
              [`cbid.firewall.${id}.src_port`]: values.src_port,
              [`cbid.firewall.${id}.dest_port`]: values.dest_port,
            }
          : {}),
        [`cbid.firewall.${id}.reflection`]: values.reflection,
        [`cbid.firewall.${id}.time_schedule`]: values.time_schedule,
      }
      await sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE,
        payload,
        id,
      )
      await sleep(1000)
      await onClose()
    },
  })

  const isfwdmodePortForward = formik.values.fwdmode === 'portforward'

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Select
          {...selectProps('__enabled', 'Rule is enabled:', booleanList, formik)}
        />
        <TextField {...textfieldProps('name', 'Name:', formik)} />
        <Select
          {...selectProps('dest_ip', 'Private IP:', destIpList, formik)}
        />
        <TextField {...textfieldProps('src_ip', 'Public IP:', formik)} />
        <Select {...selectProps('iface', 'Interface:', ifaceList, formik)} />
        <Select
          {...selectProps('fwdmode', 'Forwarding Mode:', fwdmodeList, formik)}
        />
        {isfwdmodePortForward && (
          <>
            <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
            <TextField
              {...textfieldProps('src_port', 'External Port:', formik)}
            />
            <TextField
              {...textfieldProps('dest_port', 'Internal Port:', formik)}
            />
            <Checkbox
              {...checkboxProps('reflection', 'Enable NAT Loopback:', formik)}
            />
          </>
        )}
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
