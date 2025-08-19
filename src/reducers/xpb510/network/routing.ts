import { createSlice } from '@reduxjs/toolkit'
import {
  GetBgpPageResponse,
  GetOSPFEditPageResponse,
  GetOspfPageResponse,
  GetRipEditPageResponse,
  GetRIPPageResponse,
  GetStaticRoutesPageResponse,
} from 'types/xpb510/network/routing'

type StaticRoutesState = GetStaticRoutesPageResponse | null
type RipState = GetRIPPageResponse | null
type RipEditState = GetRipEditPageResponse | null
type OspfState = GetOspfPageResponse | null
type OspfEditState = GetOSPFEditPageResponse | null
type BgpState = GetBgpPageResponse | null

export type RoutingState = {
  staticRoutes: StaticRoutesState
  rip: RipState
  ripEdit: RipEditState
  ospf: OspfState
  ospfEdit: OspfEditState
  bgp: BgpState
}

const initialState: RoutingState = {
  staticRoutes: null,
  rip: null,
  ripEdit: null,
  ospf: null,
  ospfEdit: null,
  bgp: null,
}

export const slice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    resetRouting: () => {
      return initialState
    },
    getStaticRoutes: (state, { payload }) => {
      state.staticRoutes = payload
    },
    updateStaticRoutes: (state, { payload }) => {
      state.staticRoutes = payload
    },
    getRip: (state, { payload }) => {
      state.rip = payload
    },
    updateRip: (state, { payload }) => {
      state.rip = payload
    },
    getRipEdit: (state, { payload }) => {
      state.ripEdit = payload
    },
    updateRipEdit: (state, { payload }) => {
      state.ripEdit = payload
    },
    getOspf: (state, { payload }) => {
      state.ospf = payload
    },
    updateOspf: (state, { payload }) => {
      state.ospf = payload
    },
    getOspfEdit: (state, { payload }) => {
      state.ospfEdit = payload
    },
    updateOspfEdit: (state, { payload }) => {
      state.ospfEdit = payload
    },
    getBgp: (state, { payload }) => {
      state.bgp = payload
    },
    updateBgp: (state, { payload }) => {
      state.bgp = payload
    },
  },
})

export const {
  resetRouting,
  getStaticRoutes,
  updateStaticRoutes,
  getRip,
  getRipEdit,
  updateRip,
  updateRipEdit,
  getOspf,
  getOspfEdit,
  updateOspf,
  updateOspfEdit,
  getBgp,
  updateBgp,
} = slice.actions

export const routing = slice.reducer
