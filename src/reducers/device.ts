import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'device',
  initialState: {
    info: {
      mac: null,
      sn: null,
      channel: null,
      row: null,
    },
  },
  reducers: {
    updateDevice: (state, { payload }) => {
      state.info = payload
    },
  },
})

export const { updateDevice } = slice.actions
export const device = slice.reducer
