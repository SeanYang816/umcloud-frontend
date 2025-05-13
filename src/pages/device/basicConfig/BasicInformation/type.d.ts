/**
 * This is defined according to the following specs
 * http://gitlab.u-media.com.tw/umcloud/umcloud-docs/tree/master/specs
 */

import { EmptyProps, MessageStatusProps } from 'types'

export type OverviewProps =
  | {
      result: OverviewResult
    }
  | EmptyProps

export type OverviewResult = {
  conncount: number
  connmax: number
  fwver: string
  hostname: string
  leases: Array<Lease>
  leases6: Array<string, { hostname: string; ip6addr: string; duid: string }>
  loadavg: [number, number, number]
  localtime: string
  memory: Record<
    string,
    {
      buffered: number
      total: number
      shared: number
      free: number
    }
  >
  ostime: number
  swap: Record<
    string,
    {
      free: string
      total: string
    }
  >
  uptime: number
  wan: {
    is_up: boolean
    proto?: string
    ipaddr?: string
    netmask?: string
    gwaddr?: string
    dns?: string[]
    expires: number
    uptime: number
    ifname: string
  }
  wan6: {
    is_up: boolean
    ip6addr?: string
    gw6addr?: string
    dns?: string[]
    uptime?: string
    ifname?: string
  }
  wwan?: {
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
  wifinets: {
    name: string
    device: string
    networks: Array<Networks>
    up: boolean
  }[]
} & MessageStatusProps

export type Lease = {
  hostname: string
  ipaddr: string
  macaddr: string
  expires: number
}

export type Networks = {
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
  assoclist: AssocList
}

export type AssocList = {
  [key: string]: AssocMac
}

export type AssocMac = {
  noise: number
  tx_mhz: number
  rx_mhz: number
  tx_vht: boolean
  rx_vht: boolean
  tx_ht: boolean
  rx_ht: boolean
  tx_rate: number
  rx_rate: number
  tx_packets: number
  rx_packets: number
  tx_he: boolean
  rx_he: boolean
  inactive: number
  signal: number
}
