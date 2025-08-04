import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basicConfig: {
    result: {},
  },
}
const slice = createSlice({
  name: 'basicConfig',
  initialState,
  reducers: {
    clearBasicConfigProperty: () => {
      return initialState
    },
    getBasicConfig: (state, { payload }) => {
      const { result } = payload
      state.basicConfig.result = { ...result }
    },
  },
})

export const { clearBasicConfigProperty, getBasicConfig } = slice.actions
export const basicConfig = slice.reducer
