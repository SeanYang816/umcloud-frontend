import { BGW_EVENT_ACTIONS } from 'constant'
import { getLocalTime, syncLocalTime } from 'reducers/bgw5105/localTime'

export const getLocalTimes = {
  [BGW_EVENT_ACTIONS.SYSTEM_GET_LOCAL_TIME]: getLocalTime,
  [BGW_EVENT_ACTIONS.SYSTEM_SET_LOCAL_TIME]: syncLocalTime,
}
