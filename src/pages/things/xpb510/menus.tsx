import { ReactElement } from 'react'
import { Overview, Log } from './overview'
import {
  DmzHost,
  DosPrevention,
  GeneralSettings,
  OneToOneNat,
  PortForward,
  PortTrigger,
  TrafficRules,
} from './network/firewall'
import { Bgp, Ospf, Rip, StaticRoutes } from './routing'
import {
  AccessManagement,
  BackupFlashFirmware,
  Reboot,
  Schedule,
  System,
} from './administrator'
import { RealtimeGraphs, Routes, SystemLog } from './status'

import { Lan } from './network/lan'
import { Iot } from './iot'
import { Alg } from './network/alg'

export type TabMenuProps = {
  label: string
  component: ReactElement
}

export const iotTabs: TabMenuProps[] = [
  {
    label: 'IOT',
    component: <Iot />,
  },
]

export const basicConfigItems: TabMenuProps[] = [
  {
    label: 'Overview',
    component: <Overview />,
  },
  // {
  //   label: 'Log',
  //   component: <Log />,
  // },
]

export const networkItems: TabMenuProps[] = [
  {
    label: 'LAN',
    component: <Lan />,
  },
]

export const firewallItems: TabMenuProps[] = [
  {
    label: 'General Settings',
    component: <GeneralSettings />,
  },
  {
    label: 'Port Forward',
    component: <PortForward />,
  },
  {
    label: 'Port Trigger',
    component: <PortTrigger />,
  },
  {
    label: 'Traffic Rules',
    component: <TrafficRules />,
  },
  {
    label: 'DoS Prevention',
    component: <DosPrevention />,
  },
  {
    label: 'DMZ Host',
    component: <DmzHost />,
  },
  {
    label: 'One-to-One NAT',
    component: <OneToOneNat />,
  },
]

export const algItems: TabMenuProps[] = [
  {
    label: 'ALG',
    component: <Alg />,
  },
]

export const routingItems: TabMenuProps[] = [
  {
    label: 'Static Routes',
    component: <StaticRoutes />,
  },
  {
    label: 'RIP',
    component: <Rip />,
  },
  {
    label: 'OSPF',
    component: <Ospf />,
  },
  {
    label: 'BGP',
    component: <Bgp />,
  },
]

export const administratorItems: TabMenuProps[] = [
  {
    label: 'System',
    component: <System />,
  },
  {
    label: 'Schedule',
    component: <Schedule />,
  },
  {
    label: 'Access Management',
    component: <AccessManagement />,
  },
  {
    label: 'Backup/Flash Firmware',
    component: <BackupFlashFirmware />,
  },
  {
    label: 'Reboot',
    component: <Reboot />,
  },
]

export const statusItems: TabMenuProps[] = [
  {
    label: 'Realtime Graphs',
    component: <RealtimeGraphs />,
  },
  {
    label: 'Routes',
    component: <Routes />,
  },
  {
    label: 'SystemLog',
    component: <SystemLog />,
  },
]
