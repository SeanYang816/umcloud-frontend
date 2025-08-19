/** 4.1 Overview */

import { Assoc, StatusMessageType } from 'types'

// 4.1.1 Get Overview Page
export type OverviewResult = {
  conncount: number
  connmax: number
  fwver: string
  hostname: string
  leases: {
    hostname: string
    ipaddr: string
    macaddr: string
    ecpires: number
  }[]
  leases6: {
    hostname: string
    ip6addr: string
    duid: string
  }[]
  hostname: string
  ip6addr: string
  duid: string
  loadavg: [number, number, number]
  localtime: string
  memory: {
    buffered: number
    total: number
    shared: number
    free: number
  }
  ostime: number
  swap: {
    // 檔案似乎寫錯
    free: string
    total: string
  }
  uptime: number
  wan: {
    is_up: boolean
    proto?: string
    ipaddr?: string
    netmask?: string
    gwaddr?: string
    dns?: string[]
    expires?: number
    uptime?: number
    ifname?: string
  }
  wan2: {
    is_up: boolean
    proto?: string
    ipaddr?: string
    netmask?: string
    gwaddr?: string
    dns?: string[]
    expires?: number
    uptime?: number
    ifname?: string
  }
  wan6: {
    is_up: boolean
    ip6addr?: string
    gw6addr?: string
    dns?: string[]
    uptime?: string
    iframe?: string
  }
  wann?: {
    is_up: boolean
    proto?: string
    ipaddr?: string
    netmask?: string
    gwaddr?: string
    dns?: string[]
    expires?: number
    uptime?: number
    ifname?: string
    link?: string
  }
  wwan6?: {
    is_up: boolean
    ip6addr?: string
    gw6addr?: string
    dns?: string[]
    uptime?: string
    iframe?: string
    link?: string
  }
  wifinets?: {
    device: string
    networks: {
      disabled: string
      up: string
      name: string
      ssid: string
      bssid: string
      mode: string
      encryption: string
      wpa_key_mgmt: string
      is_multiple_network: string
      is_guest_network: boolean
      frequency: string
      channel: number
      bitrate: number
      quality: number
      noise: number
      link: string
      country: string
      txpoweroff: string
      signal: number
      asscolist: {
        [key: string]: Assoc
      }
      up: boolean
    }[]
  }
}

export type GetOverviewPageResponse = StatusMessageType & {
  result: OverviewResult
}
