/** 3.8 Reboot */

import { StatusMessageType } from 'types'

// 3.8.1 Perform Reboot
export type PerformRebootRequest = {
  reboot: '1' | string
}

export type PerformRebootResponse = StatusMessageType

// 3.8.2 Get Settings Page
export type GetSettingsPageResponse = StatusMessageType & {
  result: {
    'cbid.autoreboot.reboot_config.time_schedule': string
    options?: Record<string, unknown>
  }
}

export type SetSettingsPageRequest = {
  'cbi.submit': '1' | string
  'cbi.apply'?: 'Apply' | string
  'cbid.autoreboot.reboot_config.time_schedule': string
}

export type SetSettingsPageResponse = GetSettingsPageResponse & {
  apply?: string
}
