import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetScheduleEditPageResponse,
  GetSchedulePageResponse,
} from 'types/xpb510/administrator/schedule'

export type SchedulePageState = GetSchedulePageResponse | null
export type ScheduleEditPageState = GetScheduleEditPageResponse | null

export type ScheduleState = {
  schedule: SchedulePageState
  scheduleEdit: ScheduleEditPageState
}

const initialState: ScheduleState = {
  schedule: null,
  scheduleEdit: null,
}

const slice = createSlice({
  name: 'schedule',
  initialState: initialState as ScheduleState,
  reducers: {
    resetSchedule: () => initialState,
    getSchedule: (
      state,
      { payload }: PayloadAction<GetSchedulePageResponse>,
    ) => {
      state.schedule = payload
    },
    updateSchedule: (
      state,
      { payload }: PayloadAction<GetSchedulePageResponse>,
    ) => {
      state.schedule = payload
    },
    getScheduleEdit: (
      state,
      { payload }: PayloadAction<GetScheduleEditPageResponse>,
    ) => {
      state.scheduleEdit = payload
    },
    updateScheduleEdit: (
      state,
      { payload }: PayloadAction<GetScheduleEditPageResponse>,
    ) => {
      state.scheduleEdit = payload
    },
  },
})

export const {
  resetSchedule,
  getSchedule,
  updateSchedule,
  getScheduleEdit,
  updateScheduleEdit,
} = slice.actions

export const schedule = slice.reducer
