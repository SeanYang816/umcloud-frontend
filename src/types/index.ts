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

export type MessageStatusProps = {
  msg: string
  status: string
}

export type EmptyProps = Record<string, never>
