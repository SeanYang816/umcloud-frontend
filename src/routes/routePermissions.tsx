import { SvgIcon } from 'components/SvgIcon'
import Things from 'pages/things'
import { Dashboard } from 'pages/dashboard'

export const routePermissions = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: <SvgIcon icon='locations' />,
    component: <Dashboard />,
  },
  {
    id: 'things',
    title: 'Device',
    path: '/things',
    icon: <SvgIcon icon='settings' />,
    component: <Things />,
  },
]
