import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetXpbState } from 'actions/global'
import { GetSystemLogResponse } from 'types/xpb510/status/systemLog'

// Slice state: null initially, object when fetched
export type SystemLogState = GetSystemLogResponse | null

const initialState: SystemLogState = null

export const slice = createSlice({
  name: 'systemLog',
  initialState: initialState as SystemLogState, // force correct type
  reducers: {
    resetSystemLogState: () => initialState,
    getSystemLog: (_state, action: PayloadAction<GetSystemLogResponse>) =>
      action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(resetXpbState, () => initialState)
  },
})

export const { resetSystemLogState, getSystemLog } = slice.actions
export const systemLog = slice.reducer
