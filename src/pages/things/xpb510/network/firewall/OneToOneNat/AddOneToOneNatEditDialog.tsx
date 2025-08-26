import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { TextField, Select, Checkbox } from 'components/formik'
import { useFormik } from 'formik'
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { formikField } from 'utils/formik'
import { modalValidationSchema } from './validationSchema'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import {
  GetOneToOneNatField,
  SetOneToOneNatEditPageRequest,
} from 'types/xpb510/network/firewall'

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

  type OneToOneNatValues = Record<GetOneToOneNatField, string>

  const formik = useFormik<OneToOneNatValues>({
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
      const payload: SetOneToOneNatEditPageRequest = {
        'cbi.submit': '1',
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
      {!data ? (
        <CircularProgress />
      ) : (
        <DialogContent>
          <Select
            label='Rule is enabled'
            options={booleanList}
            {...formikField(formik, '__enabled')}
          />
          <TextField label='Name' {...formikField(formik, 'name')} />
          <Select
            label='Private IP'
            options={destIpList}
            {...formikField(formik, 'dest_ip')}
          />
          <TextField label='Public IP' {...formikField(formik, 'src_ip')} />
          <Select
            label='Interface'
            options={ifaceList}
            {...formikField(formik, 'iface')}
          />
          <Select
            label='Forwarding Mode'
            options={fwdmodeList}
            {...formikField(formik, 'fwdmode')}
          />
          {isfwdmodePortForward && (
            <>
              <Select
                label='Protocol'
                options={protoList}
                {...formikField(formik, 'proto')}
              />
              <TextField
                label='External Port'
                {...formikField(formik, 'src_port')}
              />
              <TextField
                label='Internal Port'
                {...formikField(formik, 'dest_port')}
              />
              <Checkbox
                label='Enable NAT Loopback'
                {...formikField(formik, 'reflection')}
              />
            </>
          )}
          <Select
            label='Schedule'
            options={scheduleList}
            {...formikField(formik, 'time_schedule')}
          />
        </DialogContent>
      )}

      <DialogActions>
        <Button
          icon='confirm'
          text='confirm'
          disabled={!data || !formik.dirty || !formik.isValid}
          onClick={() => formik.handleSubmit()}
        />
        <Button icon='cancel' text='cancel' color='error' onClick={onClose} />
      </DialogActions>
    </Dialog>
  )
}
