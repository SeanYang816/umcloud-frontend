/** 4.5 Real-time Graphs */

import { StatusMessageType } from 'types'

// 4.5.1 Load
export type RealtimeGraphsResponse = StatusMessageType & {
  result: [number, number, number, number][]
}

// 4.5.2 Traffic - Get device
export type TrafficGetDeviceResponse = StatusMessageType & {
  result: {
    [key: string]: string
  }
}

// 4.5.3 Traffic - Get device status
export type TrafficGetDeviceStatusResponse = StatusMessageType & {
  result: {
    [key: string]: [number, number, number, number, number]
  }
}

// 4.5.4 Connections
export type Connection = {
  bytes: string
  src: string
  sport: string
  layer4: string
  dst: string
  dport: string
  layer3: string
  packets: string
}

export type ConnectionsResult = {
  statistics: [number, number, number, number][]
  connections: Connection[]
}

export type ConnectionsResponse = StatusMessageType & {
  result: ConnectionsResult
}

// 4.5.5 Query nameinfo
export type QueryNameinfoResponse = StatusMessageType & {
  result: {
    [key: string]: string
  }
}
