/** 1.8.1 Static Routes */

import { BoolString, Options, StatusMessageType, Suggest } from 'types'

// 1.8.1.1 Get Static Routes Page
export type GetStaticRoutesPageResult = {
  route: string[]
} & Record<
  | `cbid.network.${string}.master_interface`
  | `cbid.network.${string}.target`
  | `cbid.network.${string}.netmask`
  | `cbid.network.${string}.gateway`
  | `cbid.network.${string}.metric`,
  string
>

export type GetStaticRoutesPageResponse = StatusMessageType & {
  result: GetStaticRoutesPageResult
  options: Options
}

// 1.8.1.2 Set Static Routes Page
export type SetStaticRoutesPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
} & GetStaticRoutesPageResult

export type SetStaticRoutesPageResponse = GetStaticRoutesPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.8.1.3 Add Static IPv4 Routes
export type AddStaticIPv4RoutesRequest = SetStaticRoutesPageRequest & {
  // Except: cbi.apply
  'cbi.cts.network.route.': 'Add' | string
}

export type AddStaticIPv4RoutesResponse = SetStaticRoutesPageResponse

// 1.8.1.4 Delete Static IPv4 Routes
export type DeleteStaticIPv4RoutesRequest = SetStaticRoutesPageRequest & {
  // Except: cbi.apply
} & Record<`cbi.rts.network.${string}`, 'Delete' | string>

/** 1.8.2 RIP */

// 1.8.2.1 Get RIP Page
export type GetRipPageResult = {
  'cbid.ripd.config.enable': string
  'cbid.ripd.config.version': string
  'rip-interface': string[]
} & Record<
  | `cbid.ripd.${string}.name`
  | `cbid.ripd.${string}.enabled`
  | `cbid.ripd.${string}.send_version`
  | `cbid.ripd.${string}.receive_version`
  | `cbid.ripd.${string}.authentication`
  | `cbid.ripd.${string}.key_string`
  | `cbid.ripd.${string}.key_mode`,
  string
>
export type GetRipPageResponse = StatusMessageType & {
  result: GetRipPageResult
  options: Options
}

// 1.8.2.2 Set RIP Page
export type SetRIPPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.ripd.config.enable': string
  'cbid.ripd.config.version': string
}

export type SetRIPPageResponse = GetRipPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.8.2.3 Get RIP Edit Page
export type VersionOption = '1' | '2'
export type GetRipEditPageResponse = StatusMessageType & {
  result: {} & Record<`cbid.ripd.${string}.rip_enable`, '1' | BoolString> &
    Record<`cbid.ripd.${string}.send_version`, '2' | VersionOption> &
    Record<`cbid.ripd.${string}.receive_version`, '2' | VersionOption> &
    Record<`cbid.ripd.${string}.authentication`, BoolString> &
    Record<`cbid.ripd.${string}.key_string`, '123' | string> &
    Record<`cbid.ripd.${string}.key_mode`, BoolString>
  options: Partial<Record<string, unknown>>
}

// 1.8.2.4 Set RIP Edit Page
export type SetRIPEditPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
} & Record<`cbid.ripd.${string}.rip_enable`, BoolString> &
  Record<`cbid.ripd.${string}.send_version`, '2' | VersionOption> &
  Record<`cbid.ripd.${string}.receive_version`, '2' | VersionOption> &
  Record<`cbid.ripd.${string}.authentication`, '0' | BoolString> &
  Record<`cbid.ripd.${string}.key_string`, '123' | string> &
  Record<`cbid.ripd.${string}.key_mode`, '0' | BoolString>

export type SetRIPEditPageResponse = GetRipEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

/** 1.8.3 OSPF */

// 1.8.3.1 GetOSPFPage
export type GetOspfPageResponse = StatusMessageType & {
  result: {
    'cbid.ospfd.config.enable': '0' | BoolString
    'cbid.ospfd.config.router_id': '192.168.10.1' | string
    'cbid.ospfd.config.neighbor_ip': string[]
    'ospf-interface': string[]
  } & Partial<
    Record<
      `cbid.ospfd.${string}.${
        | 'name'
        | 'enabled'
        | 'network_type'
        | 'authentication'
        | 'key_string'
        | 'key_mode'
        | 'cost'
        | 'priority'
        | 'area'}`,
      string
    >
  >
  options: Partial<Record<string, unknown>>
}

// 1.8.3.2 Set OSPF Page
export type SetOSPFPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
  'cbid.ospfd.config.enable': BoolString
  'cbid.ospfd.config.router_id': '192.168.10.1' | string
  'cbid.ospfd.config.neighbor_ip': string[]
}

export type SetOSPFPageResponse = GetOspfPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.8.3.3 Get OSPF Edit Page
export type GetOSPFEditPageResponse = StatusMessageType & {
  result: Record<
    `cbid.ospfd.${string}.${
      | 'ospf_enable'
      | 'network_type'
      | 'authentication'
      | 'key_string'
      | 'key_mode'
      | 'cost'
      | 'priority'
      | 'area'}`,
    string
  >
  options: Partial<Record<string, unknown>>
}

export type SetOSPFEditPageResponse = GetOSPFEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

/** 1.8.4 BGP */

// 1.8.4.1 Get BGP Page
export type GetBgpPageResult = {
  'cbid.bgpd.config.enable': string
  'cbid.bgpd.config.router_id': string // ip4addr
  'cbid.bgpd.config.asn': string
  'bgp-interface': string[]
  neighbor: string[]
} & Record<
  `cbid.bgpd.${string}.${'name' | 'bgp_enable' | 'neighbor_ip' | 'authentication' | 'key_string' | 'remote_as'}`,
  string
>
export type GetBgpPageResponse = StatusMessageType & {
  result: GetBgpPageResult
  options?: Options
  suggest: Suggest
}

// 1.8.4.2 Set BGP Page
export type SetBGPPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
  'cbid.bgpd.config.enable': BoolString
  'cbid.bgpd.config.router_id': string // ip4addr
} & Partial<Record<`cbid.bgpd.${string}.${'name' | 'bgp_enable'}`, string>> &
  Partial<
    Record<
      `cbid.bgpd.${string}.${'neighbor_ip' | 'authentication' | 'key_string' | 'remote_as'}`,
      string
    >
  >

export type SetBGPPageResponse = GetBgpPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.8.4.3 Add BGP IPv4 Neighbor
export type AddBGPIPv4NeighborRequest = SetBGPPageRequest & {
  // Except: cib.apply
}

export type AddBGPIPv4NeighborResponse = SetBGPPageResponse

// 1.8.4.4 Delete BGP IPv4 Neighbor
export type DeleteBGPIPv4NeighborRequest = SetBGPPageRequest & {
  // Except: cib.apply
} & Record<`cbi.rts.bgpd.${string}`, 'Delete' | string>

export type DeleteBGPIPv4NeighborResponse = SetBGPPageResponse
