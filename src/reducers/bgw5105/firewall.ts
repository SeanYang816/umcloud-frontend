import { createSlice } from '@reduxjs/toolkit'
import { FirewallStateProps } from 'types/reducers'

const initialState: FirewallStateProps = {
  generalSettings: {
    result: {
      'cbid.firewall.wan_ping.enabled': '',
    },
  },
  portForward: {
    result: {
      portforward: [],
    },
    options: {},
    suggest: {},
  },
  portForwardEdit: {
    result: {},
    options: {},
    suggest: {},
  },
  portTrigger: {
    result: {
      trigger: [],
    },
    options: {},
  },
  portTriggerEdit: {
    result: {},
    options: {},
    suggest: {},
  },
  ipFiltering: {
    result: {
      rule: [],
    },
    options: {},
    suggest: {},
  },
  ipFilteringEdit: {
    result: {},
    options: {},
    suggest: {},
  },
  macFiltering: {
    result: {
      'cbid.firewall.mac_filter.enabled': '',
      'cbid.firewall.mac_filter.mode': '',
      macfilter: [],
    },
    options: {},
    suggest: {},
  },
  macFilteringEdit: {
    result: {},
    options: {},
    suggest: {},
  },
  urlFiltering: {
    result: {
      'cbid.firewall.urlfilter.enabled': '',
      'cbid.firewall.urlfilter.blockurl': [],
      'cbid.firewall.urlfilter.time_schedule': '',
    },
    options: {},
  },
  trafficRules: {
    result: {
      rule: {},
    },
    options: {},
  },
  trafficRulesEdit: {
    result: {},
    options: {},
    suggest: {},
  },
  dosPrevention: {
    result: {
      'cbid.firewall.dos.tcp_enabled': '',
      'cbid.firewall.dos.tcp_rate': '',
      'cbid.firewall.dos.tcp_burst': '',
      'cbid.firewall.dos.udp_enabled': '',
      'cbid.firewall.dos.udp_rate': '',
      'cbid.firewall.dos.udp_burst': '',
      'cbid.firewall.dos.icmp_enabled': '',
      'cbid.firewall.dos.icmp_rate': '',
      'cbid.firewall.dos.icmp_burst': '',
    },
  },
  dmzHost: {
    result: {
      'cbid.dmz.dmz.enable': '',
      'cbid.dmz.dmz.dmz_ip': '',
    },
  },
  oneToOneNat: {
    result: {
      staticnat: [],
      wan_proto: '',
      wan_static_ip: '',
      wan2_proto: '',
      wan2_static_ip: '',
    },
    options: {},
    suggest: {},
  },
  oneToOneNatEdit: {
    result: {},
    options: {},
    suggest: {},
  },
}

type propertyNameType =
  | 'generalSettings'
  | 'portForward'
  | 'portForwardEdit'
  | 'portTrigger'
  | 'portTriggerEdit'
  | 'ipFiltering'
  | 'ipFilteringEdit'
  | 'macFiltering'
  | 'macFilteringEdit'
  | 'urlFiltering'
  | 'trafficRules'
  | 'trafficRulesEdit'
  | 'dosPrevention'
  | 'dmzHost'
  | 'oneToOneNat'
  | 'oneToOneNatEdit'

export const slice = createSlice({
  name: 'firewall',
  initialState: initialState,
  reducers: {
    clearFirewallProperty: () => {
      return initialState
    },
    clearProperty: (state, { payload }) => {
      const propertyName: propertyNameType = payload
      if (propertyName === 'generalSettings') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'portForward') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'portForwardEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'portTrigger') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'portTriggerEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'ipFiltering') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'ipFilteringEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'macFiltering') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'macFilteringEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'urlFiltering') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'trafficRules') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'trafficRulesEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'dosPrevention') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'dmzHost') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'oneToOneNat') {
        state[propertyName] = initialState[propertyName]
      } else {
        // propertyName === 'oneToOneNatEdit'
        state[propertyName] = initialState[propertyName]
      }
    },
    getWanPingRespond: (state, { payload }) => {
      state.generalSettings = { ...state.generalSettings, ...payload }
    },
    updateWanPingRespond: (state, { payload }) => {
      const { msg, status, result } = payload
      state.generalSettings = {
        ...state.generalSettings,
        ...{ msg, status, result },
      }
    },
    getPortForward: (state, { payload }) => {
      state.portForward = { ...state.portForward, ...payload }
    },
    updatePortForward: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portForward = { ...state.portForward, ...{ msg, status, result } }
    },
    getPortForwardEdit: (state, { payload }) => {
      state.portForwardEdit = { ...state.portForwardEdit, ...payload }
    },
    updatePortForwardEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portForwardEdit = {
        ...state.portForwardEdit,
        ...{ msg, status, result },
      }
    },
    getPortTrigger: (state, { payload }) => {
      state.portTrigger = { ...state.portTrigger, ...payload }
    },
    updatePortTrigger: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portTrigger = { ...state.portTrigger, ...{ msg, status, result } }
    },
    getPortTriggerEdit: (state, { payload }) => {
      state.portTriggerEdit = { ...state.portTriggerEdit, ...payload }
    },
    updatePortTriggerEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portTriggerEdit = {
        ...state.portTriggerEdit,
        ...{ msg, status, result },
      }
    },
    getIpFiltering: (state, { payload }) => {
      state.ipFiltering = { ...state.ipFiltering, ...payload }
    },
    updateIpFiltering: (state, { payload }) => {
      const { msg, status, result } = payload
      state.ipFiltering = { ...state.ipFiltering, ...{ msg, status, result } }
    },
    getIpFilteringEdit: (state, { payload }) => {
      state.ipFilteringEdit = { ...state.ipFilteringEdit, ...payload }
    },
    updateIpFilteringEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.ipFilteringEdit = {
        ...state.ipFilteringEdit,
        ...{ msg, status, result },
      }
    },
    getMacFiltering: (state, { payload }) => {
      state.macFiltering = { ...state.macFiltering, ...payload }
    },
    updateMacFiltering: (state, { payload }) => {
      const { msg, status, result } = payload
      state.macFiltering = { ...state.macFiltering, ...{ msg, status, result } }
    },
    getMacFilteringEdit: (state, { payload }) => {
      state.macFilteringEdit = { ...state.macFilteringEdit, ...payload }
    },
    updateMacFilteringEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.macFilteringEdit = {
        ...state.macFilteringEdit,
        ...{ msg, status, result },
      }
    },
    getUrlFiltering: (state, { payload }) => {
      state.urlFiltering = { ...state.urlFiltering, ...payload }
    },
    updateUrlFiltering: (state, { payload }) => {
      const { msg, status, result } = payload
      state.urlFiltering = { ...state.urlFiltering, ...{ msg, status, result } }
    },
    getTrafficRules: (state, { payload }) => {
      state.trafficRules = { ...state.trafficRules, ...payload }
    },
    updateTrafficRules: (state, { payload }) => {
      const { msg, status, result } = payload
      state.trafficRules = { ...state.trafficRules, ...{ msg, status, result } }
    },
    getTrafficRulesEdit: (state, { payload }) => {
      state.trafficRulesEdit = { ...state.trafficRulesEdit, ...payload }
    },
    updateTrafficRulesEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.trafficRulesEdit = {
        ...state.trafficRulesEdit,
        ...{ msg, status, result },
      }
    },
    getDosPrevent: (state, { payload }) => {
      state.dosPrevention = { ...state.dosPrevention, ...payload }
    },
    updateDosPrevent: (state, { payload }) => {
      const { msg, status, result } = payload
      state.dosPrevention = {
        ...state.dosPrevention,
        ...{ msg, status, result },
      }
    },
    getDmzHost: (state, { payload }) => {
      state.dmzHost = { ...state.dmzHost, ...payload }
    },
    updateDmzHost: (state, { payload }) => {
      const { msg, status, result } = payload
      state.dmzHost = { ...state.dmzHost, ...{ msg, status, result } }
    },
    getOneToOneNat: (state, { payload }) => {
      state.oneToOneNat = { ...state.oneToOneNat, ...payload }
    },
    updateOneToOneNat: (state, { payload }) => {
      const { msg, status, result } = payload
      state.oneToOneNat = { ...state.oneToOneNat, ...{ msg, status, result } }
    },
    getOneToOneNatEdit: (state, { payload }) => {
      state.oneToOneNatEdit = { ...state.oneToOneNatEdit, ...payload }
    },
    updateOneToOneNatEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.oneToOneNatEdit = {
        ...state.oneToOneNatEdit,
        ...{ msg, status, result },
      }
    },
  },
})

export const {
  clearFirewallProperty,
  clearProperty,
  getWanPingRespond,
  updateWanPingRespond,
  getPortForward,
  getPortForwardEdit,
  updatePortForward,
  updatePortForwardEdit,
  getPortTrigger,
  getPortTriggerEdit,
  updatePortTrigger,
  updatePortTriggerEdit,
  getIpFiltering,
  getIpFilteringEdit,
  updateIpFiltering,
  updateIpFilteringEdit,
  getMacFiltering,
  getMacFilteringEdit,
  updateMacFiltering,
  updateMacFilteringEdit,
  getUrlFiltering,
  updateUrlFiltering,
  getTrafficRules,
  getTrafficRulesEdit,
  updateTrafficRules,
  updateTrafficRulesEdit,
  getDosPrevent,
  updateDosPrevent,
  getDmzHost,
  updateDmzHost,
  getOneToOneNat,
  getOneToOneNatEdit,
  updateOneToOneNat,
  updateOneToOneNatEdit,
} = slice.actions

export const firewall = slice.reducer
