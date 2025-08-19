/** 4.4 System Log */

import { StatusMessageType } from 'types'

// 4.4.1 Get System Log
export type GetSystemLogResponse = StatusMessageType & {
  result: {
    data: string
  }
}

// 4.4.2 Clear System Log
export type ClearSystemLogResponse = StatusMessageType
