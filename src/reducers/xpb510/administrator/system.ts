import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetLocalTimeResponse,
  GetSystemTimeDatePageResponse,
} from 'types/xpb510/administrator/system'

export type SystemTimeState = GetSystemTimeDatePageResponse | null
export type LocalTimeState = GetLocalTimeResponse | null

export type SystemState = {
  timeDate: SystemTimeState
  localTime: LocalTimeState
}

const initialState: SystemState = {
  timeDate: null,
  localTime: null,
}

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    resetSystem: () => initialState,

    getSystem: (
      state,
      { payload }: PayloadAction<GetSystemTimeDatePageResponse>,
    ) => {
      state.timeDate = payload
    },
    updateSystem: (
      state,
      { payload }: PayloadAction<GetSystemTimeDatePageResponse>,
    ) => {
      state.timeDate = payload
    },

    getLocalTime: (state, { payload }: PayloadAction<GetLocalTimeResponse>) => {
      state.localTime = payload
    },
    updateLocalTime: (
      state,
      { payload }: PayloadAction<GetLocalTimeResponse>,
    ) => {
      state.localTime = payload
    },

    syncLocalTime: () => {
      // side-effect handled by saga/thunk if any
    },
  },
})

export const {
  resetSystem,
  getSystem,
  updateLocalTime,
  updateSystem,
  getLocalTime,
  syncLocalTime,
} = slice.actions
export const system = slice.reducer
