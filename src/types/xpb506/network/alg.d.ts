import { BoolString, StatusMessageType } from 'types'

/** 1.7 ALG */

// 1.7.1 Get ALG Page
export type GetALGPageResponse = StatusMessageType & {
  result: {
    'cbid.alg.alg.ftp': '1' | BoolString
    'cbid.alg.alg.tftp': '1' | BoolString
    'cbid.alg.alg.snmp': '1' | BoolString
    'cbid.alg.alg.sip': '1' | BoolString
    'cbid.alg.alg.rtsp': '1' | BoolString
    'cbid.alg.alg.irc': '1' | BoolString
    'cbid.alg.alg.h323': '1' | BoolString
  }
}

// 1.7.2 Set ALG Page
export type SetALGPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'cbid.alg.alg.ftp': '1' | BoolString
  'cbid.alg.alg.tftp': '1' | BoolString
  'cbid.alg.alg.snmp': '1' | BoolString
  'cbid.alg.alg.sip': '1' | BoolString
  'cbid.alg.alg.rtsp': '1' | BoolString
  'cbid.alg.alg.irc': '1' | BoolString
  'cbid.alg.alg.h323': '1' | BoolString
}

export type SetALGPageResponse = GetALGPageResponse
