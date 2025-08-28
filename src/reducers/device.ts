import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Thing } from 'generated/graphql'

export type DeviceState = Thing | null

const initialState: DeviceState = null

const slice = createSlice({
  name: 'device',
  initialState: initialState as DeviceState, // force correct type
  reducers: {
    updateDevice: (_state, action: PayloadAction<Thing>) => {
      return action.payload
    },
  },
})

export const { updateDevice } = slice.actions
export const device = slice.reducer
