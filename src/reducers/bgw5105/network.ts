import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lan: {
    result: {},
    options: {},
    suggest: {},
  },
  lanStatus: null,
}
const slice = createSlice({
  name: 'basicConfig',
  initialState,
  reducers: {
    clearNetworkProperty: () => {
      return initialState
    },
    getLan: (state, { payload }) => {
      state.lan = { ...state.lan, ...payload }
    },
    updateLan: (state, { payload }) => {
      const { msg, status, result } = payload
      state.lan = { ...state.lan, ...{ msg, status, result } }
    },
    updateLanStatus: (state, { payload }) => {
      state.lanStatus = payload
    },
  },
})

export const { clearNetworkProperty, getLan, updateLan, updateLanStatus } =
  slice.actions
export const network = slice.reducer
