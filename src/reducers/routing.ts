import { createSlice } from '@reduxjs/toolkit'
import { RoutingStateProps } from 'types/reducers'

const initialState: RoutingStateProps = {
  staticRoutes: {
    result: {
      route: [],
    },
    options: {},
  },
  rip: {
    result: {
      'cbid.ripd.config.enable': '',
      'cbid.ripd.config.version': '',
      'rip-interface': '',
    },
    options: {},
  },
  ripEdit: {
    result: {},
    options: {},
  },
  ospf: {
    result: {
      'cbid.ospfd.config.enable': '',
      'cbid.ospfd.config.router_id': '',
      'cbid.ospfd.config.neighbor_ip': [],
      'ospf-interface': [],
    },
    options: {},
  },
  ospfEdit: {
    result: {},
    options: {},
  },
  bgp: {
    result: {
      'cbid.bgpd.config.enable': '',
      'cbid.bgpd.config.router_id': '',
      'cbid.bgpd.config.asn': '',
      'bgp-interface': [],
      neighbor: [],
    },
    options: {},
    suggest: {},
  },
}

type propertyNameType =
  | 'staticRoutes'
  | 'rip'
  | 'ripEdit'
  | 'ospf'
  | 'ospfEdit'
  | 'bgp'

export const slice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    clearRoutingProperty: () => {
      return initialState
    },
    clearProperty: (state, { payload }) => {
      const propertyName: propertyNameType = payload
      if (propertyName === 'staticRoutes') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'rip') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'ripEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'ospf') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'ospfEdit') {
        state[propertyName] = initialState[propertyName]
      } else {
        // propertyName === 'bgp'
        state.bgp = initialState.bgp
      }
    },
    getStaticRoutes: (state, { payload }) => {
      state.staticRoutes = { ...state.staticRoutes, ...payload }
    },
    updateStaticRoutes: (state, { payload }) => {
      const { msg, status, result } = payload
      state.staticRoutes = { ...state.staticRoutes, ...{ msg, status, result } }
    },
    getRip: (state, { payload }) => {
      state.rip = { ...state.rip, ...payload }
    },
    updateRip: (state, { payload }) => {
      const { msg, status, result } = payload
      state.rip = { ...state.rip, ...{ msg, status, result } }
    },
    getRipEdit: (state, { payload }) => {
      state.ripEdit = { ...state.ripEdit, ...payload }
    },
    updateRipEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.ripEdit = { ...state.ripEdit, ...{ msg, status, result } }
    },
    getOspf: (state, { payload }) => {
      state.ospf = { ...state.ospf, ...payload }
    },
    updateOspf: (state, { payload }) => {
      const { msg, status, result } = payload
      state.ospf = { ...state.ospf, ...{ msg, status, result } }
    },
    getOspfEdit: (state, { payload }) => {
      state.ospfEdit = { ...state.ospfEdit, ...payload }
    },
    updateOspfEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.ospfEdit = { ...state.ospfEdit, ...{ msg, status, result } }
    },
    getBgp: (state, { payload }) => {
      state.bgp = { ...state.bgp, ...payload }
    },
    updateBgp: (state, { payload }) => {
      const { msg, status, result } = payload
      state.bgp = { ...state.bgp, ...{ msg, status, result } }
    },
  },
})

export const {
  clearRoutingProperty,
  clearProperty,
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
