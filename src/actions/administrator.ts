import { SERVER_ACTIONS } from 'constant'
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
} from 'reducers/administrator'

export const updateAdministrators = {
  // Administration
  [SERVER_ACTIONS.SYSTEM_SET_SYSTEM_TIME_DATE_PAGE]: updateSystem,
  // Schedule
  [SERVER_ACTIONS.SCHEDULE_SET_SCHEDULE_PAGE]: updateSchedule,
  [SERVER_ACTIONS.SCHEDULE_ADD_SCHEDULE_RULE]: updateSchedule,
  [SERVER_ACTIONS.SCHEDULE_DELETE_SCHEDULE_RULE]: updateSchedule,
  [SERVER_ACTIONS.SCHEDULE_SET_SCHEDULE_EDIT_PAGE]: updateScheduleEdit,
  // Access Management
  [SERVER_ACTIONS.ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE]:
    updateAccessManagement,
  [SERVER_ACTIONS.ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS]:
    updateAccessManagement,
  // Backup Firmware
  [SERVER_ACTIONS.FIRMWARE_RESET_TO_DEFAULTS]: updateBackupFlashFirmware,
  // Reboot
  [SERVER_ACTIONS.REBOOT_PERFORM_REBOOT]: updateReboot,
  [SERVER_ACTIONS.REBOOT_SET_SETTINGS_PAGE]: updateReboot,
}

export const getAdministrators = {
  // Administration
  [SERVER_ACTIONS.SYSTEM_GET_SYSTEM_TIME_DATE_PAGE]: getSystem,
  // Schedule
  [SERVER_ACTIONS.SCHEDULE_GET_SCHEDULE_PAGE]: getSchedule,
  [SERVER_ACTIONS.SCHEDULE_GET_SCHEDULE_EDIT_PAGE]: getScheduleEdit,
  // Access Management
  [SERVER_ACTIONS.ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE]:
    getAccessManagement,
  // Backup Firmware
  [SERVER_ACTIONS.FIRMWARE_RESET_TO_DEFAULTS]: getBackupFlashFirmware,
  [SERVER_ACTIONS.FIRMWARE_GET_FIRMWARE_VERSION]: getBackupVersion,
  // Reboot
  [SERVER_ACTIONS.REBOOT_PERFORM_REBOOT]: getReboot,
  [SERVER_ACTIONS.REBOOT_GET_SETTINGS_PAGE]: getReboot,
}
