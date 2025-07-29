import { EmptyProps, StatusMessageType, OptionsOrSuggestType } from 'types'

export type GetLanPageRequest = {
  get_options?: '1' | '0'
}
export type GetLanPageResponse =
  | (StatusMessageType & {
      result: {
        // Static keys
        'cbid.network.lan.__natmode': '0' | string
        'cbid.network.lan.proto': 'static' | string
        'cbid.network.lan.ipaddr': '192.168.1.1' | string
        'cbid.network.lan.netmask': '255.255.255.0' | string
        'cbid.network.lan.gateway': string
        'cbid.network.lan.dns': string[]
        'cbid.network.lan.macaddr': string
        'cbid.network.lan.mtu': string
        'cbid.network.lan.metric': string
        'cbid.network.lan.delegate': '1' | '0' | string
        'cbid.network.lan.auto': '1' | '0' | string
        'cbid.network.lan.broadcast': string
        'cbid.network.lan.ip6addr': string
        'cbid.network.lan.ip6assign': '64' | string
        'cbid.network.lan.ip6gw': string
        'cbid.network.lan.ip6hint': string
        'cbid.network.lan.ip6prefix': string

        'cbid.dhcp.lan.ignore': '0' | string
        'cbid.dhcp.lan.relay': '192.0.2.10' | string
        'cbid.dhcp.lan.start': '101' | string
        'cbid.dhcp.lan.end': '199' | string
        'cbid.dhcp.lan.leasetime': '12h' | string
        'cbid.dhcp.lan.wins': string
        'cbid.dhcp.lan.dns1': string
        'cbid.dhcp.lan.dns2': string
        'cbid.dhcp.lan.domain': string
        'cbid.dhcp.lan.dynamicdhcp': '1' | string
        'cbid.dhcp.lan.logqueries': '0' | string

        host: string[]
        domain: string[]
        arpbind: string[]

        // Dynamic keys (Record version — no eslint issues)
      } & Record<`cbid.dhcp.${string}.name`, string> & // host, domain
        Record<`cbid.dhcp.${string}.mac`, string> & // host
        Record<`cbid.dhcp.${string}.ip`, string> & // host, domain
        Record<`cbid.dhcp.${string}.isvlan`, '0' | string> & // host
        Record<`cbid.arpbind.${string}.macaddr`, string> & // arpbind
        Record<`cbid.arpbind.${string}.ipaddr`, string> //arpbind

      options: OptionsOrSuggestType
      suggest: OptionsOrSuggestType
    })
  | EmptyProps

export type SetLanPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
  'cbid.network.lan.__natmode': '0' | string
  'cbid.network.lan.proto'?: 'static' | string
  'cbid.network.lan.ipaddr': '192.168.1.1' | string
  'cbid.network.lan.netmask': '255.255.255.0' | string
  'cbid.network.lan.gateway': string
  'cbid.network.lan.dns': string[]
  'cbid.network.lan.macaddr': string
  'cbid.network.lan.mtu': string
  'cbid.network.lan.metric': string
  'cbid.network.lan.delegate': '1' | '0' | string
  'cbid.network.lan.auto': '1' | '0' | string
  'cbid.network.lan.broadcast': string
  'cbid.network.lan.ip6addr': string
  'cbid.network.lan.ip6assign': string
  'cbid.network.lan.ip6gw': string
  'cbid.network.lan.ip6hint': string
  'cbid.network.lan.ip6prefix': string
  'cbid.dhcp.lan.ignore': '0' | string
  'cbid.dhcp.lan.relay': '192.0.2.10' | string

  'cbid.dhcp.lan.start_addr': '192.168.1.101' | string
  'cbid.dhcp.lan.end_addr': '192.168.1.199' | string
  'cbid.dhcp.lan.leasetime': '24h' | string
  'cbid.dhcp.lan.wins': string
  'cbid.dhcp.lan.dns1': string
  'cbid.dhcp.lan.dns2': string
  'cbid.dhcp.lan.domain': string
  'cbid.dhcp.lan.dynamicdhcp': '1' | '0' | string
  'cbid.dhcp.lan.logqueries': '0' | '1' | string
} & Record<`cbid.dhcp.${string}.name`, string> & // host, domain
  Record<`cbid.dhcp.${string}.mac`, string> & // host
  Record<`cbid.dhcp.${string}.ip`, string> & // host, domain
  Record<`cbid.dhcp.${string}.isvlan`, '0' | string> & // host
  Record<`cbid.arpbind.${string}.macaddr`, string> & // arpbind
  Record<`cbid.arpbind.${string}.ipaddr`, string> // arpbind

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
export type GetLANStatusResponse =
  | (StatusMessageType & {
      result: {
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
    })
  | EmptyProps
