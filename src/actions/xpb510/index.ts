import { XPB_EVENT_ACTIONS } from 'constant'
import {
  getAccessManagement,
  updateAccessManagement,
} from 'reducers/xpb510/administrator/accessManagement'
import { getBackupFlashFirmwareVersion } from 'reducers/xpb510/administrator/backupFlashFirmware'
import {
  getSchedule,
  getScheduleEdit,
  updateSchedule,
  updateScheduleEdit,
} from 'reducers/xpb510/administrator/schedule'
import {
  getLocalTime,
  getSystem,
  updateLocalTime,
  updateSystem,
} from 'reducers/xpb510/administrator/system'
import {
  getClimateHistory,
  getFanStatus,
  setFanStatus,
} from 'reducers/xpb510/iot/climateControl'
import {
  getExternalData,
  getExternalDataSource,
  updateExternalDataSourceAlias,
} from 'reducers/xpb510/iot/externalData'
import { getAlg, updateAlg } from 'reducers/xpb510/network/alg'
import {
  getDmzHost,
  getDosPrevent,
  getGeneralSettings,
  getOneToOneNat,
  getOneToOneNatEdit,
  getPortForward,
  getPortForwardEdit,
  getPortTrigger,
  getPortTriggerEdit,
  getTrafficRules,
  getTrafficRulesEdit,
  updateDmzHost,
  updateDosPrevent,
  updateGeneralSettings,
  updateOneToOneNat,
  updateOneToOneNatEdit,
  updatePortForward,
  updatePortForwardEdit,
  updatePortTrigger,
  updatePortTriggerEdit,
  updateTrafficRules,
  updateTrafficRulesEdit,
} from 'reducers/xpb510/network/firewall'
import { getLan, updateLan, updateLanStatus } from 'reducers/xpb510/network/lan'
import {
  getBgp,
  getOspf,
  getOspfEdit,
  getRip,
  getRipEdit,
  getStaticRoutes,
  updateBgp,
  updateOspf,
  updateOspfEdit,
  updateRip,
  updateRipEdit,
  updateStaticRoutes,
} from 'reducers/xpb510/network/routing'
import { getOverview } from 'reducers/xpb510/status/overview'
import {
  getRealTimeGraphsConnections,
  getRealTimeGraphsLoad,
  getRealTimeGraphsTraffic,
  getRealTimeGraphsTrafficStatus,
} from 'reducers/xpb510/status/realtimeGraphs'
import { getRoutes } from 'reducers/xpb510/status/routes'

export const xpbActionSetters = {
  // Climate Control
  [XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_SET_SOURCE_ALIAS]:
    updateExternalDataSourceAlias,
  [XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_SET_FAN_STATUS]: setFanStatus,

  // LAN
  [XPB_EVENT_ACTIONS.XPB_510_LAN_SET_LAN_PAGE]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_ADD_STATIC_LEASES]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_DELETE_STATIC_LEASES]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_ADD_HOST_ENTRIES]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_DELETE_HOST_ENTRIES]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_ADD_STATIC_ARP]: updateLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_DELETE_STATIC_ARP]: updateLan,

  // Firewall
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_GENERAL_SETTINGS_PAGE]:
    updateGeneralSettings,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_FORWARD_PAGE]: updatePortForward,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_PORT_FORWARD_RULE]: updatePortForward,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_DELETE_PORT_FORWARD_RULE]:
    updatePortForward,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_FORWARD_EDIT_PAGE]:
    updatePortForwardEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_TRIGGER_PAGE]: updatePortTrigger,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_PORT_TRIGGER_RULE]: updatePortTrigger,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_DELETE_PORT_TRIGGER_RULE]:
    updatePortTrigger,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE]:
    updatePortTriggerEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_TRAFFIC_RULES_PAGE]:
    updateTrafficRules,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES]:
    updateTrafficRules,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES]:
    updateTrafficRules,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_DELETE_TRAFFIC_RULES]: updateTrafficRules,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE]:
    updateTrafficRulesEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_DOS_PREVENTION_PAGE]:
    updateDosPrevent,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_DMZ_HOST_PAGE]: updateDmzHost,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_ONE_TO_ONE_NAT_PAGE]:
    updateOneToOneNat,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_DELETE_ONE_TO_ONE_NAT]: updateOneToOneNat,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE]:
    updateOneToOneNatEdit,

  // ALG
  [XPB_EVENT_ACTIONS.XPB_510_ALG_SET_ALG_PAGE]: updateAlg,

  // Routing
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_STATIC_ROUTES_PAGE]:
    updateStaticRoutes,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_ADD_STATIC_IPV4_ROUTES]:
    updateStaticRoutes,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_DELETE_STATIC_IPV4_ROUTES]:
    updateStaticRoutes,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_RIP_PAGE]: updateRip,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_RIP_EDIT_PAGE]: updateRipEdit,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_OSPF_PAGE]: updateOspf,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_OSPF_EDIT_PAGE]: updateOspfEdit,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_BGP_PAGE]: updateBgp,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_ADD_BGP_IPV4_NEIGHBOR]: updateBgp,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_DELETE_BGP_IPV4_NEIGHBOR]: updateBgp,

  // System
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_SET_SYSTEM_TIME_DATE_PAGE]: updateSystem,
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_SET_LOCAL_TIME]: updateLocalTime,

  // Administration
  [XPB_EVENT_ACTIONS.XPB_510_ADMINISTRATION_SET_ADMINISTRATION_PAGE]:
    'xpb-510:administration:set-administration-page',

  // Schedule
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_SET_SCHEDULE_PAGE]: updateSchedule,
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_ADD_SCHEDULE_RULE]: updateSchedule,
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_DELETE_SCHEDULE_RULE]: updateSchedule,
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_SET_SCHEDULE_EDIT_PAGE]:
    updateScheduleEdit,

  // Access Management
  [XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE]:
    updateAccessManagement,
  [XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_DOWNLOAD_SSH_PRIVATE_KEY]:
    'xpb-510:access-management:download-ssh-private-key',
  [XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS]:
    'xpb-510:access-management:regenerate-ssh-keys',

  // Firmware
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_DO_FIRMWARE_UPGRADE]:
    'xpb-510:firmware:do-firmware-upgrade',
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_DOWNLOAD_CONFIGURATION_BACKUP]:
    'xpb-510:firmware:download-configuration-backup',
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_RESTORE_CONFIGURATION_BACKUP]:
    'xpb-510:firmware:restore-configuration-backup',
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_RESET_TO_DEFAULTS]:
    'xpb-510:firmware:reset-to-defaults',

  // Reboot
  [XPB_EVENT_ACTIONS.XPB_510_REBOOT_PERFORM_REBOOT]:
    'xpb-510:reboot:perform-reboot',
  [XPB_EVENT_ACTIONS.XPB_510_REBOOT_SET_SETTINGS_PAGE]:
    'xpb-510:reboot:set-settings-page',

  // System Log
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_LOG_CLEAR_SYSTEM_LOG]:
    'xpb-510:system:clear-system-log',

  // Config
  [XPB_EVENT_ACTIONS.XPB_510_CONFIG_SAVE_CHANGES]:
    'xpb-510:config:save-changes',
  [XPB_EVENT_ACTIONS.XPB_510_CONFIG_APPLY_SETTINGS]:
    'xpb-510:config:apply-settings',
  [XPB_EVENT_ACTIONS.XPB_510_CONFIG_REVERT_CHANGES]:
    'xpb-510:config:revert-changes',
}

export const xpbActionGetters = {
  // Overview
  [XPB_EVENT_ACTIONS.XPB_510_OVERVIEW_GET_STATUS_OVERVIEW_PAGE]: getOverview,
  [XPB_EVENT_ACTIONS.XPB_510_OVERVIEW_GET_DDNS_OVERVIEW_PAGE]:
    'xpb-510:overviewPage:get-ddns-overview-page',
  [XPB_EVENT_ACTIONS.XPB_510_OVERVIEW_GET_MWAN_OVERVIEW_PAGE]:
    'xpb-510:overviewPage:get-mwan-overview-page',

  // Climate Control
  [XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA_SOURCE]:
    getExternalDataSource,
  [XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA]: getExternalData,
  [XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_GET_FAN_STATUS]: getFanStatus,
  [XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_GET_CLIMATE_STATUS]:
    'xpb-510:climate-control:get-climate-status',
  [XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_GET_CLIMATE_HISTORY]:
    getClimateHistory,

  // LAN
  [XPB_EVENT_ACTIONS.XPB_510_LAN_GET_LAN_PAGE]: getLan,
  [XPB_EVENT_ACTIONS.XPB_510_LAN_GET_LAN_STATUS]: updateLanStatus,

  // Firewall
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_GENERAL_SETTINGS_PAGE]:
    getGeneralSettings,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_FORWARD_PAGE]: getPortForward,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_FORWARD_EDIT_PAGE]:
    getPortForwardEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_TRIGGER_PAGE]: getPortTrigger,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE]:
    getPortTriggerEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_TRAFFIC_RULES_PAGE]: getTrafficRules,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_TRAFFIC_RULES_EDIT_PAGE]:
    getTrafficRulesEdit,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_DOS_PREVENTION_PAGE]: getDosPrevent,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_DMZ_HOST_PAGE]: getDmzHost,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_ONE_TO_ONE_NAT_PAGE]: getOneToOneNat,
  [XPB_EVENT_ACTIONS.XPB_510_FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE]:
    getOneToOneNatEdit,

  // ALG
  [XPB_EVENT_ACTIONS.XPB_510_ALG_GET_ALG_PAGE]: getAlg,

  // Routing
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_STATIC_ROUTES_PAGE]: getStaticRoutes,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_RIP_PAGE]: getRip,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_RIP_EDIT_PAGE]: getRipEdit,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_OSPF_PAGE]: getOspf,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_OSPF_EDIT_PAGE]: getOspfEdit,
  [XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_BGP_PAGE]: getBgp,

  // System
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_GET_SYSTEM_TIME_DATE_PAGE]: getSystem,
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_GET_LOCAL_TIME]: getLocalTime,

  // Administration
  [XPB_EVENT_ACTIONS.XPB_510_ADMINISTRATION_GET_ADMINISTRATION_PAGE]:
    'xpb-510:administration:get-administration-page',

  // Schedule
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_GET_SCHEDULE_PAGE]: getSchedule,
  [XPB_EVENT_ACTIONS.XPB_510_SCHEDULE_GET_SCHEDULE_EDIT_PAGE]: getScheduleEdit,

  // Access Management
  [XPB_EVENT_ACTIONS.XPB_510_ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE]:
    getAccessManagement,

  // Firmware
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_GET_RESTORE_RESULT]:
    'xpb-510:firmware:get-restore-result',
  [XPB_EVENT_ACTIONS.XPB_510_FIRMWARE_GET_FIRMWARE_VERSION]:
    getBackupFlashFirmwareVersion,

  // Reboot
  [XPB_EVENT_ACTIONS.XPB_510_REBOOT_GET_SETTINGS_PAGE]:
    'xpb-510:reboot:get-settings-page',

  // Cellular / Routes
  [XPB_EVENT_ACTIONS.XPB_510_CELLULAR_GET_CELLULAR_PAGE]:
    'xpb-510:cellular:get-cellular-page',
  [XPB_EVENT_ACTIONS.XPB_510_ROUTES_GET_ROUTE_ARP_PAGE]: getRoutes,

  // System Log
  [XPB_EVENT_ACTIONS.XPB_510_SYSTEM_LOG_GET_SYSTEM_LOG]:
    'xpb-510:system:get-system-log',

  // Real-time graphs (non-GET)
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_LOAD]: getRealTimeGraphsLoad,
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_LAN_AND_WLAN]:
    'xpb-510:real-time-graphs:traffic-lan-and-wlan',
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_WAN]:
    'xpb-510:real-time-graphs:traffic-wan',
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_WWAN]:
    'xpb-510:real-time-graphs:traffic-wwan',
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_CONNECTIONS]:
    getRealTimeGraphsConnections,
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_QUERY_NAME_INFO]:
    'xpb-510:real-time-graphs:query-name-info',

  // Real-time graphs (GET variants)
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE]:
    getRealTimeGraphsTraffic,
  [XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS]:
    getRealTimeGraphsTrafficStatus,

  // WAN
  [XPB_EVENT_ACTIONS.XPB_510_WAN_GET_WAN_STATUS]: 'xpb-510:wan:get-wan-status',

  // Config
  [XPB_EVENT_ACTIONS.XPB_510_CONFIG_GET_CHANGES]: 'xpb-510:config:get-changes',
  [XPB_EVENT_ACTIONS.XPB_510_CONFIG_GET_APPLY_STATUS]:
    'xpb-510:config:get-apply-status',
}
