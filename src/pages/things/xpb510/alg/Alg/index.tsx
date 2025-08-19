import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { FormikValuesType, RootStateProps } from 'types'
import { PageHeader } from 'components/PageHeader'
import { resetAlg } from 'reducers/xpb510/network/alg'
import { Card, LinearProgress, Stack } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select } from 'components/fields'
import { selectProps } from 'utils/formik'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GetAlgPageResult } from 'types/xpb510/network/alg'

const checkList = [
  { name: 'ftp', label: 'File Transfer Protocol (FTP)' },
  { name: 'tftp', label: 'Trivial File Transfer Protocol (TFTP)' },
  { name: 'snmp', label: 'Simple Network Management Protocol (SNMP)' },
  { name: 'sip', label: 'Session Initiation Protocol (SIP)' },
  { name: 'rtsp', label: 'Real Time Streaming Protocol (RTSP)' },
  { name: 'irc', label: 'Internet Relay Chat (IRC)' },
  { name: 'h323', label: 'H.323 Protocol' },
]
export const Alg = () => {
  const dispath = useDispatch()
  const data = useSelector((state: RootStateProps) => state.xpb510.network.alg)

  const result = data?.result ?? ({} as GetAlgPageResult)

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      ftp: result['cbid.alg.alg.ftp'] ?? '1',
      tftp: result['cbid.alg.alg.tftp'] ?? '1',
      snmp: result['cbid.alg.alg.snmp'] ?? '1',
      sip: result['cbid.alg.alg.sip'] ?? '1',
      rtsp: result['cbid.alg.alg.rtsp'] ?? '1',
      irc: result['cbid.alg.alg.irc'] ?? '1',
      h323: result['cbid.alg.alg.h323'] ?? '1',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({}),
    onSubmit: (values) => {
      const payload: GetAlgPageResult = {
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
                  {...selectProps(item.name, item.label, booleanList, formik)}
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
