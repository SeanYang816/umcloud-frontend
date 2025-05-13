import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import { Select, useStyles } from 'components/fields'
import { CHANNEL_OPTIONS_5GHz } from 'constant/options'
import { useMemo } from 'react'
import { optionsConverter } from 'utils/optionsConverter'
import { selectProps } from 'utils/formik'
import { GetWireless5Primary, GetWireless5PrimaryStatus } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType, OptionsOrSuggestType } from 'types'
import { CardHeader } from 'components/extends/CardHeader'
import { get_wifi_encryption } from 'utils/getWifiEncryption'

enum hwmodeOptions {
  A = '11a',
  A_N = '11na',
  A_N_AC = '11ac',
  A_N_AC_AX = '11axa',
}

type DeviceConfigurationProps = {
  data: GetWireless5Primary
  statusData: GetWireless5PrimaryStatus
  formik: FormikProps<FormikValuesType>
}

export const DeviceConfiguration = ({
  data,
  statusData,
  formik,
}: DeviceConfigurationProps) => {
  const classes = useStyles()
  const theme = useTheme()

  const options = data?.options as OptionsOrSuggestType
  const statusResult = statusData?.result

  const statusList = useMemo(
    () =>
      statusResult
        ? [
            { label: 'Mode', value: statusResult.mode },
            { label: 'SSID', value: statusResult.ssid },
            { label: 'BSSID', value: statusResult.bssid },
            {
              label: 'Encryption',
              value: get_wifi_encryption(
                statusResult.encryption,
                statusResult.wpa_key_mgmt,
              ),
            },
            { label: 'Channel', value: statusResult.channel },
            { label: 'Tx-Power', value: statusResult.txpower },
            { label: 'Bitrate', value: statusResult.bitrate },
          ]
        : [],
    [statusResult],
  )

  const channelOptions =
    formik.values.htmode === 'HT80'
      ? CHANNEL_OPTIONS_5GHz.slice(0, -1)
      : CHANNEL_OPTIONS_5GHz
  const hwModeOptions = optionsConverter(options, 'cbid.wireless.wifi1.hwmode')
  const htModeOptions = optionsConverter(options, 'cbid.wireless.wifi1.htmode')
  const conditionalHtModeOptions = htModeOptions.filter(
    (object) => object.value !== 'HT80',
  ) // 因受 hwMode 影響有時需要排除 HT80 選項，所以做此處裡

  return (
    <Card>
      <CardHeader title='Device Configuration' />

      <CardContent className={classes.fieldWidth}>
        <Grid container minWidth={480} maxWidth={600}>
          {statusList.map((item) => (
            <Grid key={item.label} size={{ xs: 6 }} mb={1}>
              <Typography
                component='span'
                variant='subtitle1'
                color={theme.palette.secondary.dark}
              >
                {item.label}
              </Typography>
              <Typography variant='h5'>{item.value}</Typography>
            </Grid>
          ))}
        </Grid>
        <Select
          {...selectProps(
            'channel',
            'Operating frequency Channel',
            channelOptions,
            formik,
          )}
        />
        <Select
          {...selectProps('hwmode', 'Wireless Mode', hwModeOptions, formik)}
        />
        {formik.values.hwmode === hwmodeOptions.A_N && (
          <Select
            {...selectProps(
              'htmode',
              'HT mode',
              conditionalHtModeOptions,
              formik,
            )}
          />
        )}
        {(formik.values.hwmode === hwmodeOptions.A_N_AC ||
          formik.values.hwmode === hwmodeOptions.A_N_AC_AX) && (
          <Select
            {...selectProps('htmode', 'HT mode', htModeOptions, formik)}
          />
        )}
      </CardContent>
    </Card>
  )
}
