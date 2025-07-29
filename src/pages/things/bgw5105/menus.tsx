import { ReactElement } from 'react'
import {
  BasicInformation,
  Log,
  Wireless2GHz,
  Wireless5GHz,
} from './basicConfig'
import {
  DmzHost,
  DosPrevention,
  GeneralSettings,
  IpFiltering,
  MacFiltering,
  OneToOneNat,
  PortForward,
  PortTrigger,
  TrafficRules,
  UrlFiltering,
} from './firewall'
import { Alg } from './alg'
import { Bgp, Ospf, Rip, StaticRoutes } from './routing'
import {
  AccessManagement,
  BackupFlashFirmware,
  Reboot,
  Schedule,
  System,
} from './administrator'
import { Cellular, RealtimeGraphs, Routes, SystemLog } from './status'
import { Wireless2Primary } from './wireless/Wireless2Primary'
import { Wireless5Primary } from './wireless/Wireless5Primary'
import { Wireless2Multiple } from './wireless/Wireless2Multiple'
import { Wireless5Multiple } from './wireless/Wireless5Multiple'
import { Lan } from './network/Lan'

export type TabMenuProps = {
  label: string
  component: ReactElement
}

export const basicConfigItems: TabMenuProps[] = [
  {
    label: 'Basic Information',
    component: <BasicInformation />,
  },
  {
    label: 'Log',
    component: <Log />,
  },
  {
    label: 'Wireless 2.4GHz',
    component: <Wireless2GHz />,
  },
  {
    label: 'Wireless 5GHz',
    component: <Wireless5GHz />,
  },
]

export const networkItems: TabMenuProps[] = [
  {
    label: 'LAN',
    component: <Lan />,
  },
]

export const wirelessItems: TabMenuProps[] = [
  {
    label: 'Wireless 2.4GHz Primary SSID',
    component: <Wireless2Primary />,
  },
  {
    label: 'Wireless 2.4GHz Multiple SSID',
    component: <Wireless2Multiple />,
  },
  {
    label: 'Wireless 5GHz Primary SSID',
    component: <Wireless5Primary />,
  },
  {
    label: 'Wireless 5GHz Multiple SSID',
    component: <Wireless5Multiple />,
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
    label: 'IP Filtering',
    component: <IpFiltering />,
  },
  {
    label: 'MAC Filtering',
    component: <MacFiltering />,
  },
  {
    label: 'URL Filtering',
    component: <UrlFiltering />,
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
    label: 'Cellular',
    component: <Cellular />,
  },
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
