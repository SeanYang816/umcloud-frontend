import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  GetLanPageResponse,
  GetLanStatusResponse,
} from 'types/xpb510/network/lan'

export type LanPageState = {
  lan: GetLanPageResponse | null
  lanStatus: GetLanStatusResponse | null
}

const initialState: LanPageState = { lan: null, lanStatus: null }

const slice = createSlice({
  name: 'lan',
  initialState,
  reducers: {
    resetLan: () => initialState,
    getLan: (state, { payload }: PayloadAction<GetLanPageResponse | null>) => {
      state.lan = payload
    },
    updateLan: (
      state,
      { payload }: PayloadAction<GetLanPageResponse | null>,
    ) => {
      state.lan = payload
    },
    updateLanStatus: (
      state,
      { payload }: PayloadAction<GetLanStatusResponse | null>,
    ) => {
      state.lanStatus = payload
    },
  },
})

export const { resetLan, getLan, updateLan, updateLanStatus } = slice.actions
export const lan = slice.reducer
