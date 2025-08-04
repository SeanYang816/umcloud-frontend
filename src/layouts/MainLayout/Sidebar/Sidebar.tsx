import React, { useState } from 'react'
import {
  Box,
  Drawer,
  Typography,
  Avatar,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom' // 🧭
import { routePermissions } from 'routes/routePermissions'
import UmediaLogo from 'assets/icons/umedia-logo.svg?react'
import { useAuth } from 'hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const drawerWidth = 340

export const Sidebar = () => {
  const { logout } = useAuth()
  const username = useSelector(
    (state: RootState) => state.bgw5105.authentication.user || '',
  )
  const navigate = useNavigate() // 🧭
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const handleToggle = (label: string) => () => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          backgroundColor: '#01334D',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ px: 2, py: 3 }}>
        <UmediaLogo width={180} />
      </Box>

      <List component='nav'>
        {routePermissions.map(({ label, icon, children, expandable, path }) => {
          const isSelected = path === location.pathname

          return (
            <React.Fragment key={label}>
              <ListItemButton
                selected={isSelected}
                onClick={
                  expandable
                    ? handleToggle(label)
                    : path
                      ? () => navigate(path)
                      : undefined
                }
                sx={{
                  mx: 2.5,
                  borderRadius: 1,
                  color: isSelected ? '#D1F1FF' : '#22BDC8',
                  '&.Mui-selected': {
                    backgroundColor: '#0095AE',
                  },
                }}
              >
                {icon && (
                  <ListItemIcon
                    sx={{
                      fill: isSelected ? '#D1F1FF' : '#22BDC8',
                      stroke: isSelected ? '#D1F1FF' : '#22BDC8',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      style: {
                        fontSize: 20,
                      },
                    },
                  }}
                />

                {expandable &&
                  (openSections[label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Nested children (if any) */}
              {children && (
                <Collapse in={openSections[label]} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {children.map((child) => (
                      <ListItemButton key={child} sx={{ pl: 6 }}>
                        <ListItemText primary={child} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          )
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* User Info */}
      <Box
        sx={{
          px: 2,
          py: 3,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box
          sx={{
            bgcolor: '#025E7B',
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            mb={3}
          >
            <Avatar sx={{ backgroundColor: '#22BDC8' }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant='body2' ml={2.25}>
              {username}
            </Typography>
          </Stack>

          <Button
            variant='outlined'
            size='small'
            sx={{
              borderRadius: 15,
              borderColor: '#22BDC8',
              color: '#22BDC8',
            }}
            onClick={logout}
          >
            SIGN OUT
          </Button>
        </Box>

        <Typography color='#AAAAAA' display='block' align='center' mt={2}>
          v 0.0.0.1
        </Typography>
      </Box>
    </Drawer>
  )
}
