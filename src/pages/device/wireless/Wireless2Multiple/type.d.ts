import { MessageStatusProps, OptionsOrSuggestType } from 'types'

export type GetWireless2Multiple =
  | ({
      result:
        | GetWireless2MultipleResult_Network3
        | GetWireless2MultipleResult_Network4
        | GetWireless2MultipleResult_Network5
        | GetWireless2MultipleResult_Network6
        | GetWireless2MultipleResult_Network7
      options: OptionsOrSuggestType
    } & MessageStatusProps)
  | null

export type GetWireless2MultipleResult =
  | GetWireless2MultipleResult_Network3
  | GetWireless2MultipleResult_Network4
  | GetWireless2MultipleResult_Network5
  | GetWireless2MultipleResult_Network6
  | GetWireless2MultipleResult_Network7

export type GetWireless2MultipleResult_Network3 = {
  'cbid.wireless.wifi0_mssid1.disabled': string
  list_ssid: string[]
  'cbid.wireless.wifi0_mssid1.time_schedule': string
  'cbid.wireless.wifi0_mssid1.ssid': string
  'cbid.wireless.wifi0_mssid1.mode': string
  'cbid.wireless.wifi0_mssid1.hidden': string
  'cbid.wireless.wifi0_mssid1.isolate': string
  'cbid.wireless.wifi0_mssid1.ieee80221w': string
  'cbid.wireless.wifi0_mssid1.encryption': string
  'cbid.wireless.wifi0_mssid1.cipher': string
  'cbid.wireless.wifi0_mssid1._wpa_key': string
  'cbid.wireless.wifi0_mssid1.auth_server': string
  'cbid.wireless.wifi0_mssid1.auth_port': string
  'cbid.wireless.wifi0_mssid1.auth_secret': string
}

export type SetWireless2MultipleResult_Network3 = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0_mssid1.disabled': string
  'cbid.wireless.wifi0_mssid1.time_schedule': string
  'cbid.wireless.wifi0_mssid1.ssid': string
  'cbid.wireless.wifi0_mssid1.mode': string
  'cbid.wireless.wifi0_mssid1.hidden': string
  'cbid.wireless.wifi0_mssid1.isolate': string
  'cbid.wireless.wifi0_mssid1.encryption': string
  'cbid.wireless.wifi0_mssid1.cipher': string
  'cbid.wireless.wifi0_mssid1._wpa_key': string
  'cbid.wireless.wifi0_mssid1.auth_server': string
  'cbid.wireless.wifi0_mssid1.auth_port': string
  'cbid.wireless.wifi0_mssid1.auth_secret': string
}

export type GetWireless2MultipleResult_Network4 = {
  'cbid.wireless.wifi0_mssid2.disabled': string
  list_ssid: string[]
  'cbid.wireless.wifi0_mssid2.time_schedule': string
  'cbid.wireless.wifi0_mssid2.ssid': string
  'cbid.wireless.wifi0_mssid2.mode': string
  'cbid.wireless.wifi0_mssid2.hidden': string
  'cbid.wireless.wifi0_mssid2.isolate': string
  'cbid.wireless.wifi0_mssid2.ieee80221w': string
  'cbid.wireless.wifi0_mssid2.encryption': string
  'cbid.wireless.wifi0_mssid2.cipher': string
  'cbid.wireless.wifi0_mssid2._wpa_key': string
  'cbid.wireless.wifi0_mssid2.auth_server': string
  'cbid.wireless.wifi0_mssid2.auth_port': string
  'cbid.wireless.wifi0_mssid2.auth_secret': string
}

export type SetWireless2MultipleResult_Network4 = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0_mssid2.disabled': string
  'cbid.wireless.wifi0_mssid2.time_schedule': string
  'cbid.wireless.wifi0_mssid2.ssid': string
  'cbid.wireless.wifi0_mssid2.mode': string
  'cbid.wireless.wifi0_mssid2.hidden': string
  'cbid.wireless.wifi0_mssid2.isolate': string
  'cbid.wireless.wifi0_mssid2.encryption': string
  'cbid.wireless.wifi0_mssid2.cipher': string
  'cbid.wireless.wifi0_mssid2._wpa_key': string
  'cbid.wireless.wifi0_mssid2.auth_server': string
  'cbid.wireless.wifi0_mssid2.auth_port': string
  'cbid.wireless.wifi0_mssid2.auth_secret': string
}

export type GetWireless2MultipleResult_Network5 = {
  'cbid.wireless.wifi0_mssid3.disabled': string
  list_ssid: string[]
  'cbid.wireless.wifi0_mssid3.time_schedule': string
  'cbid.wireless.wifi0_mssid3.ssid': string
  'cbid.wireless.wifi0_mssid3.mode': string
  'cbid.wireless.wifi0_mssid3.hidden': string
  'cbid.wireless.wifi0_mssid3.isolate': string
  'cbid.wireless.wifi0_mssid3.ieee80221w': string
  'cbid.wireless.wifi0_mssid3.encryption': string
  'cbid.wireless.wifi0_mssid3.cipher': string
  'cbid.wireless.wifi0_mssid3._wpa_key': string
  'cbid.wireless.wifi0_mssid3.auth_server': string
  'cbid.wireless.wifi0_mssid3.auth_port': string
  'cbid.wireless.wifi0_mssid3.auth_secret': string
}

export type SetWireless2MultipleResult_Network5 = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0_mssid3.disabled': string
  'cbid.wireless.wifi0_mssid3.time_schedule': string
  'cbid.wireless.wifi0_mssid3.ssid': string
  'cbid.wireless.wifi0_mssid3.mode': string
  'cbid.wireless.wifi0_mssid3.hidden': string
  'cbid.wireless.wifi0_mssid3.isolate': string
  'cbid.wireless.wifi0_mssid3.encryption': string
  'cbid.wireless.wifi0_mssid3.cipher': string
  'cbid.wireless.wifi0_mssid3._wpa_key': string
  'cbid.wireless.wifi0_mssid3.auth_server': string
  'cbid.wireless.wifi0_mssid3.auth_port': string
  'cbid.wireless.wifi0_mssid3.auth_secret': string
}

export type GetWireless2MultipleResult_Network6 = {
  'cbid.wireless.wifi0_mssid4.disabled': string
  list_ssid: string[]
  'cbid.wireless.wifi0_mssid4.time_schedule': string
  'cbid.wireless.wifi0_mssid4.ssid': string
  'cbid.wireless.wifi0_mssid4.mode': string
  'cbid.wireless.wifi0_mssid4.hidden': string
  'cbid.wireless.wifi0_mssid4.isolate': string
  'cbid.wireless.wifi0_mssid4.ieee80221w': string
  'cbid.wireless.wifi0_mssid4.encryption': string
  'cbid.wireless.wifi0_mssid4.cipher': string
  'cbid.wireless.wifi0_mssid4._wpa_key': string
  'cbid.wireless.wifi0_mssid4.auth_server': string
  'cbid.wireless.wifi0_mssid4.auth_port': string
  'cbid.wireless.wifi0_mssid4.auth_secret': string
}

export type SetWireless2MultipleResult_Network6 = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0_mssid4.disabled': string
  'cbid.wireless.wifi0_mssid4.time_schedule': string
  'cbid.wireless.wifi0_mssid4.ssid': string
  'cbid.wireless.wifi0_mssid4.mode': string
  'cbid.wireless.wifi0_mssid4.hidden': string
  'cbid.wireless.wifi0_mssid4.isolate': string
  'cbid.wireless.wifi0_mssid4.encryption': string
  'cbid.wireless.wifi0_mssid4.cipher': string
  'cbid.wireless.wifi0_mssid4._wpa_key': string
  'cbid.wireless.wifi0_mssid4.auth_server': string
  'cbid.wireless.wifi0_mssid4.auth_port': string
  'cbid.wireless.wifi0_mssid4.auth_secret': string
}

export type GetWireless2MultipleResult_Network7 = {
  'cbid.wireless.wifi0_mssid5.disabled': string
  list_ssid: string[]
  'cbid.wireless.wifi0_mssid5.time_schedule': string
  'cbid.wireless.wifi0_mssid5.ssid': string
  'cbid.wireless.wifi0_mssid5.mode': string
  'cbid.wireless.wifi0_mssid5.hidden': string
  'cbid.wireless.wifi0_mssid5.isolate': string
  'cbid.wireless.wifi0_mssid5.ieee80221w': string
  'cbid.wireless.wifi0_mssid5.encryption': string
  'cbid.wireless.wifi0_mssid5.cipher': string
  'cbid.wireless.wifi0_mssid5._wpa_key': string
  'cbid.wireless.wifi0_mssid5.auth_server': string
  'cbid.wireless.wifi0_mssid5.auth_port': string
  'cbid.wireless.wifi0_mssid5.auth_secret': string
}

export type SetWireless2MultipleResult_Network7 = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.wireless.wifi0_mssid5.disabled': string
  'cbid.wireless.wifi0_mssid5.time_schedule': string
  'cbid.wireless.wifi0_mssid5.ssid': string
  'cbid.wireless.wifi0_mssid5.mode': string
  'cbid.wireless.wifi0_mssid5.hidden': string
  'cbid.wireless.wifi0_mssid5.isolate': string
  'cbid.wireless.wifi0_mssid5.encryption': string
  'cbid.wireless.wifi0_mssid5.cipher': string
  'cbid.wireless.wifi0_mssid5._wpa_key': string
  'cbid.wireless.wifi0_mssid5.auth_server': string
  'cbid.wireless.wifi0_mssid5.auth_port': string
  'cbid.wireless.wifi0_mssid5.auth_secret': string
}
