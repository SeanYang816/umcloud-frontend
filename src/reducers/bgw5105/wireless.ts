import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wireless2Primary: {},
  wireless2PrimaryStatus: {},
  wireless2Multiple: {},
  wireless5Primary: {},
  wireless5PrimaryStatus: {},
  wireless5Multiple: {},
}

const slice = createSlice({
  name: 'wireless',
  initialState,
  reducers: {
    clearWirelessProperty: () => {
      return initialState
    },
    getWireless2Primary: (state, { payload }) => {
      state.wireless2Primary = payload
    },
    updateWireless2Primary: (state, { payload }) => {
      const { msg, status, result } = payload

      state.wireless2Primary = {
        ...state.wireless2Primary,
        msg,
        status,
        result,
      }
    },
    updateWireless2PrimaryStatus: (state, { payload }) => {
      state.wireless2PrimaryStatus = payload
    },

    getWireless2Multiple: (state, { payload }) => {
      state.wireless2Multiple = payload
    },
    updateWireless2Multiple: (state, { payload }) => {
      const { msg, status, result } = payload

      state.wireless2Multiple = {
        ...state.wireless2Multiple,
        msg,
        status,
        result,
      }
    },

    getWireless5Primary: (state, { payload }) => {
      state.wireless5Primary = payload
    },
    updateWireless5Primary: (state, { payload }) => {
      const { msg, status, result } = payload

      state.wireless5Primary = {
        ...state.wireless5Primary,
        msg,
        status,
        result,
      }
    },
    updateWireless5PrimaryStatus: (state, { payload }) => {
      state.wireless5PrimaryStatus = payload
    },

    getWireless5Multiple: (state, { payload }) => {
      state.wireless5Multiple = payload
    },
    updateWireless5Multiple: (state, { payload }) => {
      const { msg, status, result } = payload

      state.wireless5Multiple = {
        ...state.wireless5Multiple,
        msg,
        status,
        result,
      }
    },
  },
})

export const {
  clearWirelessProperty,
  getWireless2Primary,
  updateWireless2Primary,
  updateWireless2PrimaryStatus,
  getWireless2Multiple,
  updateWireless2Multiple,
  getWireless5Primary,
  updateWireless5Primary,
  updateWireless5PrimaryStatus,
  getWireless5Multiple,
  updateWireless5Multiple,
} = slice.actions
export const wireless = slice.reducer
