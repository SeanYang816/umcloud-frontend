import { SERVER_ACTIONS } from 'constant'
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
  [SERVER_ACTIONS.CELLULAR_GET_CELLULAR_PAGE]: getCellular,
  [SERVER_ACTIONS.ROUTES_GET_ROUTE_ARP_PAGE]: getRoutes,

  [SERVER_ACTIONS.SYSTEM_LOG_GET_SYSTEM_LOG]: getSystemLog,
  [SERVER_ACTIONS.SYSTEM_LOG_CLEAR_SYSTEM_LOG]: getSystemLog,

  [SERVER_ACTIONS.REAL_TIME_GRAPHS_LOAD]: getRealtimeLoad,

  [SERVER_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE]:
    getRealtimeGraphsTrafficGetDevice,
  [SERVER_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS]:
    getRealtimeGraphsTrafficGetDeviceStatus,

  [SERVER_ACTIONS.REAL_TIME_GRAPHS_CONNECTIONS]: getRealtimeConnections,
  [SERVER_ACTIONS.REAL_TIME_GRAPHS_QUERY_NAME_INFO]: getRealtimeLoad,
}
