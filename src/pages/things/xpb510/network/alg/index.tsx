import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { RootStateProps } from 'types'
import { PageHeader } from 'components/PageHeader'
import { resetAlg } from 'reducers/xpb510/network/alg'
import { Card, LinearProgress, Stack } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select } from 'components/formik'
import { formikField } from 'utils/formik'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetAlgPageResult, SetAlgPageRequest } from 'types/xpb510/network/alg'

type FormValues = {
  ftp: string
  tftp: string
  snmp: string
  sip: string
  rtsp: string
  irc: string
  h323: string
}

type Name = keyof FormValues // "ftp" | "tftp" | ...

const checkList = [
  { name: 'ftp', label: 'File Transfer Protocol (FTP)' },
  { name: 'tftp', label: 'Trivial File Transfer Protocol (TFTP)' },
  { name: 'snmp', label: 'Simple Network Management Protocol (SNMP)' },
  { name: 'sip', label: 'Session Initiation Protocol (SIP)' },
  { name: 'rtsp', label: 'Real Time Streaming Protocol (RTSP)' },
  { name: 'irc', label: 'Internet Relay Chat (IRC)' },
  { name: 'h323', label: 'H.323 Protocol' },
] as const satisfies ReadonlyArray<{ name: Name; label: string }>

export const Alg = () => {
  const dispath = useDispatch()
  const data = useSelector((state: RootStateProps) => state.xpb510.network.alg)

  const result = data?.result ?? ({} as GetAlgPageResult)

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const formik = useFormik<FormValues>({
    initialValues: {
      ftp: result['cbid.alg.alg.ftp'],
      tftp: result['cbid.alg.alg.tftp'],
      snmp: result['cbid.alg.alg.snmp'],
      sip: result['cbid.alg.alg.sip'],
      rtsp: result['cbid.alg.alg.rtsp'],
      irc: result['cbid.alg.alg.irc'],
      h323: result['cbid.alg.alg.h323'],
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {
      const payload: SetAlgPageRequest = {
        'cbi.submit': '1',
        'cbid.alg.alg.ftp': String(values.ftp),
        'cbid.alg.alg.tftp': String(values.tftp),
        'cbid.alg.alg.snmp': String(values.snmp),
        'cbid.alg.alg.sip': String(values.sip),
        'cbid.alg.alg.rtsp': String(values.rtsp),
        'cbid.alg.alg.irc': String(values.irc),
        'cbid.alg.alg.h323': String(values.h323),
      }
      sendWsSetMessage(XPB_EVENT_ACTIONS.XPB_510_ALG_SET_ALG_PAGE, payload)
    },
  })

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_ALG_GET_ALG_PAGE)

    return () => {
      dispath(resetAlg())
    }
  }, [dispath, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='ALG'
        subtitle='This section allows you to enable or disable communications of the listed protocols/applications to pass through your router between your network and the Internet. These are special protocols/applications that are unable to natively pass through your router without the use of ALG (application layer gateway).'
      />

      {!data ? (
        <LinearProgress />
      ) : (
        <>
          <Card>
            <CardHeader title='ALG' />
            <StyledCardContent>
              {checkList.map((item, index) => (
                <Select
                  key={index}
                  label={item.label}
                  options={booleanList}
                  {...formikField(formik, item.name)}
                />
              ))}
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
