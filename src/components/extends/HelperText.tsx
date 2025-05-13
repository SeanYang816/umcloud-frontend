import { HelpOutlineOutlined } from '@mui/icons-material'
import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

export const HelperText = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' sx={{ color: theme.palette.grey[700] }}>
      <HelpOutlineOutlined
        sx={{ height: '12px', width: '12px', margin: '3px' }}
      />
      <Typography variant='subtitle2' fontSize={'0.7rem'}>
        {children}
      </Typography>
    </Stack>
  )
}
