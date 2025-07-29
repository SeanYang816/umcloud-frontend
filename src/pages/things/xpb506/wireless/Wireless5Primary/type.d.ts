import { EmptyProps, StatusMessageType, OptionsOrSuggestType } from 'types'
import { GetWireless2PrimaryStatusResult } from '../Wireless2Primary/type'

export type GetWireless5Primary =
  | ({
      result: GetWireless5PrimaryResult
      options: OptionsOrSuggestType
    } & StatusMessageType)
  | EmptyProps

export type GetWireless5PrimaryResult = {
  'cbid.wireless.wifi1.hwmode': string
  'cbid.wireless.wifi1.htmode': string
  'cbid.wireless.wifi1._mode_freq.channel': string
  'cbid.wireless.wifi1._mode_freq.band': string
  'cbid.wireless.wifi1._mode_freq.htmode': string
  'cbid.wireless.wifi1_primary.ssid': string
  'cbid.wireless.wifi1_primary.bssid': string
  'cbid.wireless.wifi1_primary.mode': string
  'cbid.wireless.wifi1_primary.network': string
  'cbid.wireless.wifi1_primary.hidden': string
  'cbid.wireless.wifi1_primary.macfilter': string
  'cbid.wireless.wifi1_primary.maclist': string[]
  'cbid.wireless.wifi1_primary.isolate': string
  'cbid.wireless.wifi1_primary.ieee80211w': string
  'cbid.wireless.wifi1_primary.disablecoext': string
  'cbid.wireless.wifi1_primary.ieee80211w': string
  'cbid.wireless.wifi1_primary.encryption': string
  'cbid.wireless.wifi1_primary.cipher': string
  'cbid.wireless.wifi1_primary._wapi_key': string
  'cbid.wireless.wifi1_primary._wpa_key': string
  'cbid.wireless.wifi1_primary.password': string
  'cbid.wireless.wifi1_primary._key_pwd': string
  'cbid.wireless.wifi1_primary.identity': string
  'cbid.wireless.wifi1_primary.eap_type': string
  'cbid.wireless.wifi1_primary.auth': string
  'cbid.wireless.wifi1_primary.auth_server': string
  'cbid.wireless.wifi1_primary.auth_port': string
  'cbid.wireless.wifi1_primary.auth_secret': string
  'cbid.wireless.wifi1_primary.prev_auth': string
  'cbid.wireless.wifi1_primary.asu_ip': string
  'cbid.wireless.wifi1_primary.asu_port': string
  'cbid.wireless.wifi1_primary.enable_tri_cert': string
  'cbid.wireless.wifi1_primary.cert_fiiletype': string
  'cbid.wireless.wifi1_primary.custom': string
  'cbid.wireless.wifi1_primary.custom1': string
  'cbid.wireless.wifi1_primary.custom2': string
  'cbid.wireless.wifi1_primary.unicast_rekey_packet': string
  'cbid.wireless.wifi1_primary.multicast_rekey_packet': string
  'cbid.wireless.wifi1_primary.unicast_rekey_timeout': string
  'cbid.wireless.wifi1_primary.multicast_rekey_timeout': string
  'cbid.wireless.wifi1_primary._wep_key': string
  'cbid.wireless.wifi1_primary.key1': string
  'cbid.wireless.wifi1_primary.key2': string
  'cbid.wireless.wifi1_primary.key3': string
  'cbid.wireless.wifi1_primary.key4': string
}

export type SetWireless5Primary = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi1.hwmode': string
  'cbid.wireless.wifi1.htmode': string
  'cbid.wireless.wifi1._mode_freq.channel': string
  'cbid.wireless.wifi1_primary.ssid': string
  'cbid.wireless.wifi1_primary.bssid': string
  'cbid.wireless.wifi1_primary.mode': string
  'cbid.wireless.wifi1_primary.network': string
  'cbid.wireless.wifi1_primary.hidden': string
  'cbid.wireless.wifi1_primary.macfilter': string
  'cbid.wireless.wifi1_primary.maclist': string[]
  'cbid.wireless.wifi1_primary.isolate': string
  'cbid.wireless.wifi1_primary.encryption': string
  'cbid.wireless.wifi1_primary.cipher': string
  'cbid.wireless.wifi1_primary._wpa_key': string
  'cbid.wireless.wifi1_primary.password': string
  'cbid.wireless.wifi1_primary.priv_key_pwd': string
  'cbid.wireless.wifi1_primary.identity': string
  'cbid.wireless.wifi1_primary.eap_type': string
  'cbid.wireless.wifi1_primary.auth_server': string
  'cbid.wireless.wifi1_primary.auth_port': string
  'cbid.wireless.wifi1_primary.auth_secret': string
  'cbid.wireless.wifi1_primary.pre_auth': string
  'cbid.wireless.wifi1_primary.asu_ip': string
  'cbid.wireless.wifi1_primary.asu_port': string
  'cbid.wireless.wifi1_primary.enable_tri_cert': string
  'cbid.wireless.wifi1_primary.cert_filetype': string
  'cbid.wireless.wifi1_primary._custom': string
  'cbid.wireless.wifi1_primary._custom1': string
  'cbid.wireless.wifi1_primary._custom2': string
  'cbid.wireless.wifi1_primary.unicast_rekey_packet': string
  'cbid.wireless.wifi1_primary.multicast_rekey_packet': string
  'cbid.wireless.wifi1_primary.unicast_rekey_timeout': string
  'cbid.wireless.wifi1_primary.multicast_rekey_timeout': string
}

export type GetWireless5PrimaryStatus =
  | ({
      result: GetWireless2PrimaryStatusResult
    } & StatusMessageType)
  | EmptyProps

export type GetWireless5PrimaryStatusResult = {
  disabled: string
  up: boolean
  name: string
  ifname: string
  device: {
    device: string
    name: string
    up: string
  }
  ssid: string
  bssid: string
  mode: string
  encryption: string
  wpa_key_mgmt: string
  is_multiple_network: boolean
  is_guest_network: boolean
  frequency: string
  channel: number
  bitrate: number
  signal: number
  quality: number
  noise: number
  link: string
  country: string
  id: string
  txpower: number
  txpoweroff: number
  wmm: {
    CWmin: WmmProps
    txoplimit: WmmProps
    CWmax: WmmProps
    aifs: WmmProps
  }
  freqlist: FreqProps[]
  assoclist: Record<
    string,
    {
      inactive: number
      rx_he: boolean
      rx_ht: boolean
      rx_mhz: number
      rx_packets: number
      rx_rate: number
      rx_vht: boolean
      tx_he: boolean
      tx_ht: boolean
      tx_mhz: number
      tx_packets: number
      tx_rate: number
      tx_vht: boolean
      tx_signal: number
      tx_noise: number
    }
  >
  name: string
  up: boolean
}

type FreqProps = {
  restrcited: string
  mhz: number
  channel: number
}

type WmmProps = {
  AC_VI: string
  AC_VO: string
  AC_BE: string
  AC_BK: string
}
