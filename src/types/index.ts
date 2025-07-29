import { Thing, User } from 'generated/graphql'
import {
  BasicConfigProps,
  FirewallStateProps,
  AlgStateProps,
  RoutingStateProps,
  AdministratorStateProps,
  WirelessProps,
  NetworkProps,
  StatusStateProps,
  LocalTimeProps,
} from './reducers'
import { ConfigStateProps } from 'reducers/config'
import { GlobalProps } from 'reducers/global'

export type DefaultRootStateProps = {
  authentication: AuthenticationProps
  device: DeviceStateProps
  basicConfig: BasicConfigProps
  network: NetworkProps
  wireless: WirelessProps
  firewall: FirewallStateProps
  alg: AlgStateProps
  routing: RoutingStateProps
  administrator: AdministratorStateProps
  localTime: LocalTimeProps
  status: StatusStateProps
  config: ConfigStateProps
  global: GlobalProps
}

export type DeviceStateProps = {
  info: {
    mac: string | null
    sn: string | null
    channel: string | null
    row: Thing | null
  }
}

export type AuthenticationProps = {
  token: string
  isAuthenticated: boolean
  user: User | null
}

export type DeviceListProps = {
  list: DeviceItemProps[]
}

type DeviceItemProps = {
  label: string
  value: boolean
}

export type SelectOptionProps = {
  label: string
  value: string
}

export interface DialogProps {
  id: string
  open: boolean
  onClose: () => void
}

export type StringStringType = {
  [key: string]: string
}

export type StringObjectType = {
  [key: string]: string | object
}

export type FormikValuesType = {
  [key: string]: string | boolean | string[] | number | object
}

export type OptionsOrSuggestType = {
  [key: string]: {
    value: string
    text: string
  }[]
}

export type StatusMessageType = {
  status: '0' | string
  msg: 'success' | string
}

export type EmptyProps = Record<string, never>

export type OnChangeFn<T> = (updater: T | ((prev: T) => T)) => void

export type BoolString = '0' | '1'

export type ProtocolOption =
  | 'all' // TCP + UDP
  | 'tcp' // TCP only
  | 'udp' // UDP only

export type WanInterfaceOption =
  | 'all' // WAN1 + WAN2
  | 'wan' // WAN1 only
  | 'wan2' // WAN2 only

export type SourceInterfaceOption =
  | 'lan' // LAN interface
  | 'wan' // WAN1 + WAN2 interfaces

export type Assoc = {
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
