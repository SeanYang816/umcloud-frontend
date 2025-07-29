/** 3.4  Access management */

import { BoolString, StatusMessageType } from 'types'

// 3.4.1 Get Access Management Page
export type GetAccessManagementPageResponse = StatusMessageType & {
  result: {
    'cbid.uhttpd.main.lo_iface_en': '1' | BoolString
    'cbid.uhttpd.main.lo_iface:': string[]
    'cbid.uhttpd.main.lo_http_en': '1' | BoolString
    'cbid.uhttpd.main.lo_http_port': '80' | string
    'cbid.uhttpd.main.lo_https_en': '1' | BoolString
    'cbid.uhttpd.main.lo_https_port': '443' | string
    'cbid.uhttpd.main.lo_telnet_en': '0' | BoolString
    'cbid.uhttpd.main.lo_telnet_port': '23' | string
    'cbid.uhttpd.main.lo_ssh_en': BoolString
    'cbid.uhttpd.main.lo_ssh_port': '22' | string
    'cbid.uhttpd.main.lo_ssh_pa': '1' | string
    'cbid.uhttpd.main.re_iface_en': '0' | BoolString
    'cbid.uhttpd.main.re_iface': string[]
    'cbid.uhttpd.main.re_http_en': '0' | BoolString
    'cbid.uhttpd.main.re_http_port': '8080' | string
    'cbid.uhttpd.main.re_https_en': '0' | BoolString
    'cbid.uhttpd.main.re_https_port': '8443' | string
  }
}

// 3.4.2 Set Access Management Page
export type SetAccessManagementPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
  'cbid.uhttpd.main.lo_iface_en': '1' | BoolString
  'cbid.uhttpd.main.lo_iface': string[]
  'cbid.uhttpd.main.lo_http_en': '1' | BoolString
  'cbid.uhttpd.main.lo_http_port': '80' | string
  'cbid.uhttpd.main.lo_https_en': '1' | BoolString
  'cbid.uhttpd.main.lo_https_port': '443' | string
  'cbid.uhttpd.main.lo_telnet_en': '0' | BoolString
  'cbid.uhttpd.main.lo_telnet_port': '23' | string
  'cbid.uhttpd.main.lo_ssh_en': '0' | BoolString
  'cbid.uhttpd.main.lo_ssh_port': '22' | string
  'cbid.uhttpd.main.lo_ssh_pa': '1' | string
  'cbid.uhttpd.main.re_iface_en': '0' | BoolString
  'cbid.uhttpd.main.re_iface': string[]
  'cbid.uhttpd.main.re_http_en': '0' | BoolString
  'cbid.uhttpd.main.re_http_port': '8080' | string
  'cbid.uhttpd.main.re_https_en': '0' | BoolString
  'cbid.uhttpd.main.re_https_port': '8443' | string
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
