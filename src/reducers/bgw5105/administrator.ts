import { createSlice } from '@reduxjs/toolkit'
import { extractLastPartOfKeys } from 'utils/extractLastPartOfKeys'
import { AdministratorStateProps } from 'types/reducers'

const initialState: AdministratorStateProps = {
  system: {
    result: {
      'cbid.system.system.hostname': '',
      'cbid.system.system.log_size': '',
      'cbid.system.system.log_ip': '',
      'cbid.system.system.log_port': '',
      'cbid.system.system.conloglevel': '',
      'cbid.system.system.cronloglevel': '',
      'cbid.system.system.zonename': '',
      'cbid.system.system.daylight_saving_enable': '',
      'cbid.system.system.daylight_saving_offset': '',
      'cbid.system.system.daylight_saving_start_month': '',
      'cbid.system.system.daylight_saving_start_week': '',
      'cbid.system.system.daylight_saving_start_day_of_week': '',
      'cbid.system.system.daylight_saving_start_time': '',
      'cbid.system.system.daylight_saving_end_month': '',
      'cbid.system.system.daylight_saving_end_week': '',
      'cbid.system.system.daylight_saving_end_day_of_week': '',
      'cbid.system.system.daylight_saving_end_time': '',
      'cbid.system.system.clock_mode': '',
      'cbid.system.system.localtime_year': '',
      'cbid.system.system.localtime_month': '',
      'cbid.system.system.localtime_day': '',
      'cbid.system.system.localtime_hour': '',
      'cbid.system.system.localtime_minute': '',
      'cbid.system.system.localtime_second': '',
      'cbid.system.system.ntpserver': '',
    },
  },
  administration: {
    result: {
      'cbid.system._pass.us': '',
      'cbid.system._pass.pwold': '',
      'cbid.system._pass.pw1': '',
      'cbid.system._pass.pw2': '',
      'cbid.system._pass.idletimeout': '',
    },
  },
  accessManagement: {
    result: {
      'cbid.uhttpd.main.lo_iface_en': '',
      'cbid.uhttpd.main.lo_iface': [],
      'cbid.uhttpd.main.lo_http_en': '',
      'cbid.uhttpd.main.lo_http_port': '',
      'cbid.uhttpd.main.lo_https_en': '',
      'cbid.uhttpd.main.lo_https_port': '',
      'cbid.uhttpd.main.lo_telnet_en': '',
      'cbid.uhttpd.main.lo_telnet_port': '',
      'cbid.uhttpd.main.lo_ssh_en': '',
      'cbid.uhttpd.main.lo_ssh_port': '',
      'cbid.uhttpd.main.lo_ssh_pa': '',
      'cbid.uhttpd.main.re_iface_en': '',
      'cbid.uhttpd.main.re_iface': [],
      'cbid.uhttpd.main.re_http_en': '',
      'cbid.uhttpd.main.re_http_port': '',
      'cbid.uhttpd.main.re_https_en': '',
      'cbid.uhttpd.main.re_https_port': '',
    },
    options: {},
  },
  schedule: {
    result: {},
  },
  scheduleEdit: {
    result: {},
  },
  backupFlashFirmware: {
    result: {
      filename: '',
      'Content-Type': '',
      data: '',
    },
  },
  reboot: {
    result: {
      'cbid.autoreboot.reboot_config.time_schedule': '',
    },
    options: {},
  },
}

type propertyNameType =
  | 'system'
  | 'administration'
  | 'accessManagement'
  | 'schedule'
  | 'scheduleEdit'
  | 'backupFlashFirmware'
  | 'reboot'

export const slice = createSlice({
  name: 'administrator',
  initialState,
  reducers: {
    clearAdministratorProperty: () => {
      return initialState
    },
    clearProperty: (state, { payload }) => {
      const propertyName: propertyNameType = payload
      if (propertyName === 'system') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'administration') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'accessManagement') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'schedule') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'scheduleEdit') {
        state[propertyName] = initialState[propertyName]
      } else if (propertyName === 'backupFlashFirmware') {
        state[propertyName] = initialState[propertyName]
      } else {
        // propertyName === 'reboot'
        state[propertyName] = initialState[propertyName]
      }
    },
    getSystem: (state, { payload }) => {
      state.system = { ...payload }
    },
    updateSystem: (state, { payload }) => {
      const { msg, status, result } = payload
      state.system = { ...msg, ...status, ...result }
    },
    getAdministration: (state, { payload }) => {
      // 因為 Administration 的機制有些問題, 顧這暫時沒用到
      state.administration = {
        ...payload,
        result: { ...extractLastPartOfKeys(payload.result) },
      }
    },
    updateAdministration: (state, { payload }) => {
      // 因為 Administration 的機制有些問題, 顧這暫時沒用到
      const { msg, status } = payload
      state.administration = {
        ...msg,
        ...status,
        result: { ...extractLastPartOfKeys(payload.result) },
      }
    },
    getSchedule: (state, { payload }) => {
      state.schedule = { ...payload }
    },
    updateSchedule: (state, { payload }) => {
      const { msg, status, result } = payload
      state.schedule = { ...{ msg, status, result } }
    },
    getScheduleEdit: (state, { payload }) => {
      state.scheduleEdit = { ...payload }
    },
    updateScheduleEdit: (state, { payload }) => {
      const { msg, status, result } = payload
      state.scheduleEdit = { ...{ msg, status, result } }
    },
    getAccessManagement: (state, { payload }) => {
      state.accessManagement = { ...state.accessManagement, ...payload }
    },
    updateAccessManagement: (state, { payload }) => {
      const { msg, status, result } = payload
      state.accessManagement = {
        ...state.accessManagement,
        ...{ msg, status, result },
      } // 這支API不會回傳options
    },
    getReboot: (state, { payload }) => {
      state.reboot = { ...state.reboot, ...payload }
    },
    updateReboot: (state, { payload }) => {
      const { msg, status, result } = payload
      state.reboot = { ...state.reboot, ...{ msg, status, result } }
    },
    getBackupFlashFirmware: (state, { payload }) => {
      state.reboot = { ...state.reboot, ...payload }
    },
    updateBackupFlashFirmware: (state, { payload }) => {
      const { msg, status, result } = payload
      state.reboot = { ...state.reboot, ...{ msg, status, result } }
    },
    getBackupVersion: (state, { payload }) => {
      state.backupFlashFirmware.version = payload.result
    },
  },
})

export const {
  clearAdministratorProperty,
  clearProperty,
  getSystem,
  updateSystem,
  getAdministration,
  updateAdministration,
  getSchedule,
  getScheduleEdit,
  updateSchedule,
  updateScheduleEdit,
  getAccessManagement,
  updateAccessManagement,
  getBackupFlashFirmware,
  updateBackupFlashFirmware,
  getBackupVersion,
  getReboot,
  updateReboot,
} = slice.actions

export const administrator = slice.reducer
