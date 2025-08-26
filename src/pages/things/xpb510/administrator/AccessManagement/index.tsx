import { useEffect } from 'react'
import { PageHeader } from 'components/PageHeader'
import { CardHeader } from 'components/extends/CardHeader'
import { Box, Card, InputLabel, LinearProgress, Stack } from '@mui/material'
import { formikArrayField, formikField } from 'utils/formik'
import { useFormik } from 'formik'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { RootStateProps } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { validationSchema } from './validationSchema'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { resetAccessManagement } from 'reducers/xpb510/administrator/accessManagement'
import {
  GetAccessManagementPageResponse,
  SetAccessManagementPageRequest,
} from 'types/xpb510/administrator/accessManagement'
import { Checkbox, TextField } from 'components/formik'
import { MultiCheckbox } from 'components/formik/MultiCheckbox'

type FormValues = {
  lo_iface_en: string
  lo_iface?: string[]
  lo_http_en: string
  lo_http_port: string
  lo_https_en: string
  lo_https_port: string
  lo_telnet_en: string
  lo_telnet_port: string
  lo_ssh_en: string
  lo_ssh_port: string
  lo_ssh_pa: string
  re_iface_en: string
  re_iface: string[]
  re_http_en: string
  re_http_port: string
  re_https_en: string
  re_https_port: string
}

export const AccessManagement = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.administrator.accessManagement,
  )
  const result =
    data?.result ?? ({} as GetAccessManagementPageResponse['result'])
  const options = data?.options ?? {}

  const remoteAllowedInterfacesOptions = optionsConverter(
    options,
    `cbid.uhttpd.main.re_iface`,
  )

  const formik = useFormik<FormValues>({
    initialValues: {
      lo_iface_en: result[`cbid.uhttpd.main.lo_iface_en`],
      lo_iface: result[`cbid.uhttpd.main.lo_iface`],
      lo_http_en: result[`cbid.uhttpd.main.lo_http_en`],
      lo_http_port: result[`cbid.uhttpd.main.lo_http_port`],
      lo_https_en: result[`cbid.uhttpd.main.lo_https_en`],
      lo_https_port: result[`cbid.uhttpd.main.lo_https_port`],
      lo_telnet_en: result[`cbid.uhttpd.main.lo_telnet_en`],
      lo_telnet_port: result[`cbid.uhttpd.main.lo_telnet_port`],
      lo_ssh_en: result[`cbid.uhttpd.main.lo_ssh_en`],
      lo_ssh_port: result[`cbid.uhttpd.main.lo_ssh_port`],
      lo_ssh_pa: result[`cbid.uhttpd.main.lo_ssh_pa`],

      re_iface_en: result[`cbid.uhttpd.main.re_iface_en`],
      re_iface: result[`cbid.uhttpd.main.re_iface`],
      re_http_en: result[`cbid.uhttpd.main.re_http_en`],
      re_http_port: result[`cbid.uhttpd.main.re_http_port`],
      re_https_en: result[`cbid.uhttpd.main.re_https_en`],
      re_https_port: result[`cbid.uhttpd.main.re_https_port`],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE,
        payload,
      )
    },
  })

  const payload: SetAccessManagementPageRequest = {
    [`cbi.submit`]: 'Submit',
    [`cbid.uhttpd.main.lo_iface_en`]: formik.values.lo_iface_en,
    [`cbid.uhttpd.main.lo_iface`]: [],
    [`cbid.uhttpd.main.lo_http_en`]: formik.values.lo_http_en,
    [`cbid.uhttpd.main.lo_http_port`]: String(formik.values.lo_http_port),
    [`cbid.uhttpd.main.lo_https_en`]: formik.values.lo_https_en,
    [`cbid.uhttpd.main.lo_https_port`]: String(formik.values.lo_https_port),
    [`cbid.uhttpd.main.lo_telnet_en`]: formik.values.lo_telnet_en,
    [`cbid.uhttpd.main.lo_telnet_port`]: String(formik.values.lo_telnet_port),
    [`cbid.uhttpd.main.lo_ssh_en`]: formik.values.lo_ssh_en,
    [`cbid.uhttpd.main.lo_ssh_port`]: String(formik.values.lo_ssh_port),
    [`cbid.uhttpd.main.lo_ssh_pa`]: formik.values.lo_ssh_pa,
    [`cbid.uhttpd.main.re_iface_en`]: formik.values.re_iface_en,
    [`cbid.uhttpd.main.re_iface`]: formik.values.re_iface,
    [`cbid.uhttpd.main.re_http_en`]: formik.values.re_http_en,
    [`cbid.uhttpd.main.re_http_port`]: String(formik.values.re_http_port),
    [`cbid.uhttpd.main.re_https_en`]: formik.values.re_https_en,
    [`cbid.uhttpd.main.re_https_port`]: String(formik.values.re_https_port),
  }

  const handleDownloadPrivateKey = () => {
    sendWsSetMessage(
      XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_DOWNLOAD_SSH_PRIVATE_KEY,
      {
        [`cbid.uhttpd.main.lo_ssh_keys_dl`]: 'Download Private Key',
        ...payload,
      },
    )
  }

  const handleRegeneratePrivateKey = () => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS,
    )
  }

  useEffect(() => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE,
    )

    return () => {
      dispatch(resetAccessManagement())
    }
  }, [dispatch, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Access Management'
        subtitle='This section allows you to configure your local and remote access management.'
      />

      {!data ? (
        <LinearProgress />
      ) : (
        <>
          <Stack gap={2}>
            <Card>
              <CardHeader title='Local Access Management' />
              <StyledCardContent>
                <Checkbox
                  label='Limit access by interface'
                  {...formikField(formik, 'lo_iface_en')}
                />
                {formik.values.lo_iface_en && ( // this field is not fixed
                  <MultiCheckbox
                    disabled
                    label='Allowed interfaces'
                    options={[{ label: 'LAN', value: 'lan' }]}
                    {...formikArrayField(formik, 'lo_iface')}
                  />
                )}
                <Checkbox
                  label='Enable HTTP'
                  {...formikField(formik, 'lo_http_en')}
                />
                {formik.values.lo_http_en && (
                  <TextField
                    type='number'
                    label='Port'
                    {...formikField(formik, 'lo_http_port')}
                  />
                )}
                <Checkbox
                  label='Enable HTTPS'
                  {...formikField(formik, 'lo_https_en')}
                />
                {formik.values.lo_https_en && (
                  <TextField
                    type='number'
                    label='Port'
                    {...formikField(formik, 'lo_https_port')}
                  />
                )}
                <Checkbox
                  label='Enable Telnet'
                  {...formikField(formik, 'lo_telnet_en')}
                />
                {formik.values.lo_telnet_en && (
                  <TextField
                    type='number'
                    label='Port'
                    {...formikField(formik, 'lo_telnet_port')}
                  />
                )}
                <Checkbox
                  label='Enable SSH'
                  {...formikField(formik, 'lo_ssh_en')}
                />
                {formik.values.lo_ssh_en && (
                  <>
                    <TextField
                      type='number'
                      label='Port'
                      {...formikField(formik, 'lo_ssh_port')}
                    />
                    <Checkbox
                      label='Password authentication'
                      {...formikField(formik, 'lo_ssh_pa')}
                    />
                    <Stack spacing={1}>
                      <Box>
                        <InputLabel>SSH Keys</InputLabel>
                        <Button
                          icon='download'
                          text='download private key'
                          onClick={handleDownloadPrivateKey}
                        />
                      </Box>
                      <Box>
                        <InputLabel>Re-generate SSH Keys</InputLabel>
                        <Button
                          icon='renew'
                          color='warning'
                          text='generate new key'
                          onClick={handleRegeneratePrivateKey}
                        />
                      </Box>
                    </Stack>
                  </>
                )}
              </StyledCardContent>
            </Card>

            <Card>
              <CardHeader title='Remote Access Management' />
              <StyledCardContent>
                <Checkbox
                  label='Limit access by interface'
                  {...formikField(formik, 're_iface_en')}
                />
                {formik.values.re_iface_en && (
                  <MultiCheckbox
                    label='Allowed interfaces'
                    options={remoteAllowedInterfacesOptions}
                    {...formikArrayField(formik, 're_iface')}
                  />
                )}
                <Checkbox
                  label='Enable HTTP'
                  {...formikField(formik, 're_http_en')}
                />
                {formik.values.re_http_en && (
                  <TextField
                    type='number'
                    label='Port'
                    {...formikField(formik, 're_http_port')}
                  />
                )}
                <Checkbox
                  label='Enable HTTPS'
                  {...formikField(formik, 're_https_en')}
                />
                {formik.values.re_https_en && (
                  <TextField
                    type='number'
                    label='Port'
                    {...formikField(formik, 're_https_port')}
                  />
                )}
              </StyledCardContent>
            </Card>
          </Stack>

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
