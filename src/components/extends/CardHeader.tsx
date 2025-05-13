import React from 'react'
import { CardHeader as MuiCardHeader, Divider, Typography } from '@mui/material'
interface CardHeaderProps {
  title: string
  noLine?: boolean
  children?: React.ReactNode
}

export const CardHeader = ({
  title,
  noLine = false,
  children,
}: CardHeaderProps) => {
  return (
    <MuiCardHeader
      title={
        <>
          <Typography variant='h3'>{title}</Typography>
          {!noLine && <Divider sx={{ padding: '10px 0' }} />}
          <>{children}</>
        </>
      }
      sx={{ paddingBottom: 0 }}
    />
  )
}
