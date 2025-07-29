/** 3.3 schedule */

import { StatusMessageType } from 'types'

// 3.3.1 Get Schedule Page
export type GetSchedulePageResponse = StatusMessageType & {
  result: {
    'time-setting': string[]
  } & Partial<
    Record<
      | `cbid.schedule.${string}.name`
      | `cbid.schedule.${string}.days`
      | `cbid.schedule.${string}.start_time`
      | `cbid.schedule.${string}.end_time`,
      string
    >
  >
}

// 3.3.2 Set Schedule Page
export type SetSchedulePageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
}

export type SetSchedulePageResponse = GetSchedulePageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 3.3.3 Add Schedule Rule
export type AddSchedulePageRequest = SetSchedulePageRequest & {
  'schedule-add': 'Add' | string
  '_schedule.name': string
  '_schedule.days': string
  '_schedule.start.time': string
  '_schedule.stop.time': string
}

export type AddSchedulePageResponse = SetSchedulePageResponse

// 3.3.4 Delete Schedule Rule
export type DeleteSchedulePageRequest = SetSchedulePageRequest & {
  // Except: cbi.apply
} & Record<`cbi.rts.schedule.${string}`, 'Delete' | string>

// 3.3.5 Get Schedule Edit Page
export type GetScheduleEditPageResponse = StatusMessageType & {
  result: Record<
    | `cbid.schedule.${string}.name`
    | `cbid.schedule.${string}.days`
    | `cbid.schedule.${string}.start_time`
    | `cbid.schedule.${string}.end_time`
  >
}

// 3.3.6 Set Schedule Edit Page
export type SetScheduleEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'schedule-modify': 'Modify' | string
  '_schedule.name': string
  '_schedule.days': string
  '_schedule.start.time': string
  '_schedule.stop.time': string
}

export type SetScheduleEditPageResponse = GetSchedulePageResponse
