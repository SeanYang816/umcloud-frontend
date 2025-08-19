/** 3.1 system */

import { BoolString, StatusMessageType } from 'types'
import {
  DayOfWeek,
  Month,
  Hour,
  Week,
  ClockMode,
  Year,
  Day,
  Minute,
  Second,
  DaylightSavingOffset,
  ConsoleLogLevel,
  CronLogLevel,
} from '.'

// 3.1.1 Get System Time / Date Page

export type GetSystemTimeDatePageResult = {
  'cbid.system.system.hostname': string
  'cbid.system.system.log_size': string
  'cbid.system.system.log_ip': string
  'cbid.system.system.log_port': string
  'cbid.system.system.conloglevel': string
  'cbid.system.system.cronloglevel': string
  'cbid.system.system.zonename': string
  'cbid.system.system.daylight_saving_enable': BoolString
  'cbid.system.system.daylight_saving_offset': DaylightSavingOffset
  'cbid.system.system.daylight_saving_start_month': Month
  'cbid.system.system.daylight_saving_start_week': Week
  'cbid.system.system.daylight_saving_start_day_of_week': DayOfWeek
  'cbid.system.system.daylight_saving_start_time': Hour
  'cbid.system.system.daylight_saving_end_month': Month
  'cbid.system.system.daylight_saving_end_week': Week
  'cbid.system.system.daylight_saving_end_day_of_week': DayOfWeek
  'cbid.system.system.daylight_saving_end_time': Hour
  'cbid.system.system.clock_mode': ClockMode
  'cbid.system.system.localtime_year': Year
  'cbid.system.system.localtime_month': Month
  'cbid.system.system.localtime_day': Day
  'cbid.system.system.localtime_hour': Hour
  'cbid.system.system.localtime_minute': Minute
  'cbid.system.system.localtime_second': Second
  'cbid.system.system.ntpserver': string[]
}
export type GetSystemTimeDatePageResponse = StatusMessageType & {
  result: GetSystemTimeDatePageResult
  options?: Record<string, unknown>
}

// 3.1.2 Set System Time / Date Page
export type SetSystemTimeDatePageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.system.system.hostname': string
  'cbid.system.system.log_size': string
  'cbid.system.system.log_ip': string
  'cbid.system.system.log_port': string
  'cbid.system.system.conloglevel': ConsoleLogLevel
  'cbid.system.system.cronloglevel': CronLogLevel
  'cbid.system.system.zonename': string
  'cbid.system.system.daylight_saving_enable': BoolString
  'cbid.system.system.daylight_saving_offset': DaylightSavingOffset
  'cbid.system.system.daylight_saving_start_month': Month
  'cbid.system.system.daylight_saving_start_week': Week
  'cbid.system.system.daylight_saving_start_day_of_week': DayOfWeek
  'cbid.system.system.daylight_saving_start_time': Hour
  'cbid.system.system.daylight_saving_end_month': Month
  'cbid.system.system.daylight_saving_end_week': Week
  'cbid.system.system.daylight_saving_end_day_of_week': DayOfWeek
  'cbid.system.system.daylight_saving_end_time': Hour
  'cbid.system.system.clock_mode': ClockMode
  'cbid.system.system.localtime_year'?: Year
  'cbid.system.system.localtime_month'?: Month
  'cbid.system.system.localtime_day'?: Day
  'cbid.system.system.localtime_hour'?: Hour
  'cbid.system.system.localtime_minute'?: Minute
  'cbid.system.system.localtime_second'?: Second
  'cbid.system.system.ntpserver': string
}

// 3.1.3 Get Local Time
export type GetLocalTimeResponse = StatusMessageType & {
  result: {
    timestring: string
  }
}

// 3.1.3 Set Local Time (Sync with browser)
export type SetLocalTimeRequest = {
  set: string
}

export type SetLocalTimeResponse = GetLocalTimeResponse
