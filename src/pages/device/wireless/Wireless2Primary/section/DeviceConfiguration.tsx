import { Card, CardContent, Grid, Typography, useTheme } from '@mui/material'
import { Select, useStyles } from 'components/fields'
import { CHANNEL_OPTIONS_2GHz } from 'constant/options'
import { useMemo } from 'react'
import { optionsConverter } from 'utils/optionsConverter'
import { selectProps } from 'utils/formik'
import { GetWireless2Primary, GetWireless2PrimaryStatus } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType, OptionsOrSuggestType } from 'types'
import { CardHeader } from 'components/extends/CardHeader'
import { get_wifi_encryption } from 'utils/getWifiEncryption'

enum hwmodeOptions {
  B = '11b',
  G = '11g',
  B_G_N = '11ng',
  B_G_N_AX = '11axg',
}

type DeviceConfigurationProps = {
  data: GetWireless2Primary
  statusData: GetWireless2PrimaryStatus
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

  const channelOptions = CHANNEL_OPTIONS_2GHz
  const hwModeOptions = optionsConverter(options, 'cbid.wireless.wifi0.hwmode')
  const htModeOptions = optionsConverter(options, 'cbid.wireless.wifi0.htmode')
  const conditionalHtModeOptions = htModeOptions.filter(
    (object) => object.value !== 'HT80',
  ) // 因後端給的資料和 DUT 行為不同，所以做此處裡，故意排除多餘的 HT80 選項

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
        {(formik.values.hwmode === hwmodeOptions.B_G_N ||
          formik.values.hwmode === hwmodeOptions.B_G_N_AX) && (
          <Select
            {...selectProps(
              'htmode',
              'HT mode',
              conditionalHtModeOptions,
              formik,
            )}
          />
        )}
      </CardContent>
    </Card>
  )
}
