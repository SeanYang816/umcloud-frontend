import { EmptyProps, MessageStatusProps, OptionsOrSuggestType } from 'types'

export type GetLanPage =
  | ({
      result: {
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
        [key: string]: string
      }
      options: OptionsOrSuggestType
      // {
      //   'cbid.dhcp.lan.ignore': StringStringType[];
      //   'cbid.dhcp.lan.__natmode': StringStringType[];
      //   'cbid.dhcp.lan.proto': StringStringType[];
      // }
      suggest: OptionsOrSuggestType
    } & MessageStatusProps)
  | EmptyProps

export type SetLanPage = {
  'cbi.apply'?: string
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
  [key: string]: string
}

export type GetLANStatus =
  | ({
      result: {
        id: string
        type: string
        name: string
        ifname: string
        macaddr: string
        is_up: boolean
        uptime: number
        proto: string
        ipaddrs: {
          addr: string
          netmask: string
          prefix: number
        }[]
        ip6addrs: {
          addr: string
          netmask: string
          prefix: number
        }[]
        dnsaddrs: string[]
        rx_bytes: number
        rx_packets: number
        tx_bytes: number
        tx_packets: number
        subdevices: {
          name: string
          ifname: string
          macaddr: string
          type: string
          is_up: boolean
          rx_bytes: number
          rx_packets: number
          tx_bytes: number
          tx_packets: number
        }[]
      }
    } & MessageStatusProps)
  | EmptyProps

export type AddStaticLeasesProps = {
  'cbi.cts.dhcp.host.': string
}

export type DeleteStaticLeasesProps = {
  [key: string]: string
}

export type AddHostEntriesProps = {
  'cbi.cts.dhcp.domain.': string
}

export type DeleteHostEntriesProps = {
  [key: string]: string
}

export type AddStaticARPProps = {
  'cbi.cts.arpbind.arpbind.': string
}

export type DeleteStaticARPProps = {
  [key: string]: string
}
