import { EmptyProps, StatusMessageType, OptionsOrSuggestType } from 'types'

export type GetLanPageRequest = {
  get_options?: '1' | '0'
}

export type GetLanPageResult = {
  // Static keys
  'cbid.network.lan.__natmode': string
  'cbid.network.lan.proto': string
  'cbid.network.lan.ipaddr': string
  'cbid.network.lan.netmask': string
  'cbid.network.lan.gateway': string
  'cbid.network.lan.dns': string[]
  'cbid.network.lan.macaddr': string
  'cbid.network.lan.mtu': string
  'cbid.network.lan.metric': string
  'cbid.network.lan.delegate': string
  'cbid.network.lan.auto': string
  'cbid.network.lan.broadcast': string
  'cbid.network.lan.ip6addr': string
  'cbid.network.lan.ip6assign': string
  'cbid.network.lan.ip6gw': string
  'cbid.network.lan.ip6hint': string
  'cbid.network.lan.ip6prefix': string

  'cbid.dhcp.lan.ignore': string
  'cbid.dhcp.lan.relay': string
  'cbid.dhcp.lan.start': string
  'cbid.dhcp.lan.end': string
  'cbid.dhcp.lan.leasetime': string
  'cbid.dhcp.lan.wins': string
  'cbid.dhcp.lan.dns1': string
  'cbid.dhcp.lan.dns2': string
  'cbid.dhcp.lan.domain': string
  'cbid.dhcp.lan.dynamicdhcp': string
  'cbid.dhcp.lan.logqueries': string

  host: string[]
  domain: string[]
  arpbind: string[]

  // Dynamic keys (Record version — no eslint issues)
} & Record<
  | `cbid.dhcp.${string}.name`
  | `cbid.dhcp.${string}.mac`
  | `cbid.dhcp.${string}.ip`
  | `cbid.dhcp.${string}.isvlan`
  | `cbid.arpbind.${string}.macaddr`
  | `cbid.arpbind.${string}.ipaddr`,
  string
>

export type GetLanPageResponse =
  | (StatusMessageType & {
      result: GetLanPageResult
      options: OptionsOrSuggestType
      suggest: OptionsOrSuggestType
    })
  | EmptyProps

export type SetLanPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.network.lan.__natmode': string
  'cbid.network.lan.proto'?: string
  'cbid.network.lan.ipaddr': string
  'cbid.network.lan.netmask': string
  'cbid.network.lan.gateway': string
  'cbid.network.lan.dns': string[]
  'cbid.network.lan.macaddr': string
  'cbid.network.lan.mtu': string
  'cbid.network.lan.metric': string
  'cbid.network.lan.delegate': string
  'cbid.network.lan.auto': string
  'cbid.network.lan.broadcast': string
  'cbid.network.lan.ip6addr': string
  'cbid.network.lan.ip6assign': string
  'cbid.network.lan.ip6gw': string
  'cbid.network.lan.ip6hint': string
  'cbid.network.lan.ip6prefix': string
  'cbid.dhcp.lan.ignore': string
  'cbid.dhcp.lan.relay': string

  'cbid.dhcp.lan.start_addr': string
  'cbid.dhcp.lan.end_addr': string
  'cbid.dhcp.lan.leasetime': string
  'cbid.dhcp.lan.wins': string
  'cbid.dhcp.lan.dns1': string
  'cbid.dhcp.lan.dns2': string
  'cbid.dhcp.lan.domain': string
  'cbid.dhcp.lan.dynamicdhcp': string
  'cbid.dhcp.lan.logqueries': string
} & Record<
  | `cbid.dhcp.${string}.name`
  | `cbid.dhcp.${string}.mac`
  | `cbid.dhcp.${string}.ip`
  | `cbid.dhcp.${string}.isvlan`
  | `cbid.arpbind.${string}.macaddr`
  | `cbid.arpbind.${string}.ipaddr`,
  string
>

export type SetLanPageResponse = GetLanPageRequest & {
  errors?: Record<string, string>
  apply?: string
}

export type AddStaticLeasesRequest = SetLanPageRequest & {
  // Except: cbi.apply
  'cbi.cts.dhcp.host.': 'Add' | string
}

export type AddStaticLeasesResponse = SetLanPageResponse

export type DeleteStaticLeasesRequest = SetLanPageRequest &
  // Except: cbi.apply
  Record<`cbi.rts.dhcp.${string}`, 'Delete' | string> // host

export type DeleteStaticLeasesResponse = SetLanPageResponse
export type AddHostEntriesRequest = SetLanPageRequest & {
  // Except: cbi.apply
  'cbi.cts.dhcp.domain.': 'Add' | string
}

export type AddHostEntriesResponse = SetLanPageResponse

export type DeleteHostEntriesRequest = SetLanPageRequest &
  // Except: cbi.apply
  Record<`cbi.rts.dhcp.${string}`, 'Delete' | string> // domain

export type DeleteHostEnteriesResponse = SetLanPageResponse
export type AddStaticARP = SetLanPageRequest & {
  // Except: cbi.apply
  'cbi.cts.arpbind.arpbind.': 'Add' | string
}

export type DeleteStaticARPRequest = SetLanPageRequest &
  // Except: cbi.apply
  Record<`cbi.rts.arpbind.${string}`, 'Delete' | string> // arpbind

export type DeleteStaticARPResponse = SetLanPageResponse

type IPAddress = {
  addr: string
  netmask: string
  prefix: number
}

type SubDevice = {
  name: string
  ifname: string
  macaddr: string
  type: string
  is_up: boolean
  rx_bytes: number
  rx_packets: number
  tx_bytes: number
  tx_packets: number
}

export type GetLanStatusResult = {
  id: string
  type: string
  name: string
  ifname: string
  macaddr: string
  is_up: boolean
  uptime: number
  proto: string
  ipaddrs: IPAddress[]

  dnsaddrs: string[]
  rx_bytes: number
  rx_packets: number
  tx_bytes: number
  tx_packets: number
  ip6addrs: []
  subdevices: SubDevice[]
}
export type GetLanStatusResponse =
  | (StatusMessageType & {
      result: GetLanStatusResult
    })
  | EmptyProps
