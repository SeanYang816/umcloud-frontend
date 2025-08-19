import { BGW_EVENT_ACTIONS } from 'constant'
import {
  getScheduleEdit,
  updateScheduleEdit,
  getSchedule,
  updateSchedule,
  getSystem,
  updateSystem,
  getAccessManagement,
  updateAccessManagement,
  getReboot,
  updateReboot,
  getBackupFlashFirmware,
  updateBackupFlashFirmware,
  getBackupVersion,
} from 'reducers/bgw5105/administrator'

export const updateAdministrators = {
  // Administration
  [BGW_EVENT_ACTIONS.SYSTEM_SET_SYSTEM_TIME_DATE_PAGE]: updateSystem,
  // Schedule
  [BGW_EVENT_ACTIONS.SCHEDULE_SET_SCHEDULE_PAGE]: updateSchedule,
  [BGW_EVENT_ACTIONS.SCHEDULE_ADD_SCHEDULE_RULE]: updateSchedule,
  [BGW_EVENT_ACTIONS.SCHEDULE_DELETE_SCHEDULE_RULE]: updateSchedule,
  [BGW_EVENT_ACTIONS.SCHEDULE_SET_SCHEDULE_EDIT_PAGE]: updateScheduleEdit,
  // Access Management
  [BGW_EVENT_ACTIONS.ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE]:
    updateAccessManagement,
  [BGW_EVENT_ACTIONS.ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS]:
    updateAccessManagement,
  // Backup Firmware
  [BGW_EVENT_ACTIONS.FIRMWARE_RESET_TO_DEFAULTS]: updateBackupFlashFirmware,
  // Reboot
  [BGW_EVENT_ACTIONS.REBOOT_PERFORM_REBOOT]: updateReboot,
  [BGW_EVENT_ACTIONS.REBOOT_SET_SETTINGS_PAGE]: updateReboot,
}

export const getAdministrators = {
  // Administration
  [BGW_EVENT_ACTIONS.SYSTEM_GET_SYSTEM_TIME_DATE_PAGE]: getSystem,
  // Schedule
  [BGW_EVENT_ACTIONS.SCHEDULE_GET_SCHEDULE_PAGE]: getSchedule,
  [BGW_EVENT_ACTIONS.SCHEDULE_GET_SCHEDULE_EDIT_PAGE]: getScheduleEdit,
  // Access Management
  [BGW_EVENT_ACTIONS.ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE]:
    getAccessManagement,
  // Backup Firmware
  [BGW_EVENT_ACTIONS.FIRMWARE_RESET_TO_DEFAULTS]: getBackupFlashFirmware,
  [BGW_EVENT_ACTIONS.FIRMWARE_GET_FIRMWARE_VERSION]: getBackupVersion,
  // Reboot
  [BGW_EVENT_ACTIONS.REBOOT_PERFORM_REBOOT]: getReboot,
  [BGW_EVENT_ACTIONS.REBOOT_GET_SETTINGS_PAGE]: getReboot,
}
