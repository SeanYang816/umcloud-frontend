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
import { RootStateProps } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { modalValidationSchema } from './validationSchema'
import { XPB_EVENT_ACTIONS } from 'constant'
import { formikField } from 'utils/formik'
import { DialogProps } from 'types'
import sleep from 'utils/sleep'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { Select } from 'components/formik/Select'
import { TextField } from 'components/formik/TextField'
import { Checkbox } from 'components/formik/Checkbox'
import type {
  PortForwardEditPageResult,
  SetPortForwardEditPageRequest,
} from 'types/xpb510/network/firewall'
import { SelectWithCustom } from 'components/formik'

/** ---------- Form values (UI shape) ---------- */
type FormValues = {
  __enabled: string
  name: string
  proto: string
  src_mac: string
  src_ip: string
  src_port: string
  src_iface: string
  src_dport: string
  dest_ip: string
  dest_port: string
  reflection: string
  time_schedule: string
  src_dip: string
  extra: string
}

const root = 'cbid.firewall'

/** Build initialValues from result (includes all known keys) */
function buildInitialValues(
  id: string,
  result: PortForwardEditPageResult,
): FormValues {
  // Treat incoming values as possibly non-string until normalized (runtime safety)
  const r = result

  return {
    __enabled: r[`${root}.${id}.__enabled`] ?? '1',
    name: r[`${root}.${id}.name`] ?? '',
    proto: r[`${root}.${id}.proto`] ?? 'tcp udp',
    src_mac: r[`${root}.${id}.src_mac`] ?? '',
    src_ip: r[`${root}.${id}.src_ip`] ?? '',
    src_port: r[`${root}.${id}.src_port`] ?? '',
    src_iface: r[`${root}.${id}.src_iface`] ?? 'wan',
    src_dport: r[`${root}.${id}.src_dport`] ?? '',
    dest_ip: r[`${root}.${id}.dest_ip`] ?? '',
    dest_port: r[`${root}.${id}.dest_port`] ?? '',
    reflection: r[`${root}.${id}.reflection`] ?? '1',
    time_schedule: r[`${root}.${id}.time_schedule`] ?? '',
    src_dip: r[`${root}.${id}.src_dip`] ?? '',
    extra: r[`${root}.${id}.extra`] ?? '',
  }
}

/** Build the core payload (exact type = PortForwardEditPageResult) */
function buildCorePayload(
  id: string,
  v: FormValues,
): PortForwardEditPageResult {
  return {
    [`${root}.${id}.__enabled`]: v.__enabled,
    [`${root}.${id}.name`]: v.name,
    [`${root}.${id}.proto`]: v.proto,
    // POTENTIAL ERROR: server if [] instead of ''
    [`${root}.${id}.src_mac`]: v.src_mac,
    [`${root}.${id}.src_ip`]: v.src_ip,
    [`${root}.${id}.src_port`]: v.src_port,
    [`${root}.${id}.src_iface`]: v.src_iface,
    [`${root}.${id}.src_dport`]: v.src_dport,
    [`${root}.${id}.dest_ip`]: v.dest_ip,
    [`${root}.${id}.dest_port`]: v.dest_port,
    [`${root}.${id}.reflection`]: v.reflection,
    [`${root}.${id}.time_schedule`]: v.time_schedule,
    [`${root}.${id}.src_dip`]: v.src_dip,
    [`${root}.${id}.extra`]: v.extra,
  }
}

export const PortForwardEditDialog: React.FC<DialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.portForwardEdit,
  )
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}

  const { sendWsSetMessage } = useSendWsMessage()

  // Options
  const protoList = optionsConverter(suggest, `${root}.${id}.proto`)
  const macList = optionsConverter(suggest, `${root}.${id}.src_mac`)
  const srcIpList = optionsConverter(suggest, `${root}.${id}.src_ip`)
  const extIfaceList = optionsConverter(options, `${root}.${id}.src_iface`)
  const scheduleList = optionsConverter(options, `${root}.${id}.time_schedule`)

  const formik = useFormik<FormValues>({
    initialValues: buildInitialValues(id, data?.result ?? {}),
    enableReinitialize: true,
    validationSchema: modalValidationSchema,
    onSubmit: async (values) => {
      const core = buildCorePayload(id, values) // typed payload
      const payload: SetPortForwardEditPageRequest = {
        'cbi.submit': '1',
        ...core,
        // write-only extras (outside PortForwardEditPageResult)
        [`${root}.${id}.src`]: 'wan',
        [`${root}.${id}.dest`]: 'lan',
      }
      await sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_FORWARD_EDIT_PAGE,
        payload,
        id,
      )
      await sleep(400)
      onClose?.()
    },
  })

  const loading = !data

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant='subtitle2' gutterBottom>
          This page allows you to change advanced properties of the port
          forwarding entry. In most cases, there is no need to modify those
          settings.
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Select
              label='Rule is enabled'
              options={booleanList}
              {...formikField(formik, '__enabled')}
            />

            <TextField label='Name' {...formikField(formik, 'name')} />

            <Select
              label='Protocol'
              options={protoList}
              {...formikField(formik, 'proto')}
            />

            <SelectWithCustom
              triggerValue='-- custom --'
              label='Source MAC address'
              options={macList}
              {...formikField(formik, 'src_mac')}
            />

            <Select
              label='Source IP address'
              options={srcIpList}
              {...formikField(formik, 'src_ip')}
            />

            <TextField
              label='Source port'
              {...formikField(formik, 'src_port')}
            />

            <Select
              label='External interface'
              options={extIfaceList}
              {...formikField(formik, 'src_iface')}
            />

            <TextField
              label='External port'
              {...formikField(formik, 'src_dport')}
            />

            <TextField
              label='Internal IP address'
              {...formikField(formik, 'dest_ip')}
            />

            <TextField
              label='Internal port'
              {...formikField(formik, 'dest_port')}
            />

            <Checkbox
              label='Enable NAT Loopback'
              {...formikField(formik, 'reflection')}
            />

            <Select
              label='Schedule'
              options={scheduleList}
              {...formikField(formik, 'time_schedule')}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          icon='confirm'
          text='confirm'
          onClick={() => formik.submitForm()}
          disabled={formik.isSubmitting || loading}
        />
        <Button
          icon='cancel'
          text='cancel'
          color='error'
          onClick={onClose}
          disabled={formik.isSubmitting}
        />
      </DialogActions>
    </Dialog>
  )
}
