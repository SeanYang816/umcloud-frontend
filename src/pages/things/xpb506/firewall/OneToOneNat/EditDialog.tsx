import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { TextField, Select, Checkbox } from 'components/fields'
import { useFormik } from 'formik'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { textfieldProps, selectProps, checkboxProps } from 'utils/formik'
import { modalValidationSchema } from './validationSchema'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'

export const EditDialog: React.FC<DialogProps> = ({ id, open, onClose }) => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.oneToOneNatEdit,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}
  const { sendWsSetMessage } = useSendWsMessage()

  const rootId = `cbid.firewall.${id}`

  const destIpList = optionsConverter(suggest, `${rootId}.dest_ip`)
  const ifaceList = optionsConverter(options, `${rootId}.iface`)
  const fwdmodeList = optionsConverter(options, `${rootId}.fwdmode`)
  const protoList = optionsConverter(suggest, `${rootId}.proto`)
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __enabled: result[`${rootId}.__enabled`] ?? '1',
      name: result[`${rootId}.name`] ?? '',
      dest_ip: result[`${rootId}.dest_ip`] ?? '',
      src_ip: result[`${rootId}.src_ip`] ?? '',
      iface: result[`${rootId}.iface`] ?? 'wan',
      fwdmode: result[`${rootId}.fwdmode`] ?? 'dmz',
      proto: result[`${rootId}.proto`] ?? 'tcpudp', // When fwdmode === 'portforward'
      src_port: result[`${rootId}.src_port`] ?? '', // When fwdmode === 'portforward'
      dest_port: result[`${rootId}.dest_port`] ?? '', // When fwdmode === 'portforward'
      reflection: result[`${rootId}.reflection`] ?? '1', // When fwdmode === 'portforward'
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        [`${rootId}.__enabled`]: values.__enabled,
        [`${rootId}.name`]: values.name,
        [`${rootId}.dest_ip`]: values.dest_ip,
        [`${rootId}.src_ip`]: values.src_ip,
        [`${rootId}.iface`]: values.iface,
        [`${rootId}.fwdmode`]: values.fwdmode,
        ...(isfwdmodePortForward
          ? {
              [`${rootId}.proto`]: values.proto,
              [`${rootId}.src_port`]: values.src_port,
              [`${rootId}.dest_port`]: values.dest_port,
            }
          : {}),
        [`${rootId}.reflection`]: values.reflection,
        [`${rootId}.time_schedule`]: values.time_schedule,
      }
      await sendWsSetMessage(
        SERVER_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE,
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
