import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetSettingsPageResponse } from 'types/xpb510/administrator/reboot'

export type RebootState = GetSettingsPageResponse | null

const initialState: RebootState = null

const slice = createSlice({
  name: 'reboot',
  initialState: initialState as RebootState,
  reducers: {
    resetReboot: () => initialState,
    getReboot: (_state, { payload }: PayloadAction<GetSettingsPageResponse>) =>
      payload,
    updateReboot: (
      _state,
      { payload }: PayloadAction<GetSettingsPageResponse>,
    ) => payload,
  },
})

export const { resetReboot, getReboot, updateReboot } = slice.actions

export const reboot = slice.reducer
