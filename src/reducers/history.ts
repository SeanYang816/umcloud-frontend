import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'history',
  initialState: {
    info: {},
  },
  reducers: {
    updateHistory: (state, { payload }) => {
      state.info = { ...payload }
    },
  },
})

export const { updateHistory } = slice.actions
export const history = slice.reducer
