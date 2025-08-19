import { useEffect } from 'react'
import { PageHeader } from 'components/PageHeader'
import { CardHeader } from 'components/extends/CardHeader'
import { Box, Card, InputLabel, LinearProgress, Stack } from '@mui/material'
import { Checkbox, TextField, MultiCheckbox } from 'components/fields'
import { checkboxProps, textfieldProps } from 'utils/formik'
import { useFormik } from 'formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { validationSchema } from './validationSchema'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { resetAccessManagement } from 'reducers/xpb510/administrator/accessManagement'

type PayloadType = {
  'cbid.uhttpd.main.lo_iface_en': string
  'cbid.uhttpd.main.lo_iface'?: object[]
  'cbid.uhttpd.main.lo_http_en': string
  'cbid.uhttpd.main.lo_http_port': string
  'cbid.uhttpd.main.lo_https_en': string
  'cbid.uhttpd.main.lo_https_port': string
  'cbid.uhttpd.main.lo_telnet_en': string
  'cbid.uhttpd.main.lo_telnet_port': string
  'cbid.uhttpd.main.lo_ssh_en': string
  'cbid.uhttpd.main.lo_ssh_port': string
  'cbid.uhttpd.main.lo_ssh_pa': string
  'cbid.uhttpd.main.re_iface_en': string
  'cbid.uhttpd.main.re_iface': object[]
  'cbid.uhttpd.main.re_http_en': string
  'cbid.uhttpd.main.re_http_port': string
  'cbid.uhttpd.main.re_https_en': string
  'cbid.uhttpd.main.re_https_port': string
}

export const AccessManagement = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.administrator.accessManagement,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}

  const remoteAllowedInterfacesOptions = optionsConverter(
    options,
    `cbid.uhttpd.main.re_iface`,
  )

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      lo_iface_en: strNumToBool(result[`cbid.uhttpd.main.lo_iface_en`] ?? '1'),
      lo_iface: result[`cbid.uhttpd.main.lo_iface`] ?? [],
      lo_http_en: strNumToBool(result[`cbid.uhttpd.main.lo_http_en`] ?? '1'),
      lo_http_port: Number(result[`cbid.uhttpd.main.lo_http_port`] ?? '80'),
      lo_https_en: strNumToBool(result[`cbid.uhttpd.main.lo_https_en`] ?? '1'),
      lo_https_port: Number(result[`cbid.uhttpd.main.lo_https_port`] ?? '443'),
      lo_telnet_en: strNumToBool(
        result[`cbid.uhttpd.main.lo_telnet_en`] ?? '0',
      ),
      lo_telnet_port: Number(result[`cbid.uhttpd.main.lo_telnet_port`] ?? '23'),
      lo_ssh_en: strNumToBool(result[`cbid.uhttpd.main.lo_ssh_en`] ?? '0'),
      lo_ssh_port: Number(result[`cbid.uhttpd.main.lo_ssh_port`] ?? '22'),
      lo_ssh_pa: strNumToBool(result[`cbid.uhttpd.main.lo_ssh_pa`] ?? '1'),

      re_iface_en: strNumToBool(result[`cbid.uhttpd.main.re_iface_en`] ?? '0'),
      re_iface: result[`cbid.uhttpd.main.re_iface`] ?? [],
      re_http_en: strNumToBool(result[`cbid.uhttpd.main.re_http_en`] ?? '0'),
      re_http_port: Number(result[`cbid.uhttpd.main.re_http_port`] ?? '8080'),
      re_https_en: strNumToBool(result[`cbid.uhttpd.main.re_https_en`] ?? '0'),
      re_https_port: Number(result[`cbid.uhttpd.main.re_https_port`] ?? '8443'),
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

  const payload: PayloadType = {
    [`cbid.uhttpd.main.lo_iface_en`]: boolToStrNum(!!formik.values.lo_iface_en),
    [`cbid.uhttpd.main.lo_iface`]: [],
    [`cbid.uhttpd.main.lo_http_en`]: boolToStrNum(!!formik.values.lo_http_en),
    [`cbid.uhttpd.main.lo_http_port`]: String(formik.values.lo_http_port),
    [`cbid.uhttpd.main.lo_https_en`]: boolToStrNum(!!formik.values.lo_https_en),
    [`cbid.uhttpd.main.lo_https_port`]: String(formik.values.lo_https_port),
    [`cbid.uhttpd.main.lo_telnet_en`]: boolToStrNum(
      !!formik.values.lo_telnet_en,
    ),
    [`cbid.uhttpd.main.lo_telnet_port`]: String(formik.values.lo_telnet_port),
    [`cbid.uhttpd.main.lo_ssh_en`]: boolToStrNum(!!formik.values.lo_ssh_en),
    [`cbid.uhttpd.main.lo_ssh_port`]: String(formik.values.lo_ssh_port),
    [`cbid.uhttpd.main.lo_ssh_pa`]: boolToStrNum(!!formik.values.lo_ssh_pa),
    [`cbid.uhttpd.main.re_iface_en`]: boolToStrNum(!!formik.values.re_iface_en),
    [`cbid.uhttpd.main.re_iface`]: formik.values.re_iface as object[],
    [`cbid.uhttpd.main.re_http_en`]: boolToStrNum(!!formik.values.re_http_en),
    [`cbid.uhttpd.main.re_http_port`]: String(formik.values.re_http_port),
    [`cbid.uhttpd.main.re_https_en`]: boolToStrNum(!!formik.values.re_https_en),
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

  const handleRemoteIfaceClick = (value: string[]) => {
    formik.setFieldValue('re_iface', value)
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
                  {...checkboxProps(
                    'lo_iface_en',
                    'Limit access by interface',
                    formik,
                  )}
                />
                {formik.values.lo_iface_en && ( // this field is not fixed
                  <MultiCheckbox
                    disabled
                    label='Allowed interfaces'
                    value={[]}
                    onClick={() => {}}
                    options={[{ label: 'LAN', value: 'wann', checked: true }]}
                  />
                )}
                <Checkbox
                  {...checkboxProps('lo_http_en', 'Enable HTTP', formik)}
                />
                {formik.values.lo_http_en && (
                  <TextField
                    type='number'
                    {...textfieldProps('lo_http_port', 'Port', formik)}
                  />
                )}
                <Checkbox
                  {...checkboxProps('lo_https_en', 'Enable HTTPS', formik)}
                />
                {formik.values.lo_https_en && (
                  <TextField
                    type='number'
                    {...textfieldProps('lo_https_port', 'Port', formik)}
                  />
                )}
                <Checkbox
                  {...checkboxProps('lo_telnet_en', 'Enable Telnet', formik)}
                />
                {formik.values.lo_telnet_en && (
                  <TextField
                    type='number'
                    {...textfieldProps('lo_telnet_port', 'Port', formik)}
                  />
                )}
                <Checkbox
                  {...checkboxProps('lo_ssh_en', 'Enable SSH', formik)}
                />
                {formik.values.lo_ssh_en && (
                  <>
                    <TextField
                      type='number'
                      {...textfieldProps('lo_ssh_port', 'Port', formik)}
                    />
                    <Checkbox
                      {...checkboxProps(
                        'lo_ssh_pa',
                        'Password authentication',
                        formik,
                      )}
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
                  {...checkboxProps(
                    're_iface_en',
                    'Limit access by interface',
                    formik,
                  )}
                />
                {formik.values.re_iface_en && (
                  <MultiCheckbox
                    label='Allowed interfaces'
                    value={formik.values.re_iface as string[]}
                    onClick={handleRemoteIfaceClick}
                    options={remoteAllowedInterfacesOptions}
                  />
                )}
                <Checkbox
                  {...checkboxProps('re_http_en', 'Enable HTTP', formik)}
                />
                {formik.values.re_http_en && (
                  <TextField
                    type='number'
                    {...textfieldProps('re_http_port', 'Port', formik)}
                  />
                )}
                <Checkbox
                  {...checkboxProps('re_https_en', 'Enable HTTPS', formik)}
                />
                {formik.values.re_https_en && (
                  <TextField
                    type='number'
                    {...textfieldProps('re_https_port', 'Port', formik)}
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
