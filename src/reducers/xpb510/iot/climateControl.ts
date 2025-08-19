import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetClimateHistoryResponse,
  GetFanStatusResponse,
} from 'types/xpb510/iot/iot'

type IotState = {
  climate: GetClimateHistoryResponse | null
  fan: GetFanStatusResponse | null
}

const initialState: IotState = {
  climate: null,
  fan: null,
}

export const slice = createSlice({
  name: 'climateControl',
  initialState,
  reducers: {
    resetIot: () => initialState,
    getClimateHistory: (
      state,
      action: PayloadAction<GetClimateHistoryResponse>,
    ) => {
      state.climate = action.payload
    },
    getFanStatus: (state, action: PayloadAction<GetFanStatusResponse>) => {
      state.fan = action.payload
    },
    setFanStatus: (state, action: PayloadAction<GetFanStatusResponse>) => {
      state.fan = action.payload
    },
  },
})

export const { resetIot, getClimateHistory, getFanStatus, setFanStatus } =
  slice.actions
export const climateControl = slice.reducer
