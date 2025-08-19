import { Card, Stack } from '@mui/material'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import { TextField, Select } from 'components/fields'
import { dosPreventionValidationSchema } from './validationSchema'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, StringStringType } from 'types'
import { selectProps } from 'utils/formik'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type PayloadType = {
  'cbid.firewall.dos.tcp_enabled': string
  'cbid.firewall.dos.tcp_burst': string
  'cbid.firewall.dos.tcp_rate': string
  'cbid.firewall.dos.udp_enabled': string
  'cbid.firewall.dos.udp_burst': string
  'cbid.firewall.dos.udp_rate': string
  'cbid.firewall.dos.icmp_enabled': string
  'cbid.firewall.dos.icmp_burst': string
  'cbid.firewall.dos.icmp_rate': string
}

export const Form = ({ result }: { result: StringStringType }) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const rootId = 'cbid.firewall.dos'
  const formik = useFormik<FormikValuesType>({
    initialValues: {
      tcp_enabled: result[`${rootId}.tcp_enabled`] ?? '0',
      tcp_rate:
        result[`${rootId}.tcp_rate`] != null
          ? Number(result[`${rootId}.tcp_rate`])
          : 25,
      tcp_burst:
        result[`${rootId}.tcp_burst`] != null
          ? Number(result[`${rootId}.tcp_burst`])
          : 50,
      udp_enabled: result[`${rootId}.udp_enabled`] ?? '0',
      udp_rate:
        result[`${rootId}.udp_rate`] != null
          ? Number(result[`${rootId}.udp_rate`])
          : 25,
      udp_burst:
        result[`${rootId}.udp_burst`] != null
          ? Number(result[`${rootId}.udp_burst`])
          : 50,
      icmp_enabled: result[`${rootId}.icmp_enabled`] ?? '0',
      icmp_rate:
        result[`${rootId}.icmp_rate`] != null
          ? Number(result[`${rootId}.icmp_rate`])
          : 25,
      icmp_burst:
        result[`${rootId}.icmp_burst`] != null
          ? Number(result[`${rootId}.icmp_burst`])
          : 50,
    },
    enableReinitialize: true,
    validationSchema: dosPreventionValidationSchema,
    onSubmit: (values) => {
      const payload: PayloadType = {
        [`${rootId}.tcp_enabled`]: String(values.tcp_enabled),
        [`${rootId}.tcp_burst`]: String(values.tcp_burst),
        [`${rootId}.tcp_rate`]: String(values.tcp_rate),
        [`${rootId}.udp_enabled`]: String(values.udp_enabled),
        [`${rootId}.udp_burst`]: String(values.udp_burst),
        [`${rootId}.udp_rate`]: String(values.udp_rate),
        [`${rootId}.icmp_enabled`]: String(values.icmp_enabled),
        [`${rootId}.icmp_burst`]: String(values.icmp_burst),
        [`${rootId}.icmp_rate`]: String(values.icmp_rate),
      }
      sendWsSetMessage(
        BGW_EVENT_ACTIONS.FIREWALL_SET_DOS_PREVENTION_PAGE,
        payload,
      )
    },
  })

  return (
    <>
      <Card>
        {/* TCP SYN Flood Prevention */}
        <CardHeader title='TCP SYN Flood Prevention' />
        <StyledCardContent>
          <Select
            {...selectProps('tcp_enabled', 'Enable', booleanList, formik)}
          />
          {formik.values.tcp_enabled === '1' && (
            <>
              <TextField
                {...formik.getFieldProps('tcp_rate')}
                label='Rate (times per second):'
                type='number'
              />
              <TextField
                {...formik.getFieldProps('tcp_burst')}
                label='Burst:'
                type='number'
              />
            </>
          )}
        </StyledCardContent>

        {/* UDP Flood Prevention */}
        <CardHeader title='UDP Flood Prevention' />
        <StyledCardContent>
          <Select
            {...selectProps('udp_enabled', 'Enable', booleanList, formik)}
          />
          {formik.values.udp_enabled === '1' && (
            <>
              <TextField
                {...formik.getFieldProps('udp_rate')}
                label='Rate (times per second):'
                type='number'
              />
              <TextField
                {...formik.getFieldProps('udp_burst')}
                label='Burst:'
                type='number'
              />
            </>
          )}
        </StyledCardContent>

        {/* ICMP Flood Prevention */}
        <CardHeader title='ICMP Flood Prevention' />
        <StyledCardContent>
          <Select
            {...selectProps('icmp_enabled', 'Enable', booleanList, formik)}
          />
          {formik.values.icmp_enabled === '1' && (
            <>
              <TextField
                {...formik.getFieldProps('icmp_rate')}
                label='Rate (times per second):'
                type='number'
              />
              <TextField
                {...formik.getFieldProps('icmp_burst')}
                label='Burst:'
                type='number'
              />
            </>
          )}
        </StyledCardContent>
      </Card>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
