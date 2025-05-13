// material-ui
import { Drawer, DrawerProps } from '@mui/material'
import MenuList from './MenuList'
import React from 'react'

export interface SidebarProps extends DrawerProps {
  open: boolean
  variant: 'permanent' | 'persistent' | 'temporary'
  onClose: React.EventHandler<React.SyntheticEvent>
}

export const Sidebar = ({ open, variant, onClose, ...props }: SidebarProps) => {
  return (
    <Drawer
      open={open}
      anchor='left'
      variant={variant}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      {...props}
      PaperProps={{
        sx: {
          border: 'none',
        },
      }}
    >
      <MenuList />
    </Drawer>
  )
}
