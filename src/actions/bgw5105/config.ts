import { SERVER_ACTIONS } from 'constant'
import {
  updateApplySetting,
  updateApplyStatus,
  updateDataChanges,
  updateRevertStatus,
} from 'reducers/bgw5105/config'

export const getConfigs = {
  [SERVER_ACTIONS.CONFIG_GET_CHANGES]: updateDataChanges,
  [SERVER_ACTIONS.CONFIG_APPLY_SETTINGS]: updateApplySetting,
  [SERVER_ACTIONS.CONFIG_REVERT_CHANGES]: updateRevertStatus,
  [SERVER_ACTIONS.CONFIG_GET_APPLY_STATUS]: updateApplyStatus,
}
