import {
  BoolString,
  ProtocolOption,
  SourceInterfaceOption,
  StatusMessageType,
  WanInterfaceOption,
} from 'types'

/** 1.6 Firewall */

/** 1.6.1 General Settings */

// 1.6.1.1 Get General Settings Page
export type GetGeneralSettingsPageResponse = StatusMessageType & {
  result: {
    'cbid.firewall.wan_ping.enabled': string
  }
}

// 1.6.1.2 Set General Settings Page
export type SetGeneralSettingsPageResponse = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbid.firewall.wan_ping.enabled': string
}

/** 1.6.2 Port Forward */

// 1.6.2.1 Get Port Forward Page
export type GetPortForwardPageRequest = {
  get_options?: '1' | '0'
}

export type GetPortForwardResult = {
  portforward: Record<string, unknown>[]
} & Partial<
  Record<
    | `cbid.firewall.${string}.name`
    | `cbid.firewall.${string}.match`
    | `cbid.firewall.${string}.dest`
    | `cbid.firewall.${string}.time_schedule`
    | `cbid.firewall.${string}.enabled`,
    string
  >
>

export type GetPortForwardPageResponse = StatusMessageType & {
  result: GetPortForwardResult
  options: Partial<Record<string, unknown>>
}

// 1.6.2.2 Set Port Forward Page
export type SetPortForwardPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbi.sts.firewall.portforward': string
} & Partial<Record<`cbid.firewall.${string}.enabled`, string>>
export type SetPortForwardPageResponse = GetPortForwardPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.6.2.3 Add Port Forward Rule
export type AddPortForwardRuleRequest = SetPortForwardPageRequest & {
  // Except: cbi.apply
  'cbi.cts.firewall.portforward.': string
  '_newfwd.name': string
  '_newfwd.proto': string
  '_newfwd.extiface': string
  '_newfwd.extport': string
  '_newfwd.intaddr': string
  '_newfwd.intport': string
  '_newfwd.schedule': string
  '_newfwd.extzone': string
  '_newfwd.intzone': string
}

export type AddPortForwardRuleResponse = SetPortForwardPageResponse

// 1.6.2.4 Delete Port Forward Rule
export type DeletePortForwardRuleRequest = SetPortForwardPageRequest &
  // Except: cbi.apply
  Record<`cbi.rts.firewall.${string}`, 'Delete' | string>

export type DeletePortForwardRuleResponse = SetPortForwardPageResponse

// 1.6.2.5 Get Port Forward Edit Page
export type GetPortForwardEditPageRequest = {
  get_options: '1' | '0'
}

export type PortForwardEditPageResult = Record<
  | `cbid.firewall.${string}.__enabled`
  | `cbid.firewall.${string}.name`
  | `cbid.firewall.${string}.proto`
  | `cbid.firewall.${string}.src_mac`
  | `cbid.firewall.${string}.src_ip`
  | `cbid.firewall.${string}.src_port`
  | `cbid.firewall.${string}.src_iface`
  | `cbid.firewall.${string}.src_dport`
  | `cbid.firewall.${string}.dest_ip`
  | `cbid.firewall.${string}.dest_port`
  | `cbid.firewall.${string}.reflection`
  | `cbid.firewall.${string}.time_schedule`
  | `cbid.firewall.${string}.src_dip`
  | `cbid.firewall.${string}.extra`,
  string
>

export type GetPortForwardEditPageResponse = StatusMessageType & {
  result: PortForwardEditPageResult & {
    options: Partial<Record<string, unknown>>
  }
}

// 1.6.2.6 Set Port Forward Edit Page
export type SetPortForwardEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
} & Record<
  | `cbid.firewall.${string}.__enabled`
  | `cbid.firewall.${string}.name`
  | `cbid.firewall.${string}.proto`
  | `cbid.firewall.${string}.src_mac`
  | `cbid.firewall.${string}.src_ip`
  | `cbid.firewall.${string}.src_port`
  | `cbid.firewall.${string}.src_iface`
  | `cbid.firewall.${string}.src_dport`
  | `cbid.firewall.${string}.dest_ip`
  | `cbid.firewall.${string}.dest_port`
  | `cbid.firewall.${string}.reflection`
  | `cbid.firewall.${string}.time_schedule`
  | `cbid.firewall.${string}.src`
  | `cbid.firewall.${string}.src_dip`
  | `cbid.firewall.${string}.dest`
  | `cbid.firewall.${string}.extra`,
  string
>

export type SetPortForwardEditPageResponse = GetPortForwardEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

/** 1.6.3 Port Trigger */

// 1.6.3.1 Get Port Trigger Page

export type GetPortTriggerPageRequest = {
  get_options?: '1' | '0'
}

export type GetPortTriggerPageResponse = StatusMessageType & {
  result: {
    trigger: Record<string, unknown>[]
  } & Partial<
    Record<
      | `cbid.firewall.${string}.name`
      | `cbid.firewall.${string}.iface`
      | `cbid.firewall.${string}.match`
      | `cbid.firewall.${string}.trigger`
      | `cbid.firewall.${string}.time_schedule`
      | `cbid.firewall.${string}.enabled`,
      string
    >
  >
  options: Partial<Record<string, unknown>>
}

// 1.6.3.2 Set Port Trigger Page
export type SetPortTriggerPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbi.sts.firewall.trigger': string
} & Partial<Record<`cbid.firewall.${string}.enabled`, BoolString | string>>
export type SetPortTriggerPageResponse = GetPortTriggerPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.6.3.3 Add Port Trigger Rule
export type AddPortTriggerRuleRequest = SetPortTriggerPageRequest & {
  // Except: cbi.apply
  'cbi.cts.firewall.trigger.': 'Add' | string
  '_newfwd.name': string
  '_newfwd.iface': WanInterfaceOption | string
  '_newfwd.match_proto': ProtocolOption | string
  '_newfwd.match_port': string
  '_newfwd.trigger_proto': ProtocolOption | string
  '_newfwd.trigger_port': string
  '_newfwd.schedule': string
}

export type AddPortTriggerRuleResponse = SetPortTriggerPageResponse

// 1.6.3.4 Edit Port Trigger Rule
export type EditPortTriggerRuleRequest = SetPortTriggerPageRequest & {
  // Except: cbi.apply
} & Record<`cbi.rts.firewall.${string}`, 'Delete' | string>

export type EditPortTriggerRuleResponse = SetPortTriggerPageResponse

// 1.6.3.5 Get Port Trigger Edit Page
export type GetPortTriggerEditPageRequest = {
  get_options?: BoolString
}

export type GetPortTriggerEditPageResponse = StatusMessageType & {
  result: Record<`cbid.firewall.${string}.__enabled`, BoolString> &
    Record<`cbid.firewall.${string}.name`, string> &
    Record<`cbid.firewall.${string}.iface`, WanInterfaceOption | string> &
    Record<`cbid.firewall.${string}.match_proto`, ProtocolOption | string> &
    Record<`cbid.firewall.${string}.match_port`, string> &
    Record<`cbid.firewall.${string}.trigger_proto`, ProtocolOption | string> &
    Record<`cbid.firewall.${string}.trigger_port`, string> &
    Record<`cbid.firewall.${string}.time_schedule`, string>
  options: Partial<Record<string, unknown>>
}

// 1.6.3.6 Set Port Trigger Edit Page
export type SetPortTriggerEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
} & Record<`cbid.firewall.${string}.enabled`, BoolString> &
  Record<`cbid.firewall.${string}.name`, string> &
  Record<`cbid.firewall.${string}.iface`, WanInterfaceOption | string> &
  Record<`cbid.firewall.${string}.match_proto`, ProtocolOption | string> &
  Record<`cbid.firewall.${string}.match_port`, string> &
  Record<`cbid.firewall.${string}.trigger_proto`, ProtocolOption | string> &
  Record<`cbid.firewall.${string}.trigger_port`, string> &
  Record<`cbid.firewall.${string}.time_schedule`, string>

export type SetPortTriggerEditPageResponse = GetPortTriggerEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

/** 1.6.4 Traffic Rules */

// 1.6.4.1 Get Traffic Rules Page
export type GetTrafficRulesPageRequest = {
  get_options?: BoolString
}

export type GetTrafficRulesPageResponse = StatusMessageType & {
  result: {
    rule: Record<string, unknown>
  } & Partial<Record<`cbid.firewall.${string}.name`, string>> &
    Partial<Record<`cbid.firewall.${string}.match`, string>> &
    Partial<Record<`cbid.firewall.${string}.target`, string>> &
    Partial<Record<`cbid.firewall.${string}.time_schedule`, string>> &
    Partial<Record<`cbid.firewall.${string}.enabled`, BoolString | string>>
  options: Partial<Record<string, unknown>>
}

// 1.6.4.2 Set Traffic Rules Page
export type SetTrafficRulesPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
  'cbi.sts.firewall.rule': string
} & Partial<Record<`cbid.firewall.${string}.enabled`, BoolString>>

export type SetTrafficRulesPageResponse = GetTrafficRulesPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.6.4.3 Add Open Ports Traffic Rules
export type AddOpenPortsTrafficRulesRequest = SetTrafficRulesPageRequest & {
  // Except: cbi.apply
  '_newopen.submit': 'Add' | string
  '_newopen.name': string
  '_newopen.proto': 'tcp udp' | string
  '_newopen.extport': string
  '_newopen.schedule': string
}

export type AddOpenPortsTrafficRulesResponse = SetTrafficRulesPageResponse

// 1.6.4.4 Add New Forward Traffic Rules
export type AddNewForwardTrafficRulesRequest = SetTrafficRulesPageRequest & {
  // Except: cbi.apply
  '_newfwd.submit': 'Add' | string
  '_newfwd.name': string
  '_newfwd.src': SourceInterfaceOption
  '_newfwd.dest': SourceInterfaceOption
  '_newfwd.schedule': string
}

// ??? Redirect to 1.6.7.6
// Note: After add this rule will redirect to Edit page.
export type AddNewForwardTrafficRulesResponse = '??? Redirect to 1.6.7.6'

// 1.6.4.5 Delete Traffic Rules
export type DeleteTrafficRulesRequest = SetTrafficRulesPageRequest & {
  // Except: cbi.apply
} & Record<`cbi.rts.firewall.${string}`, 'Delete' | string>

export type DeleteTrafficRulesResponse = SetTrafficRulesPageResponse

// 1.6.4.6 Get Traffic Rules Edit Page
export type GetTrafficRulesEditPageRequest = {
  get_options?: BoolString
}

export type GetTrafficRulesEditPageResponse = StatusMessageType & {
  result: Record<`cbid.firewall.${string}.family`, string> &
    Record<`cbid.firewall.${string}.proto`, 'tcpudp' | string> &
    Record<`cbid.firewall.${string}.icmp_type`, unknown[]> &
    Record<`cbid.firewall.${string}.src`, 'wan' | string> &
    Record<`cbid.firewall.${string}.src_mac`, string> &
    Record<`cbid.firewall.${string}.src_ip`, string> &
    Record<`cbid.firewall.${string}.src_port`, string> &
    Record<`cbid.firewall.${string}.dest`, string> &
    Record<`cbid.firewall.${string}.dest_ip`, string> &
    Record<`cbid.firewall.${string}.dest_port`, string> &
    Record<`cbid.firewall.${string}.target`, string> &
    Record<`cbid.firewall.${string}.extra`, string> &
    Record<`cbid.firewall.${string}.time_schedule`, string>
  options: Partial<Record<string, unknown>>
}

// 1.6.4.7 Set Traffic Rules Edit Page
export type SetTrafficRulesEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
} & Record<`cbid.firewall.${string}.__enabled`, BoolString> &
  Record<`cbid.firewall.${string}.name`, string> &
  Record<`cbid.firewall.${string}.family`, string> & // (empty) : IPv4 and IPv6 | ipv4 : IPv4 only | ipv6 : IPv6 only
  Record<`cbid.firewall.${string}.proto`, 'tcpudp' | string> &
  Record<`cbid.firewall.${string}.icmp_type`, unknown[]> &
  Record<`cbid.firewall.${string}.src`, 'wan' | string> &
  Record<`cbid.firewall.${string}.src_mac`, string> &
  Record<`cbid.firewall.${string}.src_ip`, string> &
  Record<`cbid.firewall.${string}.src_port`, string> &
  Record<`cbid.firewall.${string}.dest`, string> &
  Record<`cbid.firewall.${string}.dest_ip`, string> &
  Record<`cbid.firewall.${string}.dest_port`, string> &
  Record<`cbid.firewall.${string}.target`, string> &
  Record<`cbid.firewall.${string}.extra`, string> &
  Record<`cbid.firewall.${string}.time_schedule`, string>

export type SetTrafficRulesEditPageResponse = SetTrafficRulesEditPageRequest

/** 1.6.5 DoS Prevention */

// 1.6.5.1 Get DoS Prevention Page
export type DosPreventionPageResult = {
  'cbid.firewall.dos.tcp_enabled': BoolString
  'cbid.firewall.dos.tcp_rate': '25' | string
  'cbid.firewall.dos.tcp_burst': '50' | string
  'cbid.firewall.dos.udp_enabled': BoolString
  'cbid.firewall.dos.udp_rate': '25' | string
  'cbid.firewall.dos.udp_burst': '50' | string
  'cbid.firewall.dos.icmp_enabled': BoolString
  'cbid.firewall.dos.icmp_rate': '25' | string
  'cbid.firewall.dos.icmp_burst': '50' | string
}

export type GetDoSPreventionPageResponse = StatusMessageType & {
  result: DosPreventionPageResult
}

// 1.6.5.2 Get DoS Prevention Edit Page
export type GetDoSPreventionEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'cbid.firewall.dos.tcp_enabled': '0' | BoolString
  'cbid.firewall.dos.tcp_rate': '25' | string
  'cbid.firewall.dos.tcp_burst': '50' | string
  'cbid.firewall.dos.udp_enabled': '0' | BoolString
  'cbid.firewall.dos.udp_rate': '25' | string
  'cbid.firewall.dos.udp_burst': '50' | string
  'cbid.firewall.dos.icmp_enabled': '0' | BoolString
  'cbid.firewall.dos.icmp_rate': '25' | string
  'cbid.firewall.dos.icmp_burst': '50' | string
}

export type GetDoSPreventionEditPageResponse =
  GetDoSPreventionEditPageRequest & {
    errors?: Record<string, unknown>
    apply?: string
  }

/** 1.6.6 DMZ Host */

// 1.6.6.1 Get DMZ Host Page
export type DmzHostPageResult = {
  'cbid.dmz.dmz.enable': '0' | BoolString
  'cbid.dmz.dmz.dmz_ip': string
}

export type GetDmzHostPageResponse = StatusMessageType & {
  result: DmzHostPageResult
}

// 1.6.6.2 Set DMZ Host Page
export type SetDmzHostPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'cbid.dmz.dmz.enable': '0' | BoolString
  'cbid.dmz.dmz.dmz_ip': string
}

export type SetDmzHostPageResponse = SetDmzHostPageRequest & {
  errors?: Record<string, unknown>
  apply?: string
}

/** 1.6.7 One-to-One NAT */

// 1.6.7.1 Get One-to-One NAT Page
export type GetOneToOneNATPageRequest = {
  get_options?: BoolString
}

export type GetOneToOneNatPageResponse = StatusMessageType & {
  result: {
    staticnat: Record<string, unknown>[]
    wan_proto: string
    wan_static_ip: string
    wan2_proto: string
    wan2_static_ip: string
  } & Partial<
    Record<
      | `cbid.firewall.${string}.enabled`
      | `cbid.firewall.${string}.name`
      | `cbid.firewall.${string}.dest_ip`
      | `cbid.firewall.${string}.src_ip`
      | `cbid.firewall.${string}.iface`
      | `cbid.firewall.${string}.fwdmode`
      | `cbid.firewall.${string}.time_schedule`,
      string
    >
  >
  options: Partial<Record<string, unknown>>
}

// 1.6.7.2 Set One-to-One NAT Edit Page
export type SetOneToOneNATPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
  'cbi.sts.firewall.staticnat': string
} & Record<`cbid.firewall.${string}.enabled`, '1' | BoolString>

export type SetOneToOneNATPageResponse = GetOneToOneNatPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}

// 1.6.7.3 Add One-to-One NAT
export type AddOneToOneNATPageRequest = SetOneToOneNATPageRequest & {
  // Except: cbi.apply
  'cbi.cts.firewall.staticnat.': 'Add' | string
  '_newonenat.name': string
  '_newonenat.priaddr': string
  '_newonenat.pubaddr': string
  '_newonenat.iface': 'wan' | 'wan2' | string
  '_newonenat.fwdmode': 'dmz' | 'portforward' | string
  '_newonenat.proto'?: 'tcpudp' | 'tcp' | 'udp' | 'icmp' | string
  '_newonenat.src_port'?: string
  '_newonenat.dest_port'?: string
  '_newonenat.reflection'?: BoolString
  '_newonenat.schedule': string
}

export type AddOneToOneNATPageResponse = SetOneToOneNATPageResponse

// 1.6.7.4 Delete One-to-One NAT
export type DeleteOneToOneNATPageRequest = SetOneToOneNATPageRequest & {
  // Except: cbi.apply
}

// 1.6.7.5 Get One-to-One NAT Edit Page
export type GetOneToOneNATEditPageRequest = {
  get_options: BoolString
}

export type GetOneToOneNATEditPageResponse = StatusMessageType & {
  result: Record<`cbid.firewall.${string}.__enabled`, '1' | BoolString> &
    Record<`cbid.firewall.${string}.name`, string> &
    Record<`cbid.firewall.${string}.dest_ip`, string> &
    Record<`cbid.firewall.${string}.src_ip`, string> &
    Record<`cbid.firewall.${string}.iface`, 'wan' | string> &
    Record<`cbid.firewall.${string}.fwdmode`, 'dmz' | string> &
    Partial<Record<`cbid.firewall.${string}.proto`, 'tcpudp' | string>> &
    Partial<Record<`cbid.firewall.${string}.src_port`, string>> &
    Partial<Record<`cbid.firewall.${string}.dest_port`, string>> &
    Record<`cbid.firewall.${string}.reflection`, '1' | BoolString> &
    Record<`cbid.firewall.${string}.time_schedule`, string>
  options: Partial<Record<string, unknown>>
}

// 1.6.7.6 Set One-to-One NAT Edit Page
export type SetOneToOneNATEditPageRequest = {
  'cbi.apply'?: 'Apply' | string
  'cbi.submit': '1' | string
} & Record<`'cbid.firewall.${string}.__enabled`, '1' | BoolString> &
  Record<`cbid.firewall.${string}.name`, string> &
  Record<`cbid.firewall.${string}.dest_ip`, string> &
  Record<`cbid.firewall.${string}.src_ip`, string> &
  Record<`cbid.firewall.${string}.iface`, 'wwan' | 'wwan2' | string> &
  Record<`cbid.firewall.${string}.fwdmode`, 'dmz' | 'portforward' | string> &
  Partial<Record<`cbid.firewall.${string}.proto`, string>> &
  Partial<Record<`cbid.firewall.${string}.src_port`, string>> &
  Partial<Record<`cbid.firewall.${string}.dest_port`, string>> &
  Record<`cbid.firewall.${string}.reflection`, BoolString> &
  Record<`cbid.firewall.${string}.time_schedule`, string>

// ???
export type SetOneToOneNATEditPageResponse = GetOneToOneNATEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}
