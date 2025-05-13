import { useState } from 'react'
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material'

import { Header } from './Header'
import { Sidebar } from './Sidebar'

import { Outlet, useLocation } from 'react-router-dom'
import { DefaultRootStateProps } from 'types'
import { useSelector } from 'react-redux'
import { ApplyLoading } from 'components/ApplyLoading'
import { ErrorDialog } from 'components/ErrorDialog'
import { WebsocketConnecting } from 'components/WebsocketConnecting'

export const MainLayout = () => {
  const location = useLocation()
  const isMdUp = useMediaQuery('(min-width:600px)')

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const handleDrawerButtonClick = () => setIsDrawerOpen((prev) => !prev)

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
  const drawerWidth = 250
  const sidePadding = 20

  const headerBgColor = '#FFF'
  const sidebarBgColor = '#fff'
  const contentBgColor = '#b8f9e633'

  return (
    <>
      {/** Header */}
      <AppBar
        position='fixed'
        sx={{
          bgcolor: headerBgColor,
          height: `${headerHeight}px`,
          boxShadow: '0px 1px 4px #15223214',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            padding: `${sidePadding}px`,
          }}
        >
          <Header isDesktop={isMdUp} onClick={handleDrawerButtonClick} />
        </Toolbar>
      </AppBar>

      <Sidebar
        open={isMdUp ? true : isDrawerOpen}
        variant={isMdUp ? 'permanent' : 'persistent'}
        onClose={handleDrawerButtonClick}
        sx={{
          '.MuiDrawer-paper': {
            width: `${drawerWidth}px`,
            marginTop: `${headerHeight}px`,
            paddingTop: '24px',
            backgroundColor: sidebarBgColor,
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px',
          },
        }}
      />

      {/** Contents */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: contentBgColor,
          marginTop: `${headerHeight}px`,
          marginLeft: isMdUp ? `${drawerWidth}px` : 0,
          width: isMdUp ? `calc(100% - ${drawerWidth}px)` : '100%',
          height: `calc(100vh - ${headerHeight}px)`,
          overflow:
            isDeviceLoading || websocketDisconnected ? 'hidden' : 'auto',
          padding: `${sidePadding}px`,
        }}
      >
        <ApplyLoading open={isDeviceLoading} headerHeight={headerHeight} />
        <ErrorDialog headerHeight={headerHeight} />
        <WebsocketConnecting
          open={websocketDisconnected}
          headerHeight={headerHeight}
        />
        <Outlet />
      </Box>
    </>
  )
}
