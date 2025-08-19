import { createSlice } from '@reduxjs/toolkit'
import {
  GetDmzHostPageResponse,
  GetDoSPreventionPageResponse,
  GetGeneralSettingsPageResponse,
  GetOneToOneNATEditPageResponse,
  GetOneToOneNatPageResponse,
  GetPortForwardEditPageResponse,
  GetPortForwardPageResponse,
  GetPortTriggerEditPageResponse,
  GetPortTriggerPageResponse,
  GetTrafficRulesEditPageResponse,
  GetTrafficRulesPageResponse,
} from 'types/xpb510/network/firewall'

type GeneralSettingsState = GetGeneralSettingsPageResponse | null
type PortForwardState = GetPortForwardPageResponse | null
type PortForwardEditState = GetPortForwardEditPageResponse | null
type GetPortTriggerState = GetPortTriggerPageResponse | null
type GetPortTriggerEditState = GetPortTriggerEditPageResponse | null
type GetTrafficRulesState = GetTrafficRulesPageResponse | null
type GetTrafficRulesEditState = GetTrafficRulesEditPageResponse | null
type GetDoSPreventionState = GetDoSPreventionPageResponse | null
type GetDmzHostState = GetDmzHostPageResponse | null
type GetOneToOneNatState = GetOneToOneNatPageResponse | null
type GetOneToOneNATEditState = GetOneToOneNATEditPageResponse | null
export type FirewallState = {
  generalSettings: GeneralSettingsState
  portForward: PortForwardState
  portForwardEdit: PortForwardEditState
  portTrigger: GetPortTriggerState
  portTriggerEdit: GetPortTriggerEditState
  trafficRules: GetTrafficRulesState
  trafficRulesEdit: GetTrafficRulesEditState
  dosPrevention: GetDoSPreventionState
  dmzHost: GetDmzHostState
  oneToOneNat: GetOneToOneNatState
  oneToOneNatEdit: GetOneToOneNATEditState
}

const initialState = {
  generalSettings: null as GeneralSettingsState,
  portForward: null as PortForwardState,
  portForwardEdit: null as PortForwardEditState,
  portTrigger: null as GetPortTriggerState,
  portTriggerEdit: null as GetPortTriggerEditState,
  trafficRules: null as GetTrafficRulesState,
  trafficRulesEdit: null as GetTrafficRulesEditState,
  dosPrevention: null as GetDoSPreventionState,
  dmzHost: null as GetDmzHostState,
  oneToOneNat: null as GetOneToOneNatState,
  oneToOneNatEdit: null as GetOneToOneNATEditState,
}

export const slice = createSlice({
  name: 'firewall',
  initialState: initialState,
  reducers: {
    resetFirewallState: () => initialState,
    getGeneralSettings: (state, { payload }) => {
      state.generalSettings = payload
    },
    updateGeneralSettings: (state, { payload }) => {
      const { msg, status, result } = payload
      state.generalSettings = {
        ...state.generalSettings,
        ...{ msg, status, result },
      }
    },
    getPortForward: (state, { payload }) => {
      state.portForward = payload
    },
    updatePortForward: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portForward = { ...state.portForward, ...{ msg, status, result } }
    },
    getPortForwardEdit: (state, { payload }) => {
      state.portForwardEdit = payload
    },
    updatePortForwardEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portForwardEdit = {
        ...state.portForwardEdit,
        ...{ msg, status, result },
      }
    },
    getPortTrigger: (state, { payload }) => {
      state.portTrigger = payload
    },
    updatePortTrigger: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portTrigger = { ...state.portTrigger, ...{ msg, status, result } }
    },
    getPortTriggerEdit: (state, { payload }) => {
      state.portTriggerEdit = payload
    },
    updatePortTriggerEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.portTriggerEdit = {
        ...state.portTriggerEdit,
        ...{ msg, status, result },
      }
    },
    getTrafficRules: (state, { payload }) => {
      state.trafficRules = payload
    },
    updateTrafficRules: (state, { payload }) => {
      const { msg, status, result } = payload
      state.trafficRules = { ...state.trafficRules, ...{ msg, status, result } }
    },
    getTrafficRulesEdit: (state, { payload }) => {
      state.trafficRulesEdit = payload
    },
    updateTrafficRulesEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.trafficRulesEdit = {
        ...state.trafficRulesEdit,
        ...{ msg, status, result },
      }
    },
    getDosPrevent: (state, { payload }) => {
      state.dosPrevention = payload
    },
    updateDosPrevent: (state, { payload }) => {
      const { msg, status, result } = payload
      state.dosPrevention = {
        ...state.dosPrevention,
        ...{ msg, status, result },
      }
    },
    getDmzHost: (state, { payload }) => {
      state.dmzHost = payload
    },
    updateDmzHost: (state, { payload }) => {
      const { msg, status, result } = payload
      state.dmzHost = { ...state.dmzHost, ...{ msg, status, result } }
    },
    getOneToOneNat: (state, { payload }) => {
      state.oneToOneNat = payload
    },
    updateOneToOneNat: (state, { payload }) => {
      const { msg, status, result } = payload
      state.oneToOneNat = { ...state.oneToOneNat, ...{ msg, status, result } }
    },
    getOneToOneNatEdit: (state, { payload }) => {
      state.oneToOneNatEdit = payload
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
  resetFirewallState,
  getGeneralSettings,
  updateGeneralSettings,
  getPortForward,
  getPortForwardEdit,
  updatePortForward,
  updatePortForwardEdit,
  getPortTrigger,
  getPortTriggerEdit,
  updatePortTrigger,
  updatePortTriggerEdit,
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
