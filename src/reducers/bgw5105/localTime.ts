import { createSlice } from '@reduxjs/toolkit'
import { LocalTimeProps } from 'types/reducers'

const initialState: LocalTimeProps = {
  localTime: {
    result: {
      timestring: '',
    },
  },
}

export const slice = createSlice({
  name: 'localTime',
  initialState,
  reducers: {
    clearLocalTimeProperty: () => {
      return initialState
    },
    getLocalTime: (state, { payload }) => {
      state.bgw5105.localTime = { ...payload }
    },
    syncLocalTime: () => {
      // do nothing
    },
  },
})

export const { clearLocalTimeProperty, getLocalTime, syncLocalTime } =
  slice.actions
export const localTime = slice.reducer
