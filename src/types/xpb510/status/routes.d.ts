/** 4.3 Routes */

import { StatusMessageType } from 'types'

// 4.3.1 Routes
export type GetRouteArpPageResponse = StatusMessageType & {
  result: {
    arp: {
      network?: string
      address?: string
      mac?: string
    }
    routes_v4: {
      network?: string
      target?: string
      gateway?: string
      metric?: string
      table?: string
    }
    routes_v6: {
      network?: string
      target?: string
      source?: string
      metric?: string
      table?: string
    }
    neighbours_v6: {
      network?: string
      address?: string
      mac?: string
    }
  }
}
