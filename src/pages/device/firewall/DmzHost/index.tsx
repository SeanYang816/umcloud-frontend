import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CardHeader } from 'components/extends/CardHeader'
import { DefaultRootStateProps, FormikValuesType } from 'types'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { TextField, Select } from 'components/fields'
import { PageHeader } from 'components/PageHeader'
import { useStyles } from 'components/fields/index.style'
import { booleanList } from 'config'
import { selectProps } from 'utils/formik'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type PayloadType = {
  'cbid.dmz.dmz.enable': string
  'cbid.dmz.dmz.dmz_ip': string
}

export const DmzHost = () => {
  const data = useSelector(
    (state: DefaultRootStateProps) => state.firewall.dmzHost,
  )
  const result = data?.result ?? {}

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enable: result['cbid.dmz.dmz.enable'] ?? '0',
      dmz_ip: result['cbid.dmz.dmz.dmz_ip'] ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      enable: Yup.string(),
      dmz_ip: Yup.string(),
    }),
    onSubmit: (values) => {
      const payload: PayloadType = {
        'cbid.dmz.dmz.enable': String(values.enable),
        'cbid.dmz.dmz.dmz_ip': String(values.dmz_ip),
      }
      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_SET_DMZ_HOST_PAGE, payload)
    },
  })

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_DMZ_HOST_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='DMZ Host'
        subtitle='This section allows you to expose a specific computer or device on your network to the Internet and allow all inbound services to be accessible through the WAN interfaces IP addresses. The feature is also known as exposed host or DMZ host (demilitarized zone).'
      />
      <Card>
        <CardHeader title='DMZ Host' />

        <StyledCardContent>
          <Select {...selectProps('enable', 'Enable', booleanList, formik)} />
          <TextField
            {...formik.getFieldProps('dmz_ip')}
            label='DMZ Host IP Address:'
            placeholder='0.0.0.0'
          />
        </StyledCardContent>
      </Card>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
