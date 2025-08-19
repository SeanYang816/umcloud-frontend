import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, LinearProgress, Stack } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CardHeader } from 'components/extends/CardHeader'
import { RootStateProps, FormikValuesType } from 'types'
import { XPB_EVENT_ACTIONS } from 'constant'
import { selectProps } from 'utils/formik'
import { PageHeader } from 'components/PageHeader'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { booleanList } from 'config'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select } from 'components/fields'
import { resetFirewallState } from 'reducers/xpb510/network/firewall'

type PayloadType = {
  'cbid.firewall.wan_ping.enabled': string
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

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enableWanPing: data?.result['cbid.firewall.wan_ping.enabled'] ?? '0',
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
              {...selectProps('enableWanPing', 'Enable', booleanList, formik)}
            />
          </StyledCardContent>
        </Card>
      )}

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
