import { BGW_EVENT_ACTIONS } from 'constant'
import {
  getCellular,
  getRealtimeConnections,
  getRealtimeGraphsTrafficGetDevice,
  getRealtimeGraphsTrafficGetDeviceStatus,
  getRealtimeLoad,
  getRoutes,
  getSystemLog,
} from 'reducers/bgw5105/status'

export const getStatus = {
  [BGW_EVENT_ACTIONS.CELLULAR_GET_CELLULAR_PAGE]: getCellular,
  [BGW_EVENT_ACTIONS.ROUTES_GET_ROUTE_ARP_PAGE]: getRoutes,

  [BGW_EVENT_ACTIONS.SYSTEM_LOG_GET_SYSTEM_LOG]: getSystemLog,
  [BGW_EVENT_ACTIONS.SYSTEM_LOG_CLEAR_SYSTEM_LOG]: getSystemLog,

  [BGW_EVENT_ACTIONS.REAL_TIME_GRAPHS_LOAD]: getRealtimeLoad,

  [BGW_EVENT_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE]:
    getRealtimeGraphsTrafficGetDevice,
  [BGW_EVENT_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS]:
    getRealtimeGraphsTrafficGetDeviceStatus,

  [BGW_EVENT_ACTIONS.REAL_TIME_GRAPHS_CONNECTIONS]: getRealtimeConnections,
  [BGW_EVENT_ACTIONS.REAL_TIME_GRAPHS_QUERY_NAME_INFO]: getRealtimeLoad,
}
