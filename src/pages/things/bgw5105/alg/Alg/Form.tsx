import { Card, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CardHeader } from 'components/extends/CardHeader'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { Select } from 'components/fields'
import { optionsConverter } from 'utils/optionsConverter'
import { selectProps } from 'utils/formik'
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type FormTypes = {
  result: StringStringType
  options: OptionsOrSuggestType
}

type PayloadType = {
  'cbid.alg.alg.ftp': string
  'cbid.alg.alg.tftp': string
  'cbid.alg.alg.snmp': string
  'cbid.alg.alg.sip': string
  'cbid.alg.alg.rtsp': string
  'cbid.alg.alg.irc': string
  'cbid.alg.alg.h323': string
  'cbid.alg.alg.pptp_pth': string
  'cbid.alg.alg.l2tp_pth': string
  'cbid.alg.alg.ipsec_pth': string
  'cbid.alg.alg.pppoe_relay': string
}

const checkList = [
  { name: 'ftp', label: 'File Transfer Protocol (FTP)' },
  { name: 'tftp', label: 'Trivial File Transfer Protocol (TFTP)' },
  { name: 'snmp', label: 'Simple Network Management Protocol (SNMP)' },
  { name: 'sip', label: 'Session Initiation Protocol (SIP)' },
  { name: 'rtsp', label: 'Real Time Streaming Protocol (RTSP)' },
  { name: 'irc', label: 'Internet Relay Chat (IRC)' },
  { name: 'h323', label: 'H.323 Protocol' },
  { name: 'pptp_pth', label: 'PPTP Passthrough' },
  { name: 'l2tp_pth', label: 'L2TP Passthrough' },
  { name: 'ipsec_pth', label: 'IPSec Passthrough' },
]

export const Form = ({ result, options }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const relayList = optionsConverter(options, 'cbid.alg.alg.pppoe_relay')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      ftp: result['cbid.alg.alg.ftp'] ?? '1',
      tftp: result['cbid.alg.alg.tftp'] ?? '1',
      snmp: result['cbid.alg.alg.snmp'] ?? '1',
      sip: result['cbid.alg.alg.sip'] ?? '1',
      rtsp: result['cbid.alg.alg.rtsp'] ?? '1',
      irc: result['cbid.alg.alg.irc'] ?? '1',
      h323: result['cbid.alg.alg.h323'] ?? '1',
      pptp_pth: result['cbid.alg.alg.pptp_pth'] ?? '1',
      l2tp_pth: result['cbid.alg.alg.l2tp_pth'] ?? '1',
      ipsec_pth: result['cbid.alg.alg.ipsec_pth'] ?? '1',
      pppoe_relay: result['cbid.alg.alg.pppoe_relay'] ?? '0',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {
      const payload: PayloadType = {
        'cbid.alg.alg.ftp': String(values.ftp),
        'cbid.alg.alg.tftp': String(values.tftp),
        'cbid.alg.alg.snmp': String(values.snmp),
        'cbid.alg.alg.sip': String(values.sip),
        'cbid.alg.alg.rtsp': String(values.rtsp),
        'cbid.alg.alg.irc': String(values.irc),
        'cbid.alg.alg.h323': String(values.h323),
        'cbid.alg.alg.pptp_pth': String(values.pptp_pth),
        'cbid.alg.alg.l2tp_pth': String(values.l2tp_pth),
        'cbid.alg.alg.ipsec_pth': String(values.ipsec_pth),
        'cbid.alg.alg.pppoe_relay': String(values.pppoe_relay),
      }
      sendWsSetMessage(SERVER_ACTIONS.ALG_SET_ALG_PAGE, payload)
    },
  })

  return (
    <>
      <Card>
        <CardHeader title='ALG' />
        <StyledCardContent>
          {checkList.map((item, index) => (
            <Select
              key={index}
              {...selectProps(item.name, item.label, booleanList, formik)}
            />
          ))}
          <Select
            {...selectProps(
              'pppoe_relay',
              'PPPoE Relay Protocal:',
              relayList,
              formik,
            )}
          />
        </StyledCardContent>
      </Card>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
