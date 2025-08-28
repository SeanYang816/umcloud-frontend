import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetClimateHistoryResponse } from 'types/xpb510/iot/iot'

type IotState = {
  climate: GetClimateHistoryResponse | null
}

const initialState: IotState = {
  climate: null,
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
  },
})

export const { resetIot, getClimateHistory } = slice.actions
export const climateControl = slice.reducer
