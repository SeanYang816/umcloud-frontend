import { BoolString, StatusMessageType } from 'types'

/** 1.7 Alg */

// 1.7.1 Get Alg Page

export type GetAlgPageResult = {
  'cbid.alg.alg.ftp': '1' | BoolString
  'cbid.alg.alg.tftp': '1' | BoolString
  'cbid.alg.alg.snmp': '1' | BoolString
  'cbid.alg.alg.sip': '1' | BoolString
  'cbid.alg.alg.rtsp': '1' | BoolString
  'cbid.alg.alg.irc': '1' | BoolString
  'cbid.alg.alg.h323': '1' | BoolString
}
export type GetAlgPageResponse = StatusMessageType & {
  result: GetAlgPageResult
}

// 1.7.2 Set Alg Page
export type SetAlgPageRequest = {
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

export type SetAlgPageResponse = GetAlgPageResponse
