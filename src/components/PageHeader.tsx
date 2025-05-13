import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

interface PageHeaderProps {
  title: string
  subtitle?: string | React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = React.memo(
  ({ title, subtitle }) => {
    const theme = useTheme()

    return (
      <Box
        sx={{
          padding: `${theme.spacing(1)} 0 ${theme.spacing(2)} ${theme.spacing(0.5)} `,
        }}
      >
        <Typography variant='h1'>{title}</Typography>
        {typeof subtitle === 'string' ? (
          <Typography
            variant='subtitle1'
            sx={{
              marginTop: theme.spacing(0.5),
            }}
          >
            {subtitle}
          </Typography>
        ) : (
          <>{subtitle}</>
        )}
      </Box>
    )
  },
)

PageHeader.displayName = 'PageHeader'
