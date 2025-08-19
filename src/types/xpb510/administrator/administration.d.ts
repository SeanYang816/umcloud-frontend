/** 3.2 Administration */

import { StatusMessageType } from 'types'

// 3.2.1 Get Administration Page
export type GetAdministrationResponse = StatusMessageType & {
  result: {
    'cbid.system._pass.us': string
    'cbid.system._pass.pwold': string
    'cbid.system._pass.pw1': string
    'cbid.system._pass.pw2': string
    'cbid.system._pass.idletimeout': string
  }
}

// 3.2.2 Set Administration Page
export type SetAdministrationRequest = {
  'cbi.submit': string
  'cbi.apply': string
  'cbid.system._pass.us': string
  'cbid.system._pass.pwold': string
  'cbid.system._pass.pw1': string
  'cbid.system._pass.pw2': string
  'cbid.system._pass.idletimeout': string
}

export type SetAdministrationResponse = GetAdministrationResponse & {
  errors?: Record<string, unknown>
  apply?: string
}
