import { combineReducers } from 'redux'
import { system } from './system'
import { schedule } from './schedule'
import { accessManagement } from './accessManagement'
import { backupFlashFirmware } from './backupFlashFirmware'
import { reboot } from './reboot'

export const reducers = combineReducers({
  system,
  schedule,
  accessManagement,
  backupFlashFirmware,
  reboot,
})
