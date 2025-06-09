import { Box, useMediaQuery } from '@mui/material'

import { Outlet, useLocation } from 'react-router-dom'
import { DefaultRootStateProps } from 'types'
import { useSelector } from 'react-redux'
import { ApplyLoading } from 'components/ApplyLoading'
import { ErrorDialog } from 'components/ErrorDialog'
import { WebsocketConnecting } from 'components/WebsocketConnecting'
import { Sidebar } from './Sidebar/Sidebar'

export const MainLayout = () => {
  const location = useLocation()
  const isMdUp = useMediaQuery('(min-width:600px)')

  const isDevice = location.pathname === '/things/device'
  const isLoading = useSelector(
    (state: DefaultRootStateProps) => state.config.apply.isLoading,
  )
  const isConnecting = useSelector(
    (state: DefaultRootStateProps) => state.global.isWSConnected,
  )
  const isDeviceLoading = isDevice && isLoading
  const websocketDisconnected = isDevice && !isConnecting

  const headerHeight = 88
  const drawerWidth = 340
  const sidePadding = 20

  const contentBgColor = '#F2F2F2'

  return (
    <>
      <Sidebar />

      {/** Contents */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: contentBgColor,
          // marginTop: `${headerHeight}px`,
          marginLeft: isMdUp ? `${drawerWidth}px` : 0,
          width: isMdUp ? `calc(100% - ${drawerWidth}px)` : '100%',
          height: '100vh',
          overflow:
            isDeviceLoading || websocketDisconnected ? 'hidden' : 'auto',
          padding: `${sidePadding}px`,
        }}
      >
        <ApplyLoading open={isDeviceLoading} />

        <ErrorDialog />

        <WebsocketConnecting
          open={websocketDisconnected}
          headerHeight={headerHeight}
        />
        <Outlet />
      </Box>
    </>
  )
}
