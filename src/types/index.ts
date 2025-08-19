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
import { ConfigStateProps } from 'reducers/bgw5105/config'
import { GlobalProps } from 'reducers/bgw5105/global'
import { GetOverviewPageResponse } from './xpb510/status/overview'
import {
  GetClimateHistoryResponse,
  GetFanStatusResponse,
} from './xpb510/iot/iot'
import { FirewallState } from 'reducers/xpb510/network/firewall'
import { LanPageState } from 'reducers/xpb510/network/lan'
import { AlgPageState } from 'reducers/xpb510/network/alg'
import { RoutingState } from 'reducers/xpb510/network/routing'
import { SystemState } from 'reducers/xpb510/administrator/system'
import { ScheduleState } from 'reducers/xpb510/administrator/schedule'
import { AccessManagementState } from 'reducers/xpb510/administrator/accessManagement'
import { BackupFlashFirmwareState } from 'reducers/xpb510/administrator/backupFlashFirmware'
import { RebootState } from 'reducers/xpb510/administrator/reboot'
import { SystemLogState } from 'reducers/xpb510/status/systemLog'
import { RoutesState } from 'reducers/xpb510/status/routes'
import { RealTimeGraphsState } from 'reducers/xpb510/status/realtimeGraphs'

export type Bgw5105StateProps = {
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

export type Xpb510StateProps = {
  status: {
    overview: GetOverviewPageResponse
    systemLog: SystemLogState
    routes: RoutesState
    realtimeGraphs: RealTimeGraphsState
  }
  iot: {
    climateControl: {
      climate: GetClimateHistoryResponse | null
      fan: GetFanStatusResponse | null
    }
  }
  network: {
    firewall: FirewallState
    lan: LanPageState
    alg: AlgPageState
    routing: RoutingState
  }
  administrator: {
    system: SystemState
    schedule: ScheduleState
    accessManagement: AccessManagementState
    backupFlashFirmware: BackupFlashFirmwareState
    reboot: RebootState
  }
}

export type RootStateProps = {
  bgw5105: Bgw5105StateProps
  xpb510: Xpb510StateProps
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

export type OnChangeFn<T> = (_updater: T | ((_prev: T) => T)) => void

export type BoolString = '0' | '1' | string

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
