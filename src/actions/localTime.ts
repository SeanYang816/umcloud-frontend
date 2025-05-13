import { SERVER_ACTIONS } from 'constant'
import { getLocalTime, syncLocalTime } from 'reducers/localTime'

export const getLocalTimes = {
  [SERVER_ACTIONS.SYSTEM_GET_LOCAL_TIME]: getLocalTime,
  [SERVER_ACTIONS.SYSTEM_SET_LOCAL_TIME]: syncLocalTime,
}
