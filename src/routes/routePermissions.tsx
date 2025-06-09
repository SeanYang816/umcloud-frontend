import Things from 'pages/things'
import { Dashboard } from 'pages/dashboard'
import LocationsIcon from 'assets/icons/ic_dashboard.svg?react'
import SettingsIcon from 'assets/icons/ic_setting.svg?react'

export const routePermissions = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LocationsIcon />,
    component: <Dashboard />,
    expandable: false,
    children: [],
  },
  {
    id: 'things',
    title: 'Device',
    label: 'Device',
    path: '/things',
    icon: <SettingsIcon />,
    component: <Things />,
    expandable: false,
    children: [],
  },
]
