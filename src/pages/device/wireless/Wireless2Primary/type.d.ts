import { EmptyProps, MessageStatusProps, OptionsOrSuggestType } from 'types'

export type GetWireless2Primary =
  | ({
      result: GetWireless2PrimaryResult
      options: OptionsOrSuggestType
    } & MessageStatusProps)
  | EmptyProps

export type GetWireless2PrimaryResult = {
  'cbid.wireless.wifi0.hwmode': string
  'cbid.wireless.wifi0.htmode': string
  'cbid.wireless.wifi0._mode_freq.channel': string
  'cbid.wireless.wifi0._mode_freq.band': string
  'cbid.wireless.wifi0._mode_freq.htmode': string
  'cbid.wireless.wifi0_primary.ssid': string
  'cbid.wireless.wifi0_primary.bssid': string
  'cbid.wireless.wifi0_primary.mode': string
  'cbid.wireless.wifi0_primary.network': string
  'cbid.wireless.wifi0_primary.hidden': string
  'cbid.wireless.wifi0_primary.macfilter': string
  'cbid.wireless.wifi0_primary.maclist': string[]
  'cbid.wireless.wifi0_primary.isolate': string
  'cbid.wireless.wifi0_primary.disablecoext': string
  'cbid.wireless.wifi0_primary.ieee80211w': string
  'cbid.wireless.wifi0_primary.encryption': string
  'cbid.wireless.wifi0_primary.cipher': string
  'cbid.wireless.wifi0_primary._wapi_key': string
  'cbid.wireless.wifi0_primary._wpa_key': string
  'cbid.wireless.wifi0_primary.password': string
  'cbid.wireless.wifi0_primary._key_pwd': string
  'cbid.wireless.wifi0_primary.identity': string
  'cbid.wireless.wifi0_primary.eap_type': string
  'cbid.wireless.wifi0_primary.auth': string
  'cbid.wireless.wifi0_primary.auth_server': string
  'cbid.wireless.wifi0_primary.auth_port': string
  'cbid.wireless.wifi0_primary.auth_secret': string
  'cbid.wireless.wifi0_primary.prev_auth': string
  'cbid.wireless.wifi0_primary.asu_ip': string
  'cbid.wireless.wifi0_primary.asu_port': string
  'cbid.wireless.wifi0_primary.enable_tri_cert': string
  'cbid.wireless.wifi0_primary.cert_fiiletype': string
  'cbid.wireless.wifi0_primary.custom': string
  'cbid.wireless.wifi0_primary.custom1': string
  'cbid.wireless.wifi0_primary.custom2': string
  'cbid.wireless.wifi0_primary.unicast_rekey_packet': string
  'cbid.wireless.wifi0_primary.multicast_rekey_packet': string
  'cbid.wireless.wifi0_primary.unicast_rekey_timeout': string
  'cbid.wireless.wifi0_primary.multicast_rekey_timeout': string
  'cbid.wireless.wifi0_primary._wep_key': string
  'cbid.wireless.wifi0_primary.key1': string
  'cbid.wireless.wifi0_primary.key2': string
  'cbid.wireless.wifi0_primary.key3': string
  'cbid.wireless.wifi0_primary.key4': string
}

export type SetWireless2Primary = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0.hwmode': string
  'cbid.wireless.wifi0.htmode': string
  'cbid.wireless.wifi0._mode_freq.channel': string
  'cbid.wireless.wifi0_primary.ssid': string
  'cbid.wireless.wifi0_primary.bssid': string
  'cbid.wireless.wifi0_primary.mode': string
  'cbid.wireless.wifi0_primary.network': string
  'cbid.wireless.wifi0_primary.hidden': string
  'cbid.wireless.wifi0_primary.macfilter': string
  'cbid.wireless.wifi0_primary.maclist': string[]
  'cbid.wireless.wifi0_primary.isolate': string
  'cbid.wireless.wifi0_primary.disablecoext': string
  'cbid.wireless.wifi0_primary.encryption': string
  'cbid.wireless.wifi0_primary.cipher': string
  'cbid.wireless.wifi0_primary._wpa_key': string
  'cbid.wireless.wifi0_primary.password': string
  'cbid.wireless.wifi0_primary.priv_key_pwd': string
  'cbid.wireless.wifi0_primary.identity': string
  'cbid.wireless.wifi0_primary.eap_type': string
  'cbid.wireless.wifi0_primary.auth_server': string
  'cbid.wireless.wifi0_primary.auth_port': string
  'cbid.wireless.wifi0_primary.auth_secret': string
  'cbid.wireless.wifi0_primary.pre_auth': string
  'cbid.wireless.wifi0_primary.asu_ip': string
  'cbid.wireless.wifi0_primary.asu_port': string
  'cbid.wireless.wifi0_primary.enable_tri_cert': string
  'cbid.wireless.wifi0_primary.cert_filetype': string
  'cbid.wireless.wifi0_primary._custom': string
  'cbid.wireless.wifi0_primary._custom1': string
  'cbid.wireless.wifi0_primary._custom2': string
  'cbid.wireless.wifi0_primary.unicast_rekey_packet': string
  'cbid.wireless.wifi0_primary.multicast_rekey_packet': string
  'cbid.wireless.wifi0_primary.unicast_rekey_timeout': string
  'cbid.wireless.wifi0_primary.multicast_rekey_timeout': string
}

export type GetWireless2PrimaryStatus =
  | ({
      result: GetWireless2PrimaryStatusResult
    } & MessageStatusProps)
  | EmptyProps

export type GetWireless2PrimaryStatusResult = {
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
