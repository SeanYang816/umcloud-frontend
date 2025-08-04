export const CUSTOM_OPTION = '-- custom --'
export const ERROR_MAC = '00:00:00:00:00:00'

export const XPB_SERVER_ACTIONS = {
  OVERVIEW_GET_STATUS_OVERVIEW_PAGE_XPB_510:
    'overviewPage:get-status-overview-page:xpb-510',
}

export const SERVER_ACTIONS = {
  CONFIG_GET_CHANGES: 'config:get-changes',
  CONFIG_SAVE_CHANGES: 'config:save-changes',
  CONFIG_APPLY_SETTINGS: 'config:apply-settings',
  CONFIG_REVERT_CHANGES: 'config:revert-changes',
  CONFIG_GET_APPLY_STATUS: 'config:get-apply-status',

  OVERVIEW_GET_STATUS_OVERVIEW_PAGE: 'overviewPage:get-status-overview-page', // BASIC_CONFIG

  LAN_GET_LAN_PAGE: 'lan:get-lan-page',
  LAN_SET_LAN_PAGE: 'lan:set-lan-page',
  LAN_GET_LAN_STATUS: 'lan:get-lan-status',
  LAN_ADD_STATIC_LEASES: 'lan:add-static-leases',
  LAN_DELETE_STATIC_LEASES: 'lan:delete-static-leases',
  LAN_ADD_HOST_ENTRIES: 'lan:add-host-entries',
  LAN_DELETE_HOST_ENTRIES: 'lan:delete-host-entries',
  LAN_ADD_STATIC_ARP: 'lan:add-static-arp',
  LAN_DELETE_STATIC_ARP: 'lan:delete-static-arp',

  WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_CONFIG:
    'wireless:2.4ghz-get-primary-ssid-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_PRIMARY_SSID_CONFIG:
    'wireless:2.4ghz-set-primary-ssid-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_WIFI_STATUS:
    'wireless:2.4ghz-get-primary-ssid-wifi-status',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_1_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-1-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_1_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-1-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_2_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-2-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_2_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-2-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_3_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-3-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_3_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-3-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_4_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-4-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_4_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-4-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_5_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-5-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_5_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-5-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_6_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-6-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_6_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-6-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_7_CONFIG:
    'wireless:2.4ghz-get-multiple-ssid-7-config',
  WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_7_CONFIG:
    'wireless:2.4ghz-set-multiple-ssid-7-config',

  WIRELESS_FIVE_GHZ_GET_PRIMARY_SSID_CONFIG:
    'wireless:5ghz-get-primary-ssid-config',
  WIRELESS_FIVE_GHZ_SET_PRIMARY_SSID_CONFIG:
    'wireless:5ghz-set-primary-ssid-config',
  WIRELESS_FIVE_GHZ_GET_PRIMARY_SSID_WIFI_STATUS:
    'wireless:5ghz-get-primary-ssid-wifi-status',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_1_CONFIG:
    'wireless:5ghz-get-multiple-ssid-1-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_1_CONFIG:
    'wireless:5ghz-set-multiple-ssid-1-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_2_CONFIG:
    'wireless:5ghz-get-multiple-ssid-2-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_2_CONFIG:
    'wireless:5ghz-set-multiple-ssid-2-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_3_CONFIG:
    'wireless:5ghz-get-multiple-ssid-3-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_3_CONFIG:
    'wireless:5ghz-set-multiple-ssid-3-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_4_CONFIG:
    'wireless:5ghz-get-multiple-ssid-4-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_4_CONFIG:
    'wireless:5ghz-set-multiple-ssid-4-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_5_CONFIG:
    'wireless:5ghz-get-multiple-ssid-5-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_5_CONFIG:
    'wireless:5ghz-set-multiple-ssid-5-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_6_CONFIG:
    'wireless:5ghz-get-multiple-ssid-6-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_6_CONFIG:
    'wireless:5ghz-set-multiple-ssid-6-config',
  WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_7_CONFIG:
    'wireless:5ghz-get-multiple-ssid-7-config',
  WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_7_CONFIG:
    'wireless:5ghz-set-multiple-ssid-7-config',

  WIRELESS_GET_WIRELESS2_PRIMARY: 'wireless:get_wireless2_primary',
  WIRELESS_SET_WIRELESS2_PRIAMRY: 'wireless:set_wireless2_primary',
  WIRELESS_GET_WIRELESS2_PRIMARY_STATUS:
    'wireless:get_wireless2_primary_status',

  WIRELESS_GET_WIRELESS2_MULTIPLE: 'wireless:get_wireless2_multiple',
  WIRELESS_SET_WIRELESS2_MULTIPLE: 'wireless:set_wireless2_multiple',

  WIRELESS_GET_WIRELESS5_PRIMARY: 'wireless:get_wireless5_primary',
  WIRELESS_SET_WIRELESS5_PRIAMRY: 'wireless:set_wireless5_primary',
  WIRELESS_GET_WIRELESS5_PRIMARY_STATUS:
    'wireless:get_wireless5_primary_status',

  WIRELESS_GET_WIRELESS5_MULTIPLE: 'wireless:get_wireless5_multiple',
  WIRELESS_SET_WIRELESS5_MULTIPLE: 'wireless:set_wireless5_multiple',

  PING: 'ping',
  // Firewall
  FIREWALL_GET_GENERAL_SETTINGS_PAGE: 'firewall:get-general-settings-page',
  FIREWALL_SET_GENERAL_SETTINGS_PAGE: 'firewall:set-general-settings-page',

  FIREWALL_GET_PORT_FORWARD_PAGE: 'firewall:get-port-forward-page',
  FIREWALL_SET_PORT_FORWARD_PAGE: 'firewall:set-port-forward-page',
  FIREWALL_ADD_PORT_FORWARD_RULE: 'firewall:add-port-forward-rule',
  FIREWALL_DELETE_PORT_FORWARD_RULE: 'firewall:delete-port-forward-rule',
  FIREWALL_GET_PORT_FORWARD_EDIT_PAGE: 'firewall:get-port-forward-edit-page',
  FIREWALL_SET_PORT_FORWARD_EDIT_PAGE: 'firewall:set-port-forward-edit-page',

  FIREWALL_GET_PORT_TRIGGER_PAGE: 'firewall:get-port-trigger-page',
  FIREWALL_SET_PORT_TRIGGER_PAGE: 'firewall:set-port-trigger-page',
  FIREWALL_ADD_PORT_TRIGGER_RULE: 'firewall:add-port-trigger-rule',
  FIREWALL_DELETE_PORT_TRIGGER_RULE: 'firewall:delete-port-trigger-rule',
  FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE: 'firewall:get-port-trigger-edit-page',
  FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE: 'firewall:set-port-trigger-edit-page',

  FIREWALL_GET_IP_FILTERING_PAGE: 'firewall:get-ip-filtering-page',
  FIREWALL_SET_IP_FILTERING_PAGE: 'firewall:set-ip-filtering-page',
  FIREWALL_ADD_IP_FILTERING_RULE: 'firewall:add-ip-filtering-rule',
  FIREWALL_DELETE_IP_FILTERING_RULE: 'firewall:delete-ip-filtering-rule',
  FIREWALL_GET_IP_FILTERING_EDIT_PAGE: 'firewall:get-ip-filtering-edit-page',
  FIREWALL_SET_IP_FILTERING_EDIT_PAGE: 'firewall:set-ip-filtering-edit-page',

  FIREWALL_GET_MAC_FILTERING_PAGE: 'firewall:get-mac-filtering-page',
  FIREWALL_SET_MAC_FILTERING_PAGE: 'firewall:set-mac-filtering-page',
  FIREWALL_ADD_MAC_FILTERING_RULE: 'firewall:add-mac-filtering-rule',
  FIREWALL_DELETE_MAC_FILTERING_RULE: 'firewall:delete-mac-filtering-rule',
  FIREWALL_GET_MAC_FILTERING_EDIT_PAGE: 'firewall:get-mac-filtering-edit-page',
  FIREWALL_SET_MAC_FILTERING_EDIT_PAGE: 'firewall:set-mac-filtering-edit-page',

  FIREWALL_GET_URL_FILTERING_PAGE: 'firewall:get-url-filtering-page',
  FIREWALL_SET_URL_FILTERING_PAGE: 'firewall:set-url-filtering-page',

  FIREWALL_GET_TRAFFIC_RULES_PAGE: 'firewall:get-traffic-rules-page',
  FIREWALL_SET_TRAFFIC_RULES_PAGE: 'firewall:set-traffic-rules-page',
  FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES:
    'firewall:add-open-ports-traffic-rules',
  FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES:
    'firewall:add-new-forward-traffic-rules',
  FIREWALL_DELETE_TRAFFIC_RULES: 'firewall:delete-traffic-rules',
  FIREWALL_GET_TRAFFIC_RULES_EDIT_PAGE: 'firewall:get-traffic-rules-edit-page',
  FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE: 'firewall:set-traffic-rules-edit-page',

  FIREWALL_GET_DOS_PREVENTION_PAGE: 'firewall:get-dos-prevention-page',
  FIREWALL_SET_DOS_PREVENTION_PAGE: 'firewall:set-dos-prevention-page',

  FIREWALL_GET_DMZ_HOST_PAGE: 'firewall:get-dmz-host-page',
  FIREWALL_SET_DMZ_HOST_PAGE: 'firewall:set-dmz-host-page',

  FIREWALL_GET_ONE_TO_ONE_NAT_PAGE: 'firewall:get-one-to-one-nat-page',
  FIREWALL_SET_ONE_TO_ONE_NAT_PAGE: 'firewall:set-one-to-one-nat-page',
  FIREWALL_ADD_ONE_TO_ONE_NAT: 'firewall:add-one-to-one-nat',
  FIREWALL_DELETE_ONE_TO_ONE_NAT: 'firewall:delete-one-to-one-nat',
  FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE:
    'firewall:get-one-to-one-nat-edit-page',
  FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE:
    'firewall:set-one-to-one-nat-edit-page',

  // ALG
  ALG_GET_ALG_PAGE: 'alg:get-alg-page',
  ALG_SET_ALG_PAGE: 'alg:set-alg-page',

  //Routing
  ROUTING_GET_STATIC_ROUTES_PAGE: 'routing:get-static-routes-page',
  ROUTING_SET_STATIC_ROUTES_PAGE: 'routing:set-static-routes-page',
  ROUTING_ADD_STATIC_IPV4_ROUTES: 'routing:add-static-ipv4-routes',
  ROUTING_DELETE_STATIC_IPV4_ROUTES: 'routing:delete-static-routes-page',
  ROUTING_GET_RIP_PAGE: 'routing:get-rip-page',
  ROUTING_SET_RIP_PAGE: 'routing:set-rip-page',
  ROUTING_GET_RIP_EDIT_PAGE: 'routing:get-rip-edit-page',
  ROUTING_SET_RIP_EDIT_PAGE: 'routing:set-rip-edit-page',
  ROUTING_GET_OSPF_PAGE: 'routing:get-ospf-page',
  ROUTING_SET_OSPF_PAGE: 'routing:set-ospf-page',
  ROUTING_GET_OSPF_EDIT_PAGE: 'routing:get-ospf-edit-page',
  ROUTING_SET_OSPF_EDIT_PAGE: 'routing:set-ospf-edit-page',
  ROUTING_GET_BGP_PAGE: 'routing:get-bgp-page',
  ROUTING_SET_BGP_PAGE: 'routing:set-bgp-page',
  ROUTING_ADD_BGP_IPV4_NEIGHBOR: 'routing:add-bgp-ipv4-neighbor',
  ROUTING_DELETE_BGP_IPV4_NEIGHBOR: 'routing:delete-bgp-ipv4-neighbor',

  // Administrator
  SYSTEM_GET_SYSTEM_TIME_DATE_PAGE: 'system:get-system-time-date-page',
  SYSTEM_SET_SYSTEM_TIME_DATE_PAGE: 'system:set-system-time-date-page',
  SYSTEM_GET_LOCAL_TIME: 'system:get-local-time',
  SYSTEM_SET_LOCAL_TIME: 'system:set-local-time',

  ADMINISTRATION_GET_ADMINISTRATION_PAGE:
    'administration:get-administration-page',
  ADMINISTRATION_SET_ADMINISTRATION_PAGE:
    'administration:set-administration-page',

  SCHEDULE_GET_SCHEDULE_PAGE: 'schedule:get-schedule-page',
  SCHEDULE_SET_SCHEDULE_PAGE: 'schedule:set-schedule-page',
  SCHEDULE_ADD_SCHEDULE_RULE: 'schedule:add-schedule-rule',
  SCHEDULE_DELETE_SCHEDULE_RULE: 'schedule:delete-schedule-rule',
  SCHEDULE_GET_SCHEDULE_EDIT_PAGE: 'schedule:get-schedule-edit-page',
  SCHEDULE_SET_SCHEDULE_EDIT_PAGE: 'schedule:set-schedule-edit-page',

  ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE:
    'access-management:get-access-management-page',
  ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE:
    'access-management:set-access-management-page',
  ACCESS_MANAGEMENT_DOWNLOAD_SSH_PRIVATE_KEY:
    'access-management:download-ssh-private-key',
  ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS:
    'access-management:regenerate-ssh-keys',

  FIRMWARE_DO_FIRMWARE_UPGRADE: 'firmware:do-firmware-upgrade',
  FIRMWARE_DOWNLOAD_CONFIGURATION_BACKUP:
    'firmware:download-configuration-backup',
  FIRMWARE_RESTORE_CONFIGURATION_BACKUP:
    'firmware:restore-configuration-backup',
  FIRMWARE_GET_RESTORE_RESULT: 'firmware:get-restore-result',
  FIRMWARE_RESET_TO_DEFAULTS: 'firmware:reset-to-defaults',
  FIRMWARE_GET_FIRMWARE_VERSION: 'firmware:get-firmware-version',
  SETTINGS_APPLY_ACCESS_MANAGEMENT: 'settings:apply-access-management',

  REBOOT_PERFORM_REBOOT: 'reboot:perform-reboot',
  REBOOT_GET_SETTINGS_PAGE: 'reboot:get-settings-page',
  REBOOT_SET_SETTINGS_PAGE: 'reboot:set-settings-page',

  CELLULAR_GET_CELLULAR_PAGE: 'cellular:get-cellular-page',
  ROUTES_GET_ROUTE_ARP_PAGE: 'routes:get-route-arp-page',

  SYSTEM_LOG_GET_SYSTEM_LOG: 'system:get-system-log',
  SYSTEM_LOG_CLEAR_SYSTEM_LOG: 'system:clear-system-log',

  REAL_TIME_GRAPHS_LOAD: 'real-time-graphs:load',

  REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE: 'real-time-graphs:traffic-get-device',
  REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS:
    'real-time-graphs:traffic-get-device-status',

  REAL_TIME_GRAPHS_CONNECTIONS: 'real-time-graphs:connections',
  REAL_TIME_GRAPHS_QUERY_NAME_INFO: 'real-time-graphs:query-name-info',
  ...XPB_SERVER_ACTIONS,
}
