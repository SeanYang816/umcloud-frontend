import { SERVER_ACTIONS } from 'constant'
import {
  getWanPingRespond,
  updateWanPingRespond,
  getPortForward,
  updatePortForward,
  getPortForwardEdit,
  updatePortForwardEdit,
  getPortTrigger,
  updatePortTrigger,
  getPortTriggerEdit,
  updatePortTriggerEdit,
  getIpFiltering,
  updateIpFiltering,
  getIpFilteringEdit,
  updateIpFilteringEdit,
  getDosPrevent,
  updateDosPrevent,
  getOneToOneNat,
  updateOneToOneNat,
  getOneToOneNatEdit,
  updateOneToOneNatEdit,
  getDmzHost,
  updateDmzHost,
  getMacFiltering,
  updateMacFiltering,
  getMacFilteringEdit,
  updateMacFilteringEdit,
  getUrlFiltering,
  updateUrlFiltering,
  getTrafficRules,
  updateTrafficRules,
  getTrafficRulesEdit,
  updateTrafficRulesEdit,
} from 'reducers/bgw5105/firewall'

export const updateFirewalls = {
  // General Settings
  [SERVER_ACTIONS.FIREWALL_SET_GENERAL_SETTINGS_PAGE]: updateWanPingRespond,
  // Port Forward
  [SERVER_ACTIONS.FIREWALL_SET_PORT_FORWARD_PAGE]: updatePortForward,
  [SERVER_ACTIONS.FIREWALL_ADD_PORT_FORWARD_RULE]: updatePortForward,
  [SERVER_ACTIONS.FIREWALL_DELETE_PORT_FORWARD_RULE]: updatePortForward,
  [SERVER_ACTIONS.FIREWALL_SET_PORT_FORWARD_EDIT_PAGE]: updatePortForwardEdit,
  // Port Trigger
  [SERVER_ACTIONS.FIREWALL_SET_PORT_TRIGGER_PAGE]: updatePortTrigger,
  [SERVER_ACTIONS.FIREWALL_ADD_PORT_TRIGGER_RULE]: updatePortTrigger,
  [SERVER_ACTIONS.FIREWALL_DELETE_PORT_TRIGGER_RULE]: updatePortTrigger,
  [SERVER_ACTIONS.FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE]: updatePortTriggerEdit,
  // IP Filtering
  [SERVER_ACTIONS.FIREWALL_SET_IP_FILTERING_PAGE]: updateIpFiltering,
  [SERVER_ACTIONS.FIREWALL_ADD_IP_FILTERING_RULE]: updateIpFiltering,
  [SERVER_ACTIONS.FIREWALL_DELETE_IP_FILTERING_RULE]: updateIpFiltering,
  [SERVER_ACTIONS.FIREWALL_SET_IP_FILTERING_EDIT_PAGE]: updateIpFilteringEdit,
  // Mac Filtering
  [SERVER_ACTIONS.FIREWALL_SET_MAC_FILTERING_PAGE]: updateMacFiltering,
  [SERVER_ACTIONS.FIREWALL_ADD_MAC_FILTERING_RULE]: updateMacFiltering,
  [SERVER_ACTIONS.FIREWALL_DELETE_MAC_FILTERING_RULE]: updateMacFiltering,
  [SERVER_ACTIONS.FIREWALL_SET_MAC_FILTERING_EDIT_PAGE]: updateMacFilteringEdit,
  // Url Filtering
  [SERVER_ACTIONS.FIREWALL_SET_URL_FILTERING_PAGE]: updateUrlFiltering,
  // Traffic Rules
  [SERVER_ACTIONS.FIREWALL_SET_TRAFFIC_RULES_PAGE]: updateTrafficRules,
  [SERVER_ACTIONS.FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES]: updateTrafficRules,
  [SERVER_ACTIONS.FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES]: updateTrafficRules,
  [SERVER_ACTIONS.FIREWALL_DELETE_TRAFFIC_RULES]: updateTrafficRules,
  [SERVER_ACTIONS.FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE]: updateTrafficRulesEdit,
  // DoS Prevention
  [SERVER_ACTIONS.FIREWALL_SET_DOS_PREVENTION_PAGE]: updateDosPrevent,
  // DMZ Host
  [SERVER_ACTIONS.FIREWALL_SET_DMZ_HOST_PAGE]: updateDmzHost,
  // One-to-one Nat
  [SERVER_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_PAGE]: updateOneToOneNat,
  [SERVER_ACTIONS.FIREWALL_ADD_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [SERVER_ACTIONS.FIREWALL_DELETE_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [SERVER_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE]: updateOneToOneNatEdit,
}

export const getFirewalls = {
  // General Settings
  [SERVER_ACTIONS.FIREWALL_GET_GENERAL_SETTINGS_PAGE]: getWanPingRespond,
  // Port Forward
  [SERVER_ACTIONS.FIREWALL_GET_PORT_FORWARD_PAGE]: getPortForward,
  [SERVER_ACTIONS.FIREWALL_GET_PORT_FORWARD_EDIT_PAGE]: getPortForwardEdit,
  // Port Trigger
  [SERVER_ACTIONS.FIREWALL_GET_PORT_TRIGGER_PAGE]: getPortTrigger,
  [SERVER_ACTIONS.FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE]: getPortTriggerEdit,
  // IP Filtering
  [SERVER_ACTIONS.FIREWALL_GET_IP_FILTERING_PAGE]: getIpFiltering,
  [SERVER_ACTIONS.FIREWALL_GET_IP_FILTERING_EDIT_PAGE]: getIpFilteringEdit,
  // Mac Filtering
  [SERVER_ACTIONS.FIREWALL_GET_MAC_FILTERING_PAGE]: getMacFiltering,
  [SERVER_ACTIONS.FIREWALL_GET_MAC_FILTERING_EDIT_PAGE]: getMacFilteringEdit,
  // Url Filtering
  [SERVER_ACTIONS.FIREWALL_GET_URL_FILTERING_PAGE]: getUrlFiltering,
  // Traffic Rules
  [SERVER_ACTIONS.FIREWALL_GET_TRAFFIC_RULES_PAGE]: getTrafficRules,
  [SERVER_ACTIONS.FIREWALL_GET_TRAFFIC_RULES_EDIT_PAGE]: getTrafficRulesEdit,
  // DoS Prevention
  [SERVER_ACTIONS.FIREWALL_GET_DOS_PREVENTION_PAGE]: getDosPrevent,
  // DMZ Host
  [SERVER_ACTIONS.FIREWALL_GET_DMZ_HOST_PAGE]: getDmzHost,
  // One-to-one Nat
  [SERVER_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_PAGE]: getOneToOneNat,
  [SERVER_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE]: getOneToOneNatEdit,
}
