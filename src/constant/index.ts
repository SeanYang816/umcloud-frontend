export const CUSTOM_OPTION = '-- custom --'
export const ERROR_MAC = '00:00:00:00:00:00'

export const XPB_EVENT_ACTIONS = {
  XPB_510_EXTERNAL_DATA_SET_SOURCE_ALIAS:
    'xpb-510:external-data:set-source-alias',
  XPB_510_EXTERNAL_DATA_GET_DATA_SOURCE:
    'xpb-510:external-data:get-data-source',
  XPB_510_EXTERNAL_DATA_GET_DATA: 'xpb-510:external-data:get-data',
  XPB_510_OVERVIEW_GET_STATUS_OVERVIEW_PAGE:
    'xpb-510:overviewPage:get-status-overview-page',
  XPB_510_OVERVIEW_GET_DDNS_OVERVIEW_PAGE:
    'xpb-510:overviewPage:get-ddns-overview-page',
  XPB_510_OVERVIEW_GET_MWAN_OVERVIEW_PAGE:
    'xpb-510:overviewPage:get-mwan-overview-page',
  XPB_510_CLIMATE_CONTROL_GET_FAN_STATUS:
    'xpb-510:climate-control:get-fan-status',
  XPB_510_CLIMATE_CONTROL_SET_FAN_STATUS:
    'xpb-510:climate-control:set-fan-status',
  XPB_510_CLIMATE_CONTROL_GET_CLIMATE_STATUS:
    'xpb-510:climate-control:get-climate-status',
  XPB_510_CLIMATE_CONTROL_GET_CLIMATE_HISTORY:
    'xpb-510:climate-control:get-climate-history',
  XPB_510_LAN_GET_LAN_PAGE: 'xpb-510:lan:get-lan-page',
  XPB_510_LAN_SET_LAN_PAGE: 'xpb-510:lan:set-lan-page',
  XPB_510_LAN_ADD_STATIC_LEASES: 'xpb-510:lan:add-static-leases',
  XPB_510_LAN_DELETE_STATIC_LEASES: 'xpb-510:lan:delete-static-leases',
  XPB_510_LAN_ADD_HOST_ENTRIES: 'xpb-510:lan:add-host-entries',
  XPB_510_LAN_DELETE_HOST_ENTRIES: 'xpb-510:lan:delete-host-entries',
  XPB_510_LAN_ADD_STATIC_ARP: 'xpb-510:lan:add-static-arp',
  XPB_510_LAN_DELETE_STATIC_ARP: 'xpb-510:lan:delete-static-arp',
  XPB_510_LAN_GET_LAN_STATUS: 'xpb-510:lan:get-lan-status',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_CONFIG:
    'xpb-510:wireless:2.4ghz-get-primary-ssid-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_PRIMARY_SSID_CONFIG:
    'xpb-510:wireless:2.4ghz-set-primary-ssid-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_WIFI_STATUS:
    'xpb-510:wireless:2.4ghz-get-primary-ssid-wifi-status',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_1_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-1-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_1_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-1-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_2_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-2-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_2_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-2-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_3_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-3-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_3_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-3-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_4_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-4-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_4_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-4-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_5_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-5-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_5_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-5-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_6_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-6-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_6_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-6-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_GET_MULTIPLE_SSID_7_CONFIG:
    'xpb-510:wireless:2.4ghz-get-multiple-ssid-7-config',
  XPB_510_WIRELESS_TWO_POINT_FOUR_GHZ_SET_MULTIPLE_SSID_7_CONFIG:
    'xpb-510:wireless:2.4ghz-set-multiple-ssid-7-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_PRIMARY_SSID_CONFIG:
    'xpb-510:wireless:5ghz-get-primary-ssid-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_PRIMARY_SSID_CONFIG:
    'xpb-510:wireless:5ghz-set-primary-ssid-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_PRIMARY_SSID_WIFI_STATUS:
    'xpb-510:wireless:5ghz-get-primary-ssid-wifi-status',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_1_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-1-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_1_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-1-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_2_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-2-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_2_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-2-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_3_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-3-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_3_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-3-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_4_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-4-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_4_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-4-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_5_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-5-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_5_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-5-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_6_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-6-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_6_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-6-config',
  XPB_510_WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_7_CONFIG:
    'xpb-510:wireless:5ghz-get-multiple-ssid-7-config',
  XPB_510_WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_7_CONFIG:
    'xpb-510:wireless:5ghz-set-multiple-ssid-7-config',
  XPB_510_FIREWALL_GET_GENERAL_SETTINGS_PAGE:
    'xpb-510:firewall:get-general-settings-page',
  XPB_510_FIREWALL_SET_GENERAL_SETTINGS_PAGE:
    'xpb-510:firewall:set-general-settings-page',
  XPB_510_FIREWALL_GET_PORT_FORWARD_PAGE:
    'xpb-510:firewall:get-port-forward-page',
  XPB_510_FIREWALL_SET_PORT_FORWARD_PAGE:
    'xpb-510:firewall:set-port-forward-page',
  XPB_510_FIREWALL_ADD_PORT_FORWARD_RULE:
    'xpb-510:firewall:add-port-forward-rule',
  XPB_510_FIREWALL_DELETE_PORT_FORWARD_RULE:
    'xpb-510:firewall:delete-port-forward-rule',
  XPB_510_FIREWALL_GET_PORT_FORWARD_EDIT_PAGE:
    'xpb-510:firewall:get-port-forward-edit-page',
  XPB_510_FIREWALL_SET_PORT_FORWARD_EDIT_PAGE:
    'xpb-510:firewall:set-port-forward-edit-page',
  XPB_510_FIREWALL_GET_PORT_TRIGGER_PAGE:
    'xpb-510:firewall:get-port-trigger-page',
  XPB_510_FIREWALL_SET_PORT_TRIGGER_PAGE:
    'xpb-510:firewall:set-port-trigger-page',
  XPB_510_FIREWALL_ADD_PORT_TRIGGER_RULE:
    'xpb-510:firewall:add-port-trigger-rule',
  XPB_510_FIREWALL_DELETE_PORT_TRIGGER_RULE:
    'xpb-510:firewall:delete-port-trigger-rule',
  XPB_510_FIREWALL_GET_PORT_TRIGGER_EDIT_PAGE:
    'xpb-510:firewall:get-port-trigger-edit-page',
  XPB_510_FIREWALL_SET_PORT_TRIGGER_EDIT_PAGE:
    'xpb-510:firewall:set-port-trigger-edit-page',
  XPB_510_FIREWALL_GET_IP_FILTERING_PAGE:
    'xpb-510:firewall:get-ip-filtering-page',
  XPB_510_FIREWALL_SET_IP_FILTERING_PAGE:
    'xpb-510:firewall:set-ip-filtering-page',
  XPB_510_FIREWALL_ADD_IP_FILTERING_RULE:
    'xpb-510:firewall:add-ip-filtering-rule',
  XPB_510_FIREWALL_DELETE_IP_FILTERING_RULE:
    'xpb-510:firewall:delete-ip-filtering-rule',
  XPB_510_FIREWALL_GET_IP_FILTERING_EDIT_PAGE:
    'xpb-510:firewall:get-ip-filtering-edit-page',
  XPB_510_FIREWALL_SET_IP_FILTERING_EDIT_PAGE:
    'xpb-510:firewall:set-ip-filtering-edit-page',
  XPB_510_FIREWALL_GET_MAC_FILTERING_PAGE:
    'xpb-510:firewall:get-mac-filtering-page',
  XPB_510_FIREWALL_SET_MAC_FILTERING_PAGE:
    'xpb-510:firewall:set-mac-filtering-page',
  XPB_510_FIREWALL_ADD_MAC_FILTERING_RULE:
    'xpb-510:firewall:add-mac-filtering-rule',
  XPB_510_FIREWALL_DELETE_MAC_FILTERING_RULE:
    'xpb-510:firewall:delete-mac-filtering-rule',
  XPB_510_FIREWALL_GET_MAC_FILTERING_EDIT_PAGE:
    'xpb-510:firewall:get-mac-filtering-edit-page',
  XPB_510_FIREWALL_SET_MAC_FILTERING_EDIT_PAGE:
    'xpb-510:firewall:set-mac-filtering-edit-page',
  XPB_510_FIREWALL_GET_URL_FILTERING_PAGE:
    'xpb-510:firewall:get-url-filtering-page',
  XPB_510_FIREWALL_SET_URL_FILTERING_PAGE:
    'xpb-510:firewall:set-url-filtering-page',
  XPB_510_FIREWALL_GET_TRAFFIC_RULES_PAGE:
    'xpb-510:firewall:get-traffic-rules-page',
  XPB_510_FIREWALL_SET_TRAFFIC_RULES_PAGE:
    'xpb-510:firewall:set-traffic-rules-page',
  XPB_510_FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES:
    'xpb-510:firewall:add-open-ports-traffic-rules',
  XPB_510_FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES:
    'xpb-510:firewall:add-new-forward-traffic-rules',
  XPB_510_FIREWALL_DELETE_TRAFFIC_RULES:
    'xpb-510:firewall:delete-traffic-rules',
  XPB_510_FIREWALL_GET_TRAFFIC_RULES_EDIT_PAGE:
    'xpb-510:firewall:get-traffic-rules-edit-page',
  XPB_510_FIREWALL_SET_TRAFFIC_RULES_EDIT_PAGE:
    'xpb-510:firewall:set-traffic-rules-edit-page',
  XPB_510_FIREWALL_GET_DOS_PREVENTION_PAGE:
    'xpb-510:firewall:get-dos-prevention-page',
  XPB_510_FIREWALL_SET_DOS_PREVENTION_PAGE:
    'xpb-510:firewall:set-dos-prevention-page',
  XPB_510_FIREWALL_GET_DMZ_HOST_PAGE: 'xpb-510:firewall:get-dmz-host-page',
  XPB_510_FIREWALL_SET_DMZ_HOST_PAGE: 'xpb-510:firewall:set-dmz-host-page',
  XPB_510_FIREWALL_GET_ONE_TO_ONE_NAT_PAGE:
    'xpb-510:firewall:get-one-to-one-nat-page',
  XPB_510_FIREWALL_SET_ONE_TO_ONE_NAT_PAGE:
    'xpb-510:firewall:set-one-to-one-nat-page',
  XPB_510_FIREWALL_ADD_ONE_TO_ONE_NAT: 'xpb-510:firewall:add-one-to-one-nat',
  XPB_510_FIREWALL_DELETE_ONE_TO_ONE_NAT:
    'xpb-510:firewall:delete-one-to-one-nat',
  XPB_510_FIREWALL_GET_ONE_TO_ONE_NAT_EDIT_PAGE:
    'xpb-510:firewall:get-one-to-one-nat-edit-page',
  XPB_510_FIREWALL_SET_ONE_TO_ONE_NAT_EDIT_PAGE:
    'xpb-510:firewall:set-one-to-one-nat-edit-page',
  XPB_510_ALG_GET_ALG_PAGE: 'xpb-510:alg:get-alg-page',
  XPB_510_ALG_SET_ALG_PAGE: 'xpb-510:alg:set-alg-page',
  XPB_510_ROUTING_GET_STATIC_ROUTES_PAGE:
    'xpb-510:routing:get-static-routes-page',
  XPB_510_ROUTING_SET_STATIC_ROUTES_PAGE:
    'xpb-510:routing:set-static-routes-page',
  XPB_510_ROUTING_ADD_STATIC_IPV4_ROUTES:
    'xpb-510:routing:add-static-ipv4-routes',
  XPB_510_ROUTING_DELETE_STATIC_IPV4_ROUTES:
    'xpb-510:routing:delete-static-routes-page',
  XPB_510_ROUTING_GET_RIP_PAGE: 'xpb-510:routing:get-rip-page',
  XPB_510_ROUTING_SET_RIP_PAGE: 'xpb-510:routing:set-rip-page',
  XPB_510_ROUTING_GET_RIP_EDIT_PAGE: 'xpb-510:routing:get-rip-edit-page',
  XPB_510_ROUTING_SET_RIP_EDIT_PAGE: 'xpb-510:routing:set-rip-edit-page',
  XPB_510_ROUTING_GET_OSPF_PAGE: 'xpb-510:routing:get-ospf-page',
  XPB_510_ROUTING_SET_OSPF_PAGE: 'xpb-510:routing:set-ospf-page',
  XPB_510_ROUTING_GET_OSPF_EDIT_PAGE: 'xpb-510:routing:get-ospf-edit-page',
  XPB_510_ROUTING_SET_OSPF_EDIT_PAGE: 'xpb-510:routing:set-ospf-edit-page',
  XPB_510_ROUTING_GET_BGP_PAGE: 'xpb-510:routing:get-bgp-page',
  XPB_510_ROUTING_SET_BGP_PAGE: 'xpb-510:routing:set-bgp-page',
  XPB_510_ROUTING_ADD_BGP_IPV4_NEIGHBOR:
    'xpb-510:routing:add-bgp-ipv4-neighbor',
  XPB_510_ROUTING_DELETE_BGP_IPV4_NEIGHBOR:
    'xpb-510:routing:delete-bgp-ipv4-neighbor',
  XPB_510_SYSTEM_GET_SYSTEM_TIME_DATE_PAGE:
    'xpb-510:system:get-system-time-date-page',
  XPB_510_SYSTEM_SET_SYSTEM_TIME_DATE_PAGE:
    'xpb-510:system:set-system-time-date-page',
  XPB_510_SYSTEM_GET_LOCAL_TIME: 'xpb-510:system:get-local-time',
  XPB_510_SYSTEM_SET_LOCAL_TIME: 'xpb-510:system:set-local-time',
  XPB_510_ADMINISTRATION_GET_ADMINISTRATION_PAGE:
    'xpb-510:administration:get-administration-page',
  XPB_510_ADMINISTRATION_SET_ADMINISTRATION_PAGE:
    'xpb-510:administration:set-administration-page',
  XPB_510_SCHEDULE_GET_SCHEDULE_PAGE: 'xpb-510:schedule:get-schedule-page',
  XPB_510_SCHEDULE_SET_SCHEDULE_PAGE: 'xpb-510:schedule:set-schedule-page',
  XPB_510_SCHEDULE_ADD_SCHEDULE_RULE: 'xpb-510:schedule:add-schedule-rule',
  XPB_510_SCHEDULE_DELETE_SCHEDULE_RULE:
    'xpb-510:schedule:delete-schedule-rule',
  XPB_510_SCHEDULE_GET_SCHEDULE_EDIT_PAGE:
    'xpb-510:schedule:get-schedule-edit-page',
  XPB_510_SCHEDULE_SET_SCHEDULE_EDIT_PAGE:
    'xpb-510:schedule:set-schedule-edit-page',
  XPB_510_ACCESS_MANAGEMENT_GET_ACCESS_MANAGEMENT_PAGE:
    'xpb-510:access-management:get-access-management-page',
  XPB_510_ACCESS_MANAGEMENT_SET_ACCESS_MANAGEMENT_PAGE:
    'xpb-510:access-management:set-access-management-page',
  XPB_510_ACCESS_MANAGEMENT_DOWNLOAD_SSH_PRIVATE_KEY:
    'xpb-510:access-management:download-ssh-private-key',
  XPB_510_ACCESS_MANAGEMENT_REGENERATE_SSH_KEYS:
    'xpb-510:access-management:regenerate-ssh-keys',
  XPB_510_FIRMWARE_DO_FIRMWARE_UPGRADE: 'xpb-510:firmware:do-firmware-upgrade',
  XPB_510_FIRMWARE_DOWNLOAD_CONFIGURATION_BACKUP:
    'xpb-510:firmware:download-configuration-backup',
  XPB_510_FIRMWARE_RESTORE_CONFIGURATION_BACKUP:
    'xpb-510:firmware:restore-configuration-backup',
  XPB_510_FIRMWARE_GET_RESTORE_RESULT: 'xpb-510:firmware:get-restore-result',
  XPB_510_FIRMWARE_RESET_TO_DEFAULTS: 'xpb-510:firmware:reset-to-defaults',
  XPB_510_FIRMWARE_GET_FIRMWARE_VERSION:
    'xpb-510:firmware:get-firmware-version',
  XPB_510_REBOOT_PERFORM_REBOOT: 'xpb-510:reboot:perform-reboot',
  XPB_510_REBOOT_GET_SETTINGS_PAGE: 'xpb-510:reboot:get-settings-page',
  XPB_510_REBOOT_SET_SETTINGS_PAGE: 'xpb-510:reboot:set-settings-page',
  XPB_510_CELLULAR_GET_CELLULAR_PAGE: 'xpb-510:cellular:get-cellular-page',
  XPB_510_ROUTES_GET_ROUTE_ARP_PAGE: 'xpb-510:routes:get-route-arp-page',
  XPB_510_SYSTEM_LOG_GET_SYSTEM_LOG: 'xpb-510:system:get-system-log',
  XPB_510_SYSTEM_LOG_CLEAR_SYSTEM_LOG: 'xpb-510:system:clear-system-log',
  XPB_510_REAL_TIME_GRAPHS_LOAD: 'xpb-510:real-time-graphs:load',
  XPB_510_REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE:
    'xpb-510:real-time-graphs:traffic-get-device',
  XPB_510_REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS:
    'xpb-510:real-time-graphs:traffic-get-device-status',
  XPB_510_REAL_TIME_GRAPHS_TRAFFIC_LAN_AND_WLAN:
    'xpb-510:real-time-graphs:traffic-lan-and-wlan',
  XPB_510_REAL_TIME_GRAPHS_TRAFFIC_WAN: 'xpb-510:real-time-graphs:traffic-wan',
  XPB_510_REAL_TIME_GRAPHS_TRAFFIC_WWAN:
    'xpb-510:real-time-graphs:traffic-wwan',
  XPB_510_REAL_TIME_GRAPHS_CONNECTIONS: 'xpb-510:real-time-graphs:connections',
  XPB_510_REAL_TIME_GRAPHS_QUERY_NAME_INFO:
    'xpb-510:real-time-graphs:query-name-info',
  XPB_510_WAN_GET_WAN_STATUS: 'xpb-510:wan:get-wan-status',
  XPB_510_CONFIG_GET_CHANGES: 'xpb-510:config:get-changes',
  XPB_510_CONFIG_SAVE_CHANGES: 'xpb-510:config:save-changes',
  XPB_510_CONFIG_APPLY_SETTINGS: 'xpb-510:config:apply-settings',
  XPB_510_CONFIG_REVERT_CHANGES: 'xpb-510:config:revert-changes',
  XPB_510_CONFIG_GET_APPLY_STATUS: 'xpb-510:config:get-apply-status',
}

export const BGW_EVENT_ACTIONS = {
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
  ...XPB_EVENT_ACTIONS,
}
