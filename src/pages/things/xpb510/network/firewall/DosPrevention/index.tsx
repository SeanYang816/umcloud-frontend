import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { XPB_EVENT_ACTIONS } from 'constant'
import { FormikValuesType, RootStateProps } from 'types'
import { PageHeader } from 'components/PageHeader'
import { LinearProgress } from '@mui/material'
import { resetFirewallState } from 'reducers/xpb510/network/firewall'
import { useFormik } from 'formik'
import { dosPreventionValidationSchema } from './validationSchema'
import { Card, Stack } from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import { TextField, Select } from 'components/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { formikField } from 'utils/formik'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import {
  DosPreventionPageResult,
  SetDoSPreventionEditPageRequest,
} from 'types/xpb510/network/firewall'

export const DosPrevention = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.dosPrevention,
  )
  const result = data?.result ?? ({} as DosPreventionPageResult)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      tcp_enabled: result[`cbid.firewall.dos.tcp_enabled`],
      tcp_rate: Number(result[`cbid.firewall.dos.tcp_rate`]),
      tcp_burst: Number(result[`cbid.firewall.dos.tcp_burst`]),
      udp_enabled: result[`cbid.firewall.dos.udp_enabled`],
      udp_rate: Number(result[`cbid.firewall.dos.udp_rate`]),
      udp_burst: Number(result[`cbid.firewall.dos.udp_burst`]),
      icmp_enabled: result[`cbid.firewall.dos.icmp_enabled`],
      icmp_rate: Number(result[`cbid.firewall.dos.icmp_rate`]),
      icmp_burst: Number(result[`cbid.firewall.dos.icmp_burst`]),
    },
    enableReinitialize: true,
    validationSchema: dosPreventionValidationSchema,
    onSubmit: (values) => {
      const payload: SetDoSPreventionEditPageRequest = {
        [`cbi.submit`]: '1',
        [`cbid.firewall.dos.tcp_enabled`]: String(values.tcp_enabled),
        [`cbid.firewall.dos.tcp_burst`]: String(values.tcp_burst),
        [`cbid.firewall.dos.tcp_rate`]: String(values.tcp_rate),
        [`cbid.firewall.dos.udp_enabled`]: String(values.udp_enabled),
        [`cbid.firewall.dos.udp_burst`]: String(values.udp_burst),
        [`cbid.firewall.dos.udp_rate`]: String(values.udp_rate),
        [`cbid.firewall.dos.icmp_enabled`]: String(values.icmp_enabled),
        [`cbid.firewall.dos.icmp_burst`]: String(values.icmp_burst),
        [`cbid.firewall.dos.icmp_rate`]: String(values.icmp_rate),
      }
      sendWsSetMessage(
        BGW_EVENT_ACTIONS.FIREWALL_SET_DOS_PREVENTION_PAGE,
        payload,
      )
    },
  })

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_DOS_PREVENTION_PAGE)

    return () => {
      dispatch(resetFirewallState())
    }
  }, [dispatch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='DoS Prevention'
        subtitle='This section allows you to enable Denial of Service (DoS) attack prevention which provides an additional safeguard to your network. Enabling DoS Prevention can help to prevent attacks such as SYN flood, ICMP flood, and furtive port scanning by unwanted intruders.'
      />
      {!data ? (
        <LinearProgress />
      ) : (
        <>
          <Card>
            {/* TCP SYN Flood Prevention */}
            <CardHeader title='TCP SYN Flood Prevention' />
            <StyledCardContent>
              <Select
                label='Enable'
                options={booleanList}
                {...formikField(formik, 'tcp_enabled')}
              />
              {formik.values.tcp_enabled === '1' && (
                <>
                  <TextField
                    type='number'
                    label='Rate (times per second)'
                    {...formikField(formik, 'tcp_rate')}
                  />
                  <TextField
                    type='number'
                    label='Burst'
                    {...formikField(formik, 'tcp_burst')}
                  />
                </>
              )}
            </StyledCardContent>

            {/* UDP Flood Prevention */}
            <CardHeader title='UDP Flood Prevention' />
            <StyledCardContent>
              <Select
                label='Enable'
                options={booleanList}
                {...formikField(formik, 'udp_enabled')}
              />
              {formik.values.udp_enabled === '1' && (
                <>
                  <TextField
                    {...formik.getFieldProps('udp_rate')}
                    label='Rate (times per second):'
                    type='number'
                  />
                  <TextField
                    type='number'
                    label='Burst'
                    {...formikField(formik, 'udp_burst')}
                  />
                </>
              )}
            </StyledCardContent>

            {/* ICMP Flood Prevention */}
            <CardHeader title='ICMP Flood Prevention' />
            <StyledCardContent>
              <Select
                label='Enable'
                options={booleanList}
                {...formikField(formik, 'icmp_enabled')}
              />
              {formik.values.icmp_enabled === '1' && (
                <>
                  <TextField
                    type='number'
                    label='Rate (times per second)'
                    {...formikField(formik, 'icmp_rate')}
                  />
                  <TextField
                    type='number'
                    label='Burst'
                    {...formikField(formik, 'icmp_burst')}
                  />
                </>
              )}
            </StyledCardContent>
          </Card>
          <Stack direction='row' ml='auto'>
            <Button
              icon='save'
              text='save'
              onClick={() => formik.handleSubmit()}
            />
          </Stack>
        </>
      )}
    </>
  )
}
