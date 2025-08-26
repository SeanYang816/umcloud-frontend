/** 3.4  Access management */

import { Options, StatusMessageType } from 'types'

// 3.4.1 Get Access Management Page
export type GetAccessManagementPageResponse = StatusMessageType & {
  result: {
    'cbid.uhttpd.main.lo_iface_en': string
    'cbid.uhttpd.main.lo_iface': string[]
    'cbid.uhttpd.main.lo_http_en': string
    'cbid.uhttpd.main.lo_http_port': string
    'cbid.uhttpd.main.lo_https_en': string
    'cbid.uhttpd.main.lo_https_port': string
    'cbid.uhttpd.main.lo_telnet_en': string
    'cbid.uhttpd.main.lo_telnet_port': string
    'cbid.uhttpd.main.lo_ssh_en': string
    'cbid.uhttpd.main.lo_ssh_port': string
    'cbid.uhttpd.main.lo_ssh_pa': string
    'cbid.uhttpd.main.re_iface_en': string
    'cbid.uhttpd.main.re_iface': string[]
    'cbid.uhttpd.main.re_http_en': string
    'cbid.uhttpd.main.re_http_port': string
    'cbid.uhttpd.main.re_https_en': string
    'cbid.uhttpd.main.re_https_port': string
  }
  options: Options
}

// 3.4.2 Set Access Management Page
export type SetAccessManagementPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.uhttpd.main.lo_iface_en': string
  'cbid.uhttpd.main.lo_iface': string[]
  'cbid.uhttpd.main.lo_http_en': string
  'cbid.uhttpd.main.lo_http_port': string
  'cbid.uhttpd.main.lo_https_en': string
  'cbid.uhttpd.main.lo_https_port': string
  'cbid.uhttpd.main.lo_telnet_en': string
  'cbid.uhttpd.main.lo_telnet_port': string
  'cbid.uhttpd.main.lo_ssh_en': string
  'cbid.uhttpd.main.lo_ssh_port': string
  'cbid.uhttpd.main.lo_ssh_pa': string
  'cbid.uhttpd.main.re_iface_en': string
  'cbid.uhttpd.main.re_iface': string[]
  'cbid.uhttpd.main.re_http_en': string
  'cbid.uhttpd.main.re_http_port': string
  'cbid.uhttpd.main.re_https_en': string
  'cbid.uhttpd.main.re_https_port': string
}

export type SetAccessManagementPageResponse = GetAccessManagementPageResponse

// 3.4.3 Download SSH Private Key
export type DownloadSSHPrivateKeyRequest = SetAccessManagementPageRequest & {
  // Except: 'cbi.apply'
}

export type DownloadSSHPrivateKeyResponse = StatusMessageType & {
  result: {
    filename: 'TEW929DRU-SSH-private-key.pem' | string
    'Content-Type': 'text/plain' | string
    data: string
  }
}

// 3.4.4 Re-generate SSH Keys
export type RegenerateSSHKeysRespone = StatusMessageType
