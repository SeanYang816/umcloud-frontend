import { Stack } from '@mui/material'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { DeviceConfiguration } from './section/DeviceConfiguration'
import { InterfaceConfiguration } from './section/InterfaceConfiguration'
import { SetWireless2Primary } from './type'
import { SERVER_ACTIONS } from 'constant'
import { validationSchema } from './validationSchema'
import { Button } from 'components/extends/Button'
import { PageHeader } from 'components/PageHeader'

export const Wireless2Primary = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.wireless.wireless2Primary,
  )
  const statusData = useSelector(
    (state: RootStateProps) => state.bgw5105.wireless.wireless2PrimaryStatus,
  )
  const { dataRefresher } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.refetchData,
  )

  const result = data?.result

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      hwmode: result?.['cbid.wireless.wifi0.hwmode'] ?? '11axg',
      htmode: result?.['cbid.wireless.wifi0.htmode'] ?? 'HT40',
      channel: result?.['cbid.wireless.wifi0._mode_freq.channel'] ?? 'auto',
      ssid: result?.['cbid.wireless.wifi0_primary.ssid'] ?? 'UMRouter_0',
      bssid: result?.['cbid.wireless.wifi0_primary.bssid'] ?? '',
      mode: result?.['cbid.wireless.wifi0_primary.mode'] ?? 'ap',
      network: result?.['cbid.wireless.wifi0_primary.network'] ?? 'lan',
      hidden: result?.['cbid.wireless.wifi0_primary.hidden'] ?? '0',
      macfilter: result?.['cbid.wireless.wifi0_primary.macfilter'] ?? '',
      maclist: result?.['cbid.wireless.wifi0_primary.maclist'] ?? [],
      isolate: result?.['cbid.wireless.wifi0_primary.isolate'] ?? '0',
      disablecoext: result?.['cbid.wireless.wifi0_primary.disablecoext'] ?? '0',
      encryption: result?.['cbid.wireless.wifi0_primary.encryption'] ?? 'none',
      cipher: result?.['cbid.wireless.wifi0_primary.cipher'] ?? '',
      _wpa_key: result?.['cbid.wireless.wifi0_primary._wpa_key'] ?? '12345678',
      password: result?.['cbid.wireless.wifi0_primary.password'] ?? '',
      priv_key_pwd: result?.['cbid.wireless.wifi0_primary._key_pwd'] ?? '',
      identity: result?.['cbid.wireless.wifi0_primary.identity'] ?? '',
      eap_type: result?.['cbid.wireless.wifi0_primary.eap_type'] ?? '',
      auth_server: result?.['cbid.wireless.wifi0_primary.auth_server'] ?? '',
      auth_port: result?.['cbid.wireless.wifi0_primary.auth_port'] ?? '1812',
      auth_secret: result?.['cbid.wireless.wifi0_primary.auth_secret'] ?? '',
      pre_auth: result?.['cbid.wireless.wifi0_primary.prev_auth'] ?? '0',
      asu_ip: result?.['cbid.wireless.wifi0_primary.asu_ip'] ?? '',
      asu_port: result?.['cbid.wireless.wifi0_primary.asu_port'] ?? '',
      enable_tri_cert:
        result?.['cbid.wireless.wifi0_primary.enable_tri_cert'] ?? '',
      cert_filetype:
        result?.['cbid.wireless.wifi0_primary.cert_fiiletype'] ?? '',
      _custom: result?.['cbid.wireless.wifi0_primary.custom'] ?? '',
      _custom1: result?.['cbid.wireless.wifi0_primary.custom1'] ?? '',
      _custom2: result?.['cbid.wireless.wifi0_primary.custom2'] ?? '',
      unicast_rekey_packet:
        result?.['cbid.wireless.wifi0_primary.unicast_rekey_packet'] ??
        '67108864',
      multicast_rekey_packet:
        result?.['cbid.wireless.wifi0_primary.multicast_rekey_packet'] ??
        '67108864',
      unicast_rekey_timeout:
        result?.['cbid.wireless.wifi0_primary.unicast_rekey_timeout'] ??
        '86400',
      multicast_rekey_timeout:
        result?.['cbid.wireless.wifi0_primary.multicast_rekey_timeout'] ??
        '86400',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: SetWireless2Primary = {
        'cbi.submit': '1',
        // 'cbi.apply': 'Apply', // NO NEED
        'cbid.wireless.wifi0.hwmode': values.hwmode,
        'cbid.wireless.wifi0.htmode': values.htmode,
        'cbid.wireless.wifi0._mode_freq.channel': values.channel,
        'cbid.wireless.wifi0_primary.ssid': values.ssid,
        'cbid.wireless.wifi0_primary.bssid': values.bssid,
        'cbid.wireless.wifi0_primary.mode': values.mode,
        'cbid.wireless.wifi0_primary.network': values.network,
        'cbid.wireless.wifi0_primary.hidden': values.hidden,
        'cbid.wireless.wifi0_primary.macfilter': values.macfilter,
        'cbid.wireless.wifi0_primary.maclist': values.maclist,
        'cbid.wireless.wifi0_primary.isolate': values.isolate,
        'cbid.wireless.wifi0_primary.disablecoext': values.disablecoext,
        'cbid.wireless.wifi0_primary.encryption': values.encryption,
        'cbid.wireless.wifi0_primary.cipher': values.cipher,
        'cbid.wireless.wifi0_primary._wpa_key': values._wpa_key,
        'cbid.wireless.wifi0_primary.password': values.password,
        'cbid.wireless.wifi0_primary.priv_key_pwd': values.priv_key_pwd,
        'cbid.wireless.wifi0_primary.identity': values.identity,
        'cbid.wireless.wifi0_primary.eap_type': values.eap_type,
        'cbid.wireless.wifi0_primary.auth_server': values.auth_server,
        'cbid.wireless.wifi0_primary.auth_port': values.auth_port,
        'cbid.wireless.wifi0_primary.auth_secret': values.auth_secret,
        'cbid.wireless.wifi0_primary.pre_auth': values.pre_auth,
        'cbid.wireless.wifi0_primary.asu_ip': values.asu_ip,
        'cbid.wireless.wifi0_primary.asu_port': values.asu_port,
        'cbid.wireless.wifi0_primary.enable_tri_cert': values.enable_tri_cert,
        'cbid.wireless.wifi0_primary.cert_filetype': values.cert_filetype,
        'cbid.wireless.wifi0_primary._custom': values._custom,
        'cbid.wireless.wifi0_primary._custom1': values._custom1,
        'cbid.wireless.wifi0_primary._custom2': values._custom2,
        'cbid.wireless.wifi0_primary.unicast_rekey_packet':
          values.unicast_rekey_packet,
        'cbid.wireless.wifi0_primary.multicast_rekey_packet':
          values.multicast_rekey_packet,
        'cbid.wireless.wifi0_primary.unicast_rekey_timeout':
          values.unicast_rekey_timeout,
        'cbid.wireless.wifi0_primary.multicast_rekey_timeout':
          values.multicast_rekey_timeout,
      } as SetWireless2Primary
      sendWsSetMessage(
        SERVER_ACTIONS.WIRELESS_TWO_POINT_FOUR_GHZ_SET_PRIMARY_SSID_CONFIG,
        payload,
      )
    },
  })

  useEffect(() => {
    sendWsGetMessage(
      SERVER_ACTIONS.WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_CONFIG,
    )
  }, [sendWsGetMessage])

  useEffect(() => {
    if (data) {
      sendWsGetMessage(
        SERVER_ACTIONS.WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_WIFI_STATUS,
      )
    }
  }, [data, sendWsGetMessage, dataRefresher])

  return (
    <>
      <PageHeader
        title='Wireless 2.4GHz Primary SSID'
        subtitle='This section allows you to configure the basic settings required for your primary wireless network such as your wireless network name(SSID) and WiFi Key. Additional settings include enabling/disabling the wireless radio, applying a schedule when the radio should be enabled or disabled, and client MAC address filtering.'
      />
      <Stack gap={2}>
        <DeviceConfiguration
          data={data}
          statusData={statusData}
          formik={formik}
        />

        <InterfaceConfiguration
          data={data}
          statusData={statusData}
          formik={formik}
        />
      </Stack>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
