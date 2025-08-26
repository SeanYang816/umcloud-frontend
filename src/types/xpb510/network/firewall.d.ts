import {
  BoolString,
  Options,
  ProtocolOption,
  SourceInterfaceOption,
  StatusMessageType,
  Suggest,
  WanInterfaceOption,
} from 'types'

/** 1.6 Firewall */

/** 1.6.1 General Settings */

// 1.6.1.1 Get General Settings Page

export type GetGeneralSettingsPageResult = {
  'cbid.firewall.wan_ping.enabled': string
}
export type GetGeneralSettingsPageResponse = StatusMessageType & {
  result: GetGeneralSettingsPageResult
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
  options?: Options
  suggest?: Suggest
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
  result: PortForwardEditPageResult
  options?: Options
  suggest?: Suggest
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

export type PortTriggerEditField =
  | '__enabled'
  | 'name'
  | 'iface'
  | 'match_proto'
  | 'match_port'
  | 'trigger_proto'
  | 'trigger_port'
  | 'time_schedule'

export type PortTriggerEditResult = Record<
  `cbid.firewall.${string}.${PortTriggerEditField}`,
  string
>

export type GetPortTriggerEditPageResponse = StatusMessageType & {
  result: PortTriggerEditResult
  options?: Options
  suggest?: Suggest
}

// 1.6.3.6 Set Port Trigger Edit Page
export type SetPortTriggerEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
} & PortTriggerEditResult
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

export type GetTrafficFieldEditMap = {
  __enabled: string // DOC MISSING
  name: string
  family: string
  proto: string
  icmp_type: string[]
  src: string
  src_mac: string
  src_ip: string
  src_port: string
  dest: string
  dest_ip: string
  dest_port: string
  target: string
  extra: string
  time_schedule: string
}

export type GetTrafficEditResult = {
  [K in keyof GetTrafficFieldEditMap as `cbid.firewall.${string}.${K & string}`]: GetTrafficFieldEditMap[K]
}

export type GetTrafficRulesEditPageResponse = StatusMessageType & {
  result: GetTrafficEditResult
  options?: Options
  suggest?: Suggest
}

// 1.6.4.7 Set Traffic Rules Edit Page

export type SetTrafficFieldMap = GetTrafficFieldEditMap

export type SetTrafficEditCbidKey<
  TId extends string,
  K extends keyof SetTrafficFieldMap,
> = `cbid.firewall.${TId}.${K & string}`

export type SetTrafficEditPayload<TId extends string = string> = {
  [K in keyof SetTrafficFieldMap as SetTrafficEditCbidKey<
    TId,
    K
  >]: SetTrafficFieldMap[K]
}

export type SetTrafficRulesEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: string
} & SetTrafficEditPayload

export type SetTrafficRulesEditPageResponse = SetTrafficRulesEditPageRequest

/** 1.6.5 DoS Prevention */

// 1.6.5.1 Get DoS Prevention Page
type DosProto = 'tcp' | 'udp' | 'icmp'
type DosField = 'enabled' | 'rate' | 'burst'
type DosPreventionPageResult = {
  [P in DosProto as `cbid.firewall.dos.${P}_enabled`]: string
} & { [P in DosProto as `cbid.firewall.dos.${P}_rate`]: string } & {
  [P in DosProto as `cbid.firewall.dos.${P}_burst`]: string
}

export type GetDoSPreventionPageResponse = StatusMessageType & {
  result: DosPreventionPageResult
}

// 1.6.5.2 Get DoS Prevention Edit Page
export type SetDoSPreventionEditPageRequest = {
  'cbi.submit': string
  'cbi.apply'?: 'Apply' | string
} & DosPreventionPageResult

export type GetDoSPreventionEditPageResponse =
  SetDoSPreventionEditPageRequest & {
    errors?: Record<string, unknown>
    apply?: string
  }

/** 1.6.6 DMZ Host */

// 1.6.6.1 Get DMZ Host Page
export type DmzHostPageResult = {
  'cbid.dmz.dmz.enable': string
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
  } & Record<
    | `cbid.firewall.${string}.enabled`
    | `cbid.firewall.${string}.name`
    | `cbid.firewall.${string}.dest_ip`
    | `cbid.firewall.${string}.src_ip`
    | `cbid.firewall.${string}.iface`
    | `cbid.firewall.${string}.fwdmode`
    | `cbid.firewall.${string}.time_schedule`,
    string
  >
  options: Options
  suggest: Suggest
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

export type AddOneToOneNatField = {
  name: string
  priaddr: string
  pubaddr: string
  iface: string
  fwdmode: string
  proto?: string
  src_port?: string
  dest_port?: string
  reflection?: string
  schedule: string
}
export type AddOneToOneNATPageRequest = SetOneToOneNATPageRequest & {
  // Except: cbi.apply
  'cbi.cts.firewall.staticnat.': string
  '_newonenat.name': string
  '_newonenat.priaddr': string
  '_newonenat.pubaddr': string
  '_newonenat.iface': string
  '_newonenat.fwdmode': string
  '_newonenat.proto'?: string
  '_newonenat.src_port'?: string
  '_newonenat.dest_port'?: string
  '_newonenat.reflection'?: string
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

export type GetOneToOneNatField =
  | '__enabled'
  | 'name'
  | 'dest_ip'
  | 'src_ip'
  | 'iface'
  | 'fwdmode'
  | 'proto'
  | 'src_port'
  | 'dest_port'
  | 'reflection'
  | 'time_schedule'

export type GetOneToOneNatEditResult = Record<
  `cbid.firewall.${string}.${GetOneToOneNatField}`,
  string
>
export type GetOneToOneNatEditPageResponse = StatusMessageType & {
  result: GetOneToOneNatEditResult
  options?: Options
  suggest?: Suggest
}

// 1.6.7.6 Set One-to-One NAT Edit Page
export type SetOneToOneNatEditPageRequest = {
  'cbi.apply'?: 'Apply' | string
  'cbi.submit': '1' | string
} & GetOneToOneNatEditResult

// ???
export type SetOneToOneNATEditPageResponse = GetOneToOneNatEditPageResponse & {
  errors?: Record<string, unknown>
  apply?: string
}
