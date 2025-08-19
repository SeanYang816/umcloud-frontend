import { StatusMessageType } from 'types'

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

type FanMode =
  | 0 // off
  | 1 // on
  | 2 // auto

type FanStatus = {
  fanMode: FanMode
  deviation: number
  threshold: number
}

export type GetFanStatusResponse = StatusMessageType & {
  result: FanStatus
}

export type SetFanStatusRequestPayload = {
  body: {
    fanMode: FanMode
    deviation: number
    threshold: number
  }
}
