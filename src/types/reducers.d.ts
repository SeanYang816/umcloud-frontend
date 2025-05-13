import { OverviewResult } from 'pages/device/basicConfig/BasicInformation/type'
import {
  EmptyProps,
  OptionsOrSuggestType,
  StringObjectType,
  StringStringType,
} from 'types'
import {
  GetWireless2Primary,
  GetWireless2PrimaryStatus,
} from 'pages/device/wireless/Wireless2Primary/type'
import {
  GetWireless5Primary,
  GetWireless5PrimaryStatus,
} from 'pages/device/wireless/Wireless5Primary/type'
import { GetWireless2Multiple } from 'pages/device/wireless/Wireless2Multiple/type'
import { GetWireless5Multiple } from 'pages/device/wireless/Wireless5Multiple/type'
import { GetLanPage, GetLANStatus } from 'pages/device/network/Lan/type'

export type NetworkProps = {
  lan: GetLanPage
  lanStatus: GetLANStatus
}

export type WirelessProps = {
  wireless2Primary: GetWireless2Primary
  wireless2PrimaryStatus: GetWireless2PrimaryStatus

  wireless2Multiple: GetWireless2Multiple

  wireless5Primary: GetWireless5Primary
  wireless5PrimaryStatus: GetWireless5PrimaryStatus

  wireless5Multiple: GetWireless5Multiple
}

// firewall
export type FirewallStateProps = {
  generalSettings: {
    result: {
      'cbid.firewall.wan_ping.enabled': string
    }
  }
  portForward: {
    result: StringObjectType
    options: OptionsOrSuggestType // DOC: it does not exist on document
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  portForwardEdit: {
    result: StringStringType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  portTrigger: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  portTriggerEdit: {
    result: StringStringType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  ipFiltering: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  ipFilteringEdit: {
    result: StringStringType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  macFiltering: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  macFilteringEdit: {
    result: StringStringType
    options: OptionsOrSuggestType // DOC: it does not exist on document
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  urlFiltering: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  trafficRules: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  trafficRulesEdit: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  dosPrevention: {
    result: {
      'cbid.firewall.dos.tcp_enabled': string
      'cbid.firewall.dos.tcp_rate': string
      'cbid.firewall.dos.tcp_burst': string
      'cbid.firewall.dos.udp_enabled': string
      'cbid.firewall.dos.udp_rate': string
      'cbid.firewall.dos.udp_burst': string
      'cbid.firewall.dos.icmp_enabled': string
      'cbid.firewall.dos.icmp_rate': string
      'cbid.firewall.dos.icmp_burst': string
    }
  }
  dmzHost: {
    result: {
      'cbid.dmz.dmz.enable': string
      'cbid.dmz.dmz.dmz_ip': string
    }
  }
  oneToOneNat: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
  oneToOneNatEdit: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType // DOC: it does not exist on document
  }
}

export type BasicConfigProps = {
  basicConfig:
    | {
        result: OverviewResult
      }
    | EmptyProps
}

// alg
export type AlgStateProps = {
  alg: {
    result: {
      'cbid.alg.alg.ftp': string
      'cbid.alg.alg.tftp': string
      'cbid.alg.alg.snmp': string
      'cbid.alg.alg.sip': string
      'cbid.alg.alg.rtsp': string
      'cbid.alg.alg.irc': string
      'cbid.alg.alg.h323': string
      'cbid.alg.alg.pptp_pth': string
      'cbid.alg.alg.12tp_pth': string
      'cbid.alg.alg.ipsec_pth': string
      'cbid.alg.alg.relay': string
    }
    options: OptionsOrSuggestType
  }
}

// routing
export type RoutingStateProps = {
  staticRoutes: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  rip: {
    result: StringStringType
    options: OptionsOrSuggestType
  }
  ripEdit: {
    result: StringStringType
    options: OptionsOrSuggestType
  }
  ospf: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  ospfEdit: {
    result: StringObjectType
    options: OptionsOrSuggestType
  }
  bgp: {
    result: StringObjectType
    options: OptionsOrSuggestType
    suggest: OptionsOrSuggestType
  }
}

// administrator
export type AdministratorStateProps = {
  system: {
    result: {
      'cbid.system.system.hostname': string
      'cbid.system.system.log_size': string
      'cbid.system.system.log_ip': string
      'cbid.system.system.log_port': string
      'cbid.system.system.conloglevel': string
      'cbid.system.system.cronloglevel': string
      'cbid.system.system.zonename': string
      'cbid.system.system.daylight_saving_enable': string
      'cbid.system.system.daylight_saving_offset': string
      'cbid.system.system.daylight_saving_start_month': string
      'cbid.system.system.daylight_saving_start_week': string
      'cbid.system.system.daylight_saving_start_day_of_week': string
      'cbid.system.system.daylight_saving_start_time': string
      'cbid.system.system.daylight_saving_end_month': string
      'cbid.system.system.daylight_saving_end_week': string
      'cbid.system.system.daylight_saving_end_day_of_week': string
      'cbid.system.system.daylight_saving_end_time': string
      'cbid.system.system.clock_mode': string
      'cbid.system.system.localtime_year': string
      'cbid.system.system.localtime_month': string
      'cbid.system.system.localtime_day': string
      'cbid.system.system.localtime_hour': string
      'cbid.system.system.localtime_minute': string
      'cbid.system.system.localtime_second': string
      'cbid.system.system.ntpserver': string
    }
    options?: OptionsOrSuggestType
  }
  administration: {
    result: {
      'cbid.system._pass.us': string
      'cbid.system._pass.pwold': string
      'cbid.system._pass.pw1': string
      'cbid.system._pass.pw2': string
      'cbid.system._pass.idletimeout': string
    }
  }
  accessManagement: {
    result: {
      'cbid.uhttpd.main.lo_iface_en': string
      'cbid.uhttpd.main.lo_iface': object
      'cbid.uhttpd.main.lo_http_en': string
      'cbid.uhttpd.main.lo_http_port': string
      'cbid.uhttpd.main.lo_https_en': string
      'cbid.uhttpd.main.lo_https_port': string
      'cbid.uhttpd.main.lo_telnet_en': string
      'cbid.uhttpd.main.lo_telnet_port': string
      'cbid.uhttpd.main.lo_ssh_en': string
      'cbid.uhttpd.main.lo_ssh_port': string
      'cbid.uhttpd.main.lo_ssh_pa': string
      'cbid.uhttpd.main.re_iface_en': string
      'cbid.uhttpd.main.re_iface': object
      'cbid.uhttpd.main.re_http_en': string
      'cbid.uhttpd.main.re_http_port': string
      'cbid.uhttpd.main.re_https_en': string
      'cbid.uhttpd.main.re_https_port': string
    }
    options: OptionsOrSuggestType // DOC: it doesn't exist on document
  }
  schedule: {
    result: StringObjectType
  }
  scheduleEdit: {
    result: StringStringType
  }
  backupFlashFirmware: {
    result: {
      filename: string
      'Content-Type': string
      data: string
    }
    version?: string // DOC: it does not exist on document
  }
  reboot: {
    result: {
      'cbid.autoreboot.reboot_config.time_schedule': string
    }
    options: OptionsOrSuggestType
  }
}

export type LocalTimeProps = {
  localTime: {
    result: {
      timestring: string
    }
  }
}

// status
export type AprTable = {
  network?: string
  address?: string
  mac?: string
}

export type Routes_v4Table = {
  network?: string
  target?: string
  gateway?: string
  metric?: string
  table?: string
}

export type Routes_v6Table = {
  network?: string
  target?: string
  source?: string
  metric?: string
  table?: string
}

export type Neighbours_v6Table = {
  network?: string
  address?: string
  mac?: string
}

export type connectionsTable = {
  bytes: string
  src: string
  sport: string
  layer4: string
  dst: string
  dport: string
  layer3: string
  packets: string
}

export type StatusStateProps = {
  cellular: {
    result: {
      sim_status: number
      status: number
      type: string
      net: string
      wwan: {
        ipaddr: string
      }
      wwan6: {
        ipaddr: string
      }[]
      band: string
      rsrp: string
      rsrq: string
      rssi: string
      imei: string
      imsi: string
    }
  }
  routes: {
    result: {
      arp: AprTable[]
      routes_v4: Routes_v4Table[]
      routes_v6: Routes_v6Table[]
      neighbours_v6: {
        network?: string
        address?: string
        mac?: string
      }[]
    }
  }
  systemLog: {
    result: {
      data: string
    }
  }
  realtimeGraph: {
    load: {
      result: number[][]
    }
    connections: {
      result: {
        statistics: number[][]
        connections: connectionsTable[]
      }
    }
    trafficGetDevice: {
      result: StringStringType
    }
    trafficGetDeviceStatus: {
      requestId: string
      result: number[][]
    }
  }
}
