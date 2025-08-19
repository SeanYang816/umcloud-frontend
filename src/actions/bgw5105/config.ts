import { BGW_EVENT_ACTIONS } from 'constant'
import {
  updateApplySetting,
  updateApplyStatus,
  updateDataChanges,
  updateRevertStatus,
} from 'reducers/bgw5105/config'

export const getConfigs = {
  [BGW_EVENT_ACTIONS.CONFIG_GET_CHANGES]: updateDataChanges,
  [BGW_EVENT_ACTIONS.CONFIG_APPLY_SETTINGS]: updateApplySetting,
  [BGW_EVENT_ACTIONS.CONFIG_REVERT_CHANGES]: updateRevertStatus,
  [BGW_EVENT_ACTIONS.CONFIG_GET_APPLY_STATUS]: updateApplyStatus,
}
