import React from 'react'

import {
  Button,
  List,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  useTheme,
  ListItemButton,
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyIcon from '@mui/icons-material/Key'
import LogoutIcon from '@mui/icons-material/Logout'
import { UserName } from './UserName'
import { ChangePasswordDialog } from '../dialogs/ChangePasswordDialog'
import { useAuth } from 'hooks/useAuth'
import { DialogController } from 'components/DialogController'

export function Profile() {
  const theme = useTheme()
  const { logout } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <>
      <Button
        disableRipple
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <UserName />
        <ExpandMoreIcon color={open ? 'primary' : 'secondary'} />
      </Button>

      <Popover
        id='fade-popover'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ width: theme.spacing(30), padding: theme.spacing(2) }}>
          <DialogController>
            {({ open, onOpen, onClose }) => (
              <>
                <ListItemButton onClick={onOpen}>
                  <ListItemIcon>
                    <KeyIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Change Password</Typography>
                  </ListItemText>
                </ListItemButton>
                <ChangePasswordDialog open={open} onClose={onClose} />
              </>
            )}
          </DialogController>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography>Log Out</Typography>
            </ListItemText>
          </ListItemButton>
        </List>
      </Popover>
    </>
  )
}
