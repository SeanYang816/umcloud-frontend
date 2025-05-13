import { useEffect } from 'react'
import { PageHeader } from 'components/PageHeader'
import { CardHeader } from 'components/extends/CardHeader'
import { Box, Card, CardContent, InputLabel, Stack } from '@mui/material'
import {
  Checkbox,
  TextField,
  MultiCheckbox,
  useStyles,
} from 'components/fields'
import { checkboxProps, textfieldProps } from 'utils/formik'
import { useFormik } from 'formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { SERVER_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { DefaultRootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { validationSchema } from './validationSchema'
import { Button } from 'components/extends/Button'

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
  const classes = useStyles()
  const rootId = 'cbid.uhttpd.main.'

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: DefaultRootStateProps) => state.administrator.accessManagement,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}

  const remoteAllowedInterfacesOptions = optionsConverter(
    options,
    `${rootId}re_iface`,
  )

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      lo_iface_en: strNumToBool(result[`${rootId}lo_iface_en`] ?? '1'),
      lo_iface: result[`${rootId}lo_iface`] ?? [],
      lo_http_en: strNumToBool(result[`${rootId}lo_http_en`] ?? '1'),
      lo_http_port: Number(result[`${rootId}lo_http_port`] ?? '80'),
      lo_https_en: strNumToBool(result[`${rootId}lo_https_en`] ?? '1'),
      lo_https_port: Number(result[`${rootId}lo_https_port`] ?? '443'),
      lo_telnet_en: strNumToBool(result[`${rootId}lo_telnet_en`] ?? '0'),
      lo_telnet_port: Number(result[`${rootId}lo_telnet_port`] ?? '23'),
      lo_ssh_en: strNumToBool(result[`${rootId}lo_ssh_en`] ?? '0'),
      lo_ssh_port: Number(result[`${rootId}lo_ssh_port`] ?? '22'),
      lo_ssh_pa: strNumToBool(result[`${rootId}lo_ssh_pa`] ?? '1'),

      re_iface_en: strNumToBool(result[`${rootId}re_iface_en`] ?? '0'),
      re_iface: result[`${rootId}re_iface`] ?? [],
      re_http_en: strNumToBool(result[`${rootId}re_http_en`] ?? '0'),
      re_http_port: Number(result[`${rootId}re_http_port`] ?? '8080'),
      re_https_en: strNumToBool(result[`${rootId}re_https_en`] ?? '0'),
      re_https_port: Number(result[`${rootId}re_https_port`] ?? '8443'),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: () => {
      sendWsSetMessage(
        SERVER_ACTIONS.ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE,
        payload,
      )
    },
  })

  const payload: PayloadType = {
    [`${rootId}lo_iface_en`]: boolToStrNum(!!formik.values.lo_iface_en),
    [`${rootId}lo_iface`]: [],
    [`${rootId}lo_http_en`]: boolToStrNum(!!formik.values.lo_http_en),
    [`${rootId}lo_http_port`]: String(formik.values.lo_http_port),
    [`${rootId}lo_https_en`]: boolToStrNum(!!formik.values.lo_https_en),
    [`${rootId}lo_https_port`]: String(formik.values.lo_https_port),
    [`${rootId}lo_telnet_en`]: boolToStrNum(!!formik.values.lo_telnet_en),
    [`${rootId}lo_telnet_port`]: String(formik.values.lo_telnet_port),
    [`${rootId}lo_ssh_en`]: boolToStrNum(!!formik.values.lo_ssh_en),
    [`${rootId}lo_ssh_port`]: String(formik.values.lo_ssh_port),
    [`${rootId}lo_ssh_pa`]: boolToStrNum(!!formik.values.lo_ssh_pa),
    [`${rootId}re_iface_en`]: boolToStrNum(!!formik.values.re_iface_en),
    [`${rootId}re_iface`]: formik.values.re_iface as object[],
    [`${rootId}re_http_en`]: boolToStrNum(!!formik.values.re_http_en),
    [`${rootId}re_http_port`]: String(formik.values.re_http_port),
    [`${rootId}re_https_en`]: boolToStrNum(!!formik.values.re_https_en),
    [`${rootId}re_https_port`]: String(formik.values.re_https_port),
  }

  const handleDownloadPrivateKey = () => {
    sendWsSetMessage(
      SERVER_ACTIONS.ACCESS_MANAGEMENT_DOWNLOAD_SSH_PRIVATE_KEY,
      {
        [`${rootId}lo_ssh_keys_dl`]: 'Download Private Key',
        ...payload,
      },
    )
  }

  const handleRegeneratePrivateKey = () => {
    sendWsGetMessage(SERVER_ACTIONS.ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS)
  }

  const handleRemoteIfaceClick = (value: string[]) => {
    formik.setFieldValue('re_iface', value)
  }

  useEffect(() => {
    sendWsGetMessage(
      SERVER_ACTIONS.ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE,
    )
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Access Management'
        subtitle='This section allows you to configure your local and remote access management.'
      />

      <Stack gap={2}>
        <Card>
          <CardHeader title='Local Access Management' />
          <CardContent className={classes.fieldWidth}>
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
            <Checkbox {...checkboxProps('lo_http_en', 'Enable HTTP', formik)} />
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
            <Checkbox {...checkboxProps('lo_ssh_en', 'Enable SSH', formik)} />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader title='Remote Access Management' />
          <CardContent className={classes.fieldWidth}>
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
            <Checkbox {...checkboxProps('re_http_en', 'Enable HTTP', formik)} />
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
          </CardContent>
        </Card>
      </Stack>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
