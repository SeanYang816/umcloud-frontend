import { BGW_EVENT_ACTIONS } from 'constant'
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
  [BGW_EVENT_ACTIONS.FIREWALL_SET_GENERAL_SETTINGS_PAGE]: updateWanPingRespond,
  // Port Forward
  [BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_FORWARD_PAGE]: updatePortForward,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_PORT_FORWARD_RULE]: updatePortForward,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_PORT_FORWARD_RULE]: updatePortForward,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_FORWARD_EDIT_PAGE]:
    updatePortForwardEdit,
  // Port Trigger
  [BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_TRIGGER_PAGE]: updatePortTrigger,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_PORT_TRIGGER_RULE]: updatePortTrigger,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_PORT_TRIGGER_RULE]: updatePortTrigger,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE]:
    updatePortTriggerEdit,
  // IP Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_SET_IP_FILTERING_PAGE]: updateIpFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_IP_FILTERING_RULE]: updateIpFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_IP_FILTERING_RULE]: updateIpFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_IP_FILTERING_EDIT_PAGE]:
    updateIpFilteringEdit,
  // Mac Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_SET_MAC_FILTERING_PAGE]: updateMacFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_MAC_FILTERING_RULE]: updateMacFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_MAC_FILTERING_RULE]: updateMacFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_MAC_FILTERING_EDIT_PAGE]:
    updateMacFilteringEdit,
  // Url Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_SET_URL_FILTERING_PAGE]: updateUrlFiltering,
  // Traffic Rules
  [BGW_EVENT_ACTIONS.FIREWALL_SET_TRAFFIC_RULES_PAGE]: updateTrafficRules,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES]: updateTrafficRules,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES]:
    updateTrafficRules,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_TRAFFIC_RULES]: updateTrafficRules,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE]:
    updateTrafficRulesEdit,
  // DoS Prevention
  [BGW_EVENT_ACTIONS.FIREWALL_SET_DOS_PREVENTION_PAGE]: updateDosPrevent,
  // DMZ Host
  [BGW_EVENT_ACTIONS.FIREWALL_SET_DMZ_HOST_PAGE]: updateDmzHost,
  // One-to-one Nat
  [BGW_EVENT_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_PAGE]: updateOneToOneNat,
  [BGW_EVENT_ACTIONS.FIREWALL_ADD_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [BGW_EVENT_ACTIONS.FIREWALL_DELETE_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [BGW_EVENT_ACTIONS.FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE]:
    updateOneToOneNatEdit,
}

export const getFirewalls = {
  // General Settings
  [BGW_EVENT_ACTIONS.FIREWALL_GET_GENERAL_SETTINGS_PAGE]: getWanPingRespond,
  // Port Forward
  [BGW_EVENT_ACTIONS.FIREWALL_GET_PORT_FORWARD_PAGE]: getPortForward,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_PORT_FORWARD_EDIT_PAGE]: getPortForwardEdit,
  // Port Trigger
  [BGW_EVENT_ACTIONS.FIREWALL_GET_PORT_TRIGGER_PAGE]: getPortTrigger,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE]: getPortTriggerEdit,
  // IP Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_GET_IP_FILTERING_PAGE]: getIpFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_IP_FILTERING_EDIT_PAGE]: getIpFilteringEdit,
  // Mac Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_GET_MAC_FILTERING_PAGE]: getMacFiltering,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_MAC_FILTERING_EDIT_PAGE]: getMacFilteringEdit,
  // Url Filtering
  [BGW_EVENT_ACTIONS.FIREWALL_GET_URL_FILTERING_PAGE]: getUrlFiltering,
  // Traffic Rules
  [BGW_EVENT_ACTIONS.FIREWALL_GET_TRAFFIC_RULES_PAGE]: getTrafficRules,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_TRAFFIC_RULES_EDIT_PAGE]: getTrafficRulesEdit,
  // DoS Prevention
  [BGW_EVENT_ACTIONS.FIREWALL_GET_DOS_PREVENTION_PAGE]: getDosPrevent,
  // DMZ Host
  [BGW_EVENT_ACTIONS.FIREWALL_GET_DMZ_HOST_PAGE]: getDmzHost,
  // One-to-one Nat
  [BGW_EVENT_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_PAGE]: getOneToOneNat,
  [BGW_EVENT_ACTIONS.FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE]: getOneToOneNatEdit,
}
