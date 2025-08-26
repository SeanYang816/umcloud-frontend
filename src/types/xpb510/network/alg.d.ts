import { StatusMessageType } from 'types'

/** 1.7 Alg */

// 1.7.1 Get Alg Page

export type GetAlgPageResult = {
  'cbid.alg.alg.ftp': string
  'cbid.alg.alg.tftp': string
  'cbid.alg.alg.snmp': string
  'cbid.alg.alg.sip': string
  'cbid.alg.alg.rtsp': string
  'cbid.alg.alg.irc': string
  'cbid.alg.alg.h323': string
}
export type GetAlgPageResponse = StatusMessageType & {
  result: GetAlgPageResult
}

// 1.7.2 Set Alg Page
export type SetAlgPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'cbid.alg.alg.ftp': string
  'cbid.alg.alg.tftp': string
  'cbid.alg.alg.snmp': string
  'cbid.alg.alg.sip': string
  'cbid.alg.alg.rtsp': string
  'cbid.alg.alg.irc': string
  'cbid.alg.alg.h323': string
}

export type SetAlgPageResponse = GetAlgPageResponse
