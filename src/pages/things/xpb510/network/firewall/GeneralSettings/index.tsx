import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, LinearProgress, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CardHeader } from 'components/extends/CardHeader'
import { RootStateProps } from 'types'
import { XPB_EVENT_ACTIONS } from 'constant'
import { PageHeader } from 'components/PageHeader'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { resetFirewallState } from 'reducers/xpb510/network/firewall'
import { GetGeneralSettingsPageResult } from 'types/xpb510/network/firewall'
import { Select } from 'components/formik/Select'
import { formikField } from 'utils/formik'

const FIELD_KEYS = {
  wanPingEnabled: 'cbid.firewall.wan_ping.enabled',
} as const

type FormValues = {
  wanPingEnabled: string
}

export const GeneralSettings = () => {
  const dispatch = useDispatch()
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.firewall.generalSettings,
  )
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  useEffect(() => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_GENERAL_SETTINGS_PAGE,
    )

    return () => {
      dispatch(resetFirewallState())
    }
  }, [dispatch, sendWsGetMessage])

  const formik = useFormik<FormValues>({
    initialValues: {
      wanPingEnabled: data?.result?.[FIELD_KEYS.wanPingEnabled] ?? '0',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      wanPingEnabled: Yup.string().required(),
    }),
    onSubmit: (values) => {
      const payload: GetGeneralSettingsPageResult = {
        [FIELD_KEYS.wanPingEnabled]: values.wanPingEnabled,
      }

      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_GENERAL_SETTINGS_PAGE,
        payload,
      )
    },
  })

  return (
    <>
      <PageHeader title='WAN Ping Respond' />

      {!data ? (
        <LinearProgress />
      ) : (
        <Card>
          <CardHeader title='WAN Ping Respond' />
          <StyledCardContent>
            <Select
              label='Enable'
              options={booleanList}
              {...formikField(formik, 'wanPingEnabled')}
            />
          </StyledCardContent>
        </Card>
      )}

      <Stack direction='row' ml='auto'>
        <Button
          icon='save'
          text='save'
          disabled={formik.isSubmitting || !formik.dirty}
          onClick={() => formik.submitForm()}
        />
      </Stack>
    </>
  )
}
