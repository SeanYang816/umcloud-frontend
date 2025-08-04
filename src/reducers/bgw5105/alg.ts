import { createSlice } from '@reduxjs/toolkit'
import { AlgStateProps } from 'types/reducers'

const initialState: AlgStateProps = {
  alg: {
    result: {
      'cbid.alg.alg.ftp': '',
      'cbid.alg.alg.tftp': '',
      'cbid.alg.alg.snmp': '',
      'cbid.alg.alg.sip': '',
      'cbid.alg.alg.rtsp': '',
      'cbid.alg.alg.irc': '',
      'cbid.alg.alg.h323': '',
      'cbid.alg.alg.pptp_pth': '',
      'cbid.alg.alg.12tp_pth': '',
      'cbid.alg.alg.ipsec_pth': '',
      'cbid.alg.alg.relay': '',
    },
    options: {},
  },
}

export const slice = createSlice({
  name: 'alg',
  initialState,
  reducers: {
    clearAlgProperty: () => {
      return initialState
    },
    getAlg: (state, { payload }) => {
      state.alg = { ...state.alg, ...payload }
    },
    updateAlg: (state, { payload }) => {
      const { msg, status, result } = payload
      state.alg = { ...state.alg, ...{ msg, status, result } }
    },
  },
})

export const { clearAlgProperty, getAlg, updateAlg } = slice.actions
export const alg = slice.reducer
