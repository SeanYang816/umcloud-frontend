import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { resetXpbState } from 'actions/global'
import {
  ConnectionsResponse,
  RealtimeGraphsResponse,
  TrafficGetDeviceResponse,
  TrafficGetDeviceStatusResponse,
} from 'types/xpb510/status/RealTimeGraphs'

// Slice state: null initially, object when fetched
export type RealTimeGraphsState = {
  load: RealtimeGraphsResponse | null
  traffic: TrafficGetDeviceResponse | null
  trafficStatus: TrafficGetDeviceStatusResponse | null
  connections: ConnectionsResponse | null
}

const initialState: RealTimeGraphsState = {
  load: null,
  traffic: null,
  trafficStatus: null,
  connections: null,
}

export const slice = createSlice({
  name: 'realtimeGraphs',
  initialState: initialState as RealTimeGraphsState, // force correct type
  reducers: {
    resetRealTimeGraphsState: () => initialState,
    getRealTimeGraphsLoad: (
      state,
      action: PayloadAction<RealtimeGraphsResponse>,
    ) => {
      state.load = action.payload
    },
    getRealTimeGraphsTraffic: (
      state,
      action: PayloadAction<TrafficGetDeviceResponse>,
    ) => {
      state.traffic = action.payload
    },
    getRealTimeGraphsTrafficStatus: (
      state,
      action: PayloadAction<TrafficGetDeviceStatusResponse>,
    ) => {
      state.trafficStatus = action.payload
    },
    getRealTimeGraphsConnections: (
      state,
      action: PayloadAction<ConnectionsResponse>,
    ) => {
      state.connections = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetXpbState, () => initialState)
  },
})

export const {
  resetRealTimeGraphsState,
  getRealTimeGraphsLoad,
  getRealTimeGraphsTraffic,
  getRealTimeGraphsTrafficStatus,
  getRealTimeGraphsConnections,
} = slice.actions

export const realtimeGraphs = slice.reducer
