import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  DownloadBackupResponse,
  GetBackupFlashFirmwareVersionResponse,
} from 'types/xpb510/administrator/backupFlashFIrmware'

export type BackupFlashFirmwareState = {
  version: GetBackupFlashFirmwareVersionResponse | null
  backup: DownloadBackupResponse | null
}

const initialState: BackupFlashFirmwareState = {
  version: null,
  backup: null,
}

const slice = createSlice({
  name: 'backupFlashFirmware',
  initialState: initialState as BackupFlashFirmwareState,
  reducers: {
    resetBackupFlashFirmware: () => initialState,
    getBackupFlashFirmwareVersion: (
      state,
      { payload }: PayloadAction<GetBackupFlashFirmwareVersionResponse>,
    ) => {
      state.version = payload
    },
    getBackupFlashFirmware: (
      state,
      { payload }: PayloadAction<DownloadBackupResponse>,
    ) => {
      state.backup = payload
    },
    updateBackupFlashFirmware: (
      state,
      { payload }: PayloadAction<DownloadBackupResponse>,
    ) => {
      state.backup = payload
    },
  },
})

export const {
  resetBackupFlashFirmware,
  getBackupFlashFirmwareVersion,
  getBackupFlashFirmware,
  updateBackupFlashFirmware,
} = slice.actions

export const backupFlashFirmware = slice.reducer
