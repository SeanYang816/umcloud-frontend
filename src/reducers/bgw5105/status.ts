import { createSlice } from '@reduxjs/toolkit'
import { StatusStateProps } from 'types/reducers'

const initialState: StatusStateProps = {
  cellular: {
    result: {
      sim_status: 0,
      status: 0,
      type: '',
      net: '',
      wwan: {
        ipaddr: '', //
      },
      wwan6: [
        {
          ipaddr: '',
        },
      ],
      band: '',
      rsrp: '',
      rsrq: '',
      rssi: '',
      imei: '',
      imsi: '',
    },
  },
  routes: {
    result: {
      arp: [
        {
          network: '',
          address: '',
          mac: '',
        },
      ],
      routes_v4: [
        {
          network: '',
          target: '',
          gateway: '',
          metric: '',
          table: '',
        },
      ],
      routes_v6: [
        {
          network: '',
          target: '',
          source: '',
          metric: '',
          table: '',
        },
      ],
      neighbours_v6: [
        {
          network: '',
          address: '',
          mac: '',
        },
      ],
    },
  },
  systemLog: {
    result: {
      data: '',
    },
  },
  realtimeGraph: {
    load: {
      result: [[0]],
    },
    connections: {
      result: {
        statistics: [[0]],
        connections: [
          {
            bytes: '',
            src: '',
            sport: '',
            layer4: '',
            dst: '',
            dport: '',
            layer3: '',
            packets: '',
          },
        ],
      },
    },
    trafficGetDevice: {
      result: {},
    },
    trafficGetDeviceStatus: {
      requestId: '',
      result: [[0]],
    },
  },
}

export const slice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    clearStatusProperty: () => {
      return initialState
    },
    getCellular: (state, { payload }) => {
      state.cellular = { ...state.cellular, ...payload }
    },
    getRoutes: (state, { payload }) => {
      state.routes = { ...state.routes, ...payload }
    },
    getSystemLog: (state, { payload }) => {
      state.systemLog = { ...state.systemLog, ...payload }
    },
    getRealtimeLoad: (state, { payload }) => {
      state.realtimeGraph.load = { ...state.realtimeGraph.load, ...payload }
    },

    getRealtimeGraphsTrafficGetDevice: (state, { payload }) => {
      state.realtimeGraph.trafficGetDevice = {
        ...state.realtimeGraph.trafficGetDevice,
        ...payload,
      }
    },
    getRealtimeGraphsTrafficGetDeviceStatus: (state, { payload }) => {
      state.realtimeGraph.trafficGetDeviceStatus = {
        ...state.realtimeGraph.trafficGetDeviceStatus,
        ...payload,
      }
    },
    clearRealtimeGraphsTrafficGetDeviceStatus: (state) => {
      state.realtimeGraph.trafficGetDeviceStatus =
        initialState.realtimeGraph.trafficGetDeviceStatus
    },

    getRealtimeConnections: (state, { payload }) => {
      state.realtimeGraph.connections = {
        ...state.realtimeGraph.connections,
        ...payload,
      }
    },
  },
})

export const {
  clearStatusProperty,
  getCellular,
  getRoutes,
  getSystemLog,
  getRealtimeLoad,
  getRealtimeConnections,
  getRealtimeGraphsTrafficGetDevice,
  getRealtimeGraphsTrafficGetDeviceStatus,
  clearRealtimeGraphsTrafficGetDeviceStatus,
} = slice.actions

export const status = slice.reducer
