import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CardHeader } from 'components/extends/CardHeader'
import { RootStateProps, FormikValuesType } from 'types'
import { SERVER_ACTIONS } from 'constant'
import { selectProps } from 'utils/formik'
import { PageHeader } from 'components/PageHeader'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select } from 'components/fields'

type PayloadType = {
  'cbid.firewall.wan_ping.enabled': string
}

export const GeneralSettings = () => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.firewall.generalSettings,
  )
  const result = data?.result ?? {}
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_GENERAL_SETTINGS_PAGE)
  }, [sendWsGetMessage])

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enableWanPing: result['cbid.firewall.wan_ping.enabled'] ?? '0',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      enableWanPing: Yup.boolean(),
    }),
    onSubmit: () => {
      const payload: PayloadType = {
        'cbid.firewall.wan_ping.enabled': formik.values.enableWanPing,
      } as PayloadType
      sendWsSetMessage(
        SERVER_ACTIONS.FIREWALL_SET_GENERAL_SETTINGS_PAGE,
        payload,
      )
    },
  })

  return (
    <>
      <PageHeader title='WAN Ping Respond' />
      <Card>
        <CardHeader title='WAN Ping Respond' />
        <StyledCardContent>
          <Select
            {...selectProps('enableWanPing', 'Enable', booleanList, formik)}
          />
        </StyledCardContent>
      </Card>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
