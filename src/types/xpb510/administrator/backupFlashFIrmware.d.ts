/** 3.7 Backup / Flash Firmware */

import { StatusMessageType } from 'types'
import { RestoreResult } from '.'

// 3.7.1 Download backup
export type DownloadBackupRequest = {
  exec: '1' | string
  backup: '1' | string
}

export type DownloadBackupResponse = StatusMessageType & {
  result?: {
    filename: 'backup-UMRouter-YYYY-MM-DD.dat' | string
    'Content-Type': 'application/x-targz' | string
    data: string
  }
}

// 3.7.2 Restore backup

export type RestoreBackupRequest = {
  exec: '1' | string
  restore: '1' | string
  archive: 'backup-UMRouter-YYYY-MM-DD.dat' | string
  dl_link: string
}

export type RestoreBackupResponse = StatusMessageType

// 3.7.3 Get Restore Result
export type GetRestoreResultResponse = StatusMessageType & {
  result: {
    config_result: '-1' | RestoreResult
  }
}

// 3.7.4 Reset to defaults
export type ResetToDefaultRequest = {
  exec: '1' | string
  reset: 'reset' | string
}

export type ResetToDefaultResponse = StatusMessageType

export type GetBackupFlashFirmwareVersionResponse = StatusMessageType & {
  result: string
}
