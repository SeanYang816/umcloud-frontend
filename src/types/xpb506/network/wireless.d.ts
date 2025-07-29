/** 1.3 Wireless */

import { BoolString, StatusMessageType } from 'types'

// 1.3.1 Get Primary SSID Config
export type GetPrimarySSIDConfigResponse = StatusMessageType & {
  result: {
    'cbid.wireless.wifi0.manual_disable': BoolString
    'cbid.wireless.wifi0.time_schedule': string
    'cbid.wireless.wifi0.hwmode': '11b' | '11g' | '11ng' | '11axg'
    'cbid.wireless.wifi0.htmode': 'HT20' | 'HT40'
    'cbid.wireless.wifi0._mode_freq.channel':
      | 'auto'
      | '1'
      | '2'
      | '3'
      | '4'
      | '5'
      | '6'
      | '7'
      | '8'
      | '9'
      | '10'
      | '11'
    'cbid.wireless.wifi0._mode_freq.band': '11b' | '11g' | '11ng' | '11axg'
    'cbid.wireless.wifi0._mode_freq.htmode': 'HT20' | 'HT40'
    'cbid.wireless.wifi0_primary.ssid': string
    'cbid.wireless.wifi0_primary.bssid': string
    'cbid.wireless.wifi0_primary.mode': string
    'cbid.wireless.wifi0_primary.network': string
    'cbid.wireless.wifi0_primary.hidden': BoolString
    'cbid.wireless.wifi0_primary.macfilter': '' | 'allow' | 'deny'
    'cbid.wireless.wifi0_primary.maclist': string[]
    'cbid.wireless.wifi0_primary.isolate': BoolString
    'cbid.wireless.wifi0_primary.disablecoext': BoolString
    'cbid.wireless.wifi0_primary.ieee80211w': string
    'cbid.wireless.wifi0_primary.encryption':
      | 'none'
      | 'owe'
      | 'psk2'
      | 'wpa2'
      | 'psk-mixed'
      | 'wpa'
      | 'wpa-sae'
      | 'wpa2-eap'
      | 'wpa3-sae-mixed'
    'cbid.wireless.wifi0_primary.cipher': 'ccmp' | 'tkip+ccmp'
    'cbid.wireless.wifi0_primary._wapi_key': string
    'cbid.wireless.wifi0_primary._wpa_key': string
    'cbid.wireless.wifi0_primary.password': string
    'cbid.wireless.wifi0_primary.priv_key_pwd': string
    'cbid.wireless.wifi0_primary.identity': string
    'cbid.wireless.wifi0_primary.eap_type': string
    'cbid.wireless.wifi0_primary.auth': string
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
    'cbid.wireless.wifi0_primary._wep_key': string
    'cbid.wireless.wifi0_primary.key1': string
    'cbid.wireless.wifi0_primary.key2': string
    'cbid.wireless.wifi0_primary.key3': string
    'cbid.wireless.wifi0_primary.key4': string
  }
}

// 1.3.2 Set Primary SSID Config
export type SetPrimarySSIDConfigRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0.manual_disable': BoolString
  'cbid.wireless.wifi0.time_schedule': string
  'cbid.wireless.wifi0.hwmode': '11b' | '11g' | '11ng' | '11axg'
  'cbid.wireless.wifi0.htmode': 'HT20' | 'HT40'
  'cbid.wireless.wifi0._mode_freq.channel':
    | 'auto'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
  'cbid.wireless.wifi0_primary.ssid': string
  'cbid.wireless.wifi0_primary.bssid': string
  'cbid.wireless.wifi0_primary.mode': string
  'cbid.wireless.wifi0_primary.network': string
  'cbid.wireless.wifi0_primary.hidden': BoolString
  'cbid.wireless.wifi0_primary.macfilter': '' | 'allow' | 'deny'
  'cbid.wireless.wifi0_primary.maclist': string[]
  'cbid.wireless.wifi0_primary.isolate': BoolString
  'cbid.wireless.wifi0_primary.disablecoext': BoolString
  'cbid.wireless.wifi0_primary.encryption':
    | 'none'
    | 'owe'
    | 'psk2'
    | 'wpa2'
    | 'psk-mixed'
    | 'wpa'
    | 'wpa-sae'
    | 'wpa2-eap'
    | 'wpa3-sae-mixed'
  'cbid.wireless.wifi0_primary.cipher': 'ccmp' | 'tkip+ccmp'
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

export type SetPrimarySSIDConfigResponse = GetPrimarySSIDConfigResponse & {
  apply?: string
}

// 1.3.3 Get Primary SSId WiFi Status
export type GetPrimarySSIDWiFiStatusResponse = StatusMessageType & {
  result: {
    disabled: string
    up: boolean
    name: string
    ifname: string
    device: {
      device: string
      name: string
      up: boolean
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
    quality: number
    noise: number
    link: string
    country: string
    id: string
    txpoweroff: string
    wmm: {
      CWmin: {
        AC_VI: string
        AC_VO: string
        AC_BE: string
        AC_BK: string
      }
      txoplimit: {
        AC_VI: string
        AC_VO: string
        AC_BE: string
        AC_BK: string
      }
      CWmax: {
        AC_VI: string
        AC_VO: string
        AC_BE: string
        AC_BK: string
      }
      aifs: {
        AC_VI: string
        AC_VO: string
        AC_BE: string
        AC_BK: string
      }
    }
    freqlist: {
      restricted: boolean
      mhz: number
      channel: number
    }[]
    assoclist: {
      [key: string]: {
        // MAC Address
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
        signal: number
        noise: number
      }
    }
    name: string
    up: boolean
  }
}
