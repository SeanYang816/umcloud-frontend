import { ExternalDataType } from 'enums'
import { StatusMessageType } from 'types'

// Event: xpb-510:external-data:get-data-source
// IoT 第一層顯示用
export type GetExternalDataSourceRequest = {
  requestId: string
  event: string
  mac: string
  serialNumber: string
}

export type ExternalDataSource = {
  mac: string
  serialNumber: string
  portNumber: number
  alias: string
  latestTemperature: number
  latestHumidity: number
  updatedAt: Date
  createdAt: Date
}

export type GetExternalDataSourceResponse = {
  channel: string
  requestEvent: string
  requestId: string
  event: string
  mac: string
  serialNumber: string
  sources: ExternalDataSource[]
}

// 抓溫度或濕度用
export type GetExternalDataRequest = {
  requestId: string
  event: string
  mac: string
  serialNumber: string
  portNumber: number

  sourceId: string
  dataType: ExternalDataType

  channel: string
  requestEvent: string
}

export type GetExternalDataResponse = {
  requestId: string
  event: string

  mac: string
  serialNumber: string
  portNumber: number

  dataType: ExternalDataType
  data: { value: number; timestamp: Date }[]

  channel: string
  requestEvent: string
}
// --------------------------------------------
export type WsGetThingTemperatureRequest = {
  event: 'getThingTemperature'
  mac: string
}

export type TemperatureLog = {
  temperature: number
  createdAt: Date
}

export type WsThingTemperatureResponse = {
  event: 'getThingTemperature'
  mac: string
  temperatureLogs: TemperatureLog[]
}

export type WsGetThingHumidityRequest = {
  event: 'getThingHumidity'
  mac: string
}

export type HumidityLog = {
  humidity: number
  createdAt: Date
}

export type WsGetThingHumidityResponse = {
  event: 'getThingHumidity'
  mac: string
  humidityLogs: HumidityLog[]
}

export type ClimateHistory = {
  temperature: number
  humidity: number
  timestamp: Date
}

export type GetClimateHistoryResponse = StatusMessageType & {
  result: {
    history: ClimateHistory[]
  }
}

export type SetSourceAliasRequest = {
  requestId: string
  event: string
  mac: string
  serialNumber: string
  portNumber: number

  alias: string

  channel: string
  requestEvent: string
}

export type SetSourceAliasResponse = {
  requestId: string
  event: string

  mac: string
  serialNumber: string
  portNumber: number

  alias: string

  channel: string
  requestEvent: string
}
