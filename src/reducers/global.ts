import { createSlice } from '@reduxjs/toolkit'

export type GlobalProps = {
  notification: {
    event: string
    code: string
    message: string
  }
  isWSConnected: boolean
}
const initialState: GlobalProps = {
  notification: {
    event: '',
    code: '',
    message: '',
  },
  isWSConnected: false,
}

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateNotification: (state, { payload }) => {
      state.notification = { ...payload }
    },
    clearNotification: (state) => {
      state.notification = initialState.notification
    },
    updateWebSocketStatus: (state, { payload }) => {
      state.isWSConnected = payload
    },
  },
})

export const { updateNotification, clearNotification, updateWebSocketStatus } =
  slice.actions
export const global = slice.reducer
