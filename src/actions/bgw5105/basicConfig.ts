import { SERVER_ACTIONS } from 'constant'
import { getBasicConfig } from 'reducers/bgw5105/basicConfig'
import { getLan, updateLan, updateLanStatus } from 'reducers/bgw5105/network'
import {
  updateWireless2PrimaryStatus,
  updateWireless5PrimaryStatus,
} from 'reducers/bgw5105/wireless'

export const getBasicConfigs = {
  [SERVER_ACTIONS.OVERVIEW_GET_STATUS_OVERVIEW_PAGE]: getBasicConfig,

  [SERVER_ACTIONS.LAN_GET_LAN_PAGE]: getLan,
  [SERVER_ACTIONS.LAN_GET_LAN_STATUS]: updateLanStatus,

  [SERVER_ACTIONS.WIRELESS_GET_WIRELESS2_PRIMARY_STATUS]:
    updateWireless2PrimaryStatus,

  [SERVER_ACTIONS.WIRELESS_GET_WIRELESS5_PRIMARY_STATUS]:
    updateWireless5PrimaryStatus,
}

export const updateBasicConfigs = {
  [SERVER_ACTIONS.LAN_SET_LAN_PAGE]: updateLan,
  [SERVER_ACTIONS.LAN_ADD_STATIC_LEASES]: updateLan,
  [SERVER_ACTIONS.LAN_DELETE_STATIC_LEASES]: updateLan,
  [SERVER_ACTIONS.LAN_ADD_HOST_ENTRIES]: updateLan,
  [SERVER_ACTIONS.LAN_DELETE_HOST_ENTRIES]: updateLan,
  [SERVER_ACTIONS.LAN_ADD_STATIC_ARP]: updateLan,
  [SERVER_ACTIONS.LAN_DELETE_STATIC_ARP]: updateLan,
}
