import { Card, Box, Typography, CardContent } from '@mui/material'
import React from 'react'

type InfoCardProps = {
  title: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  subtext,
  icon,
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            {title}
          </Typography>
          {icon && <Box>{icon}</Box>}
        </Box>

        <Typography variant='h5' fontWeight='bold'>
          {value}
        </Typography>

        {subtext && (
          <Typography variant='caption' color='text.secondary'>
            {subtext}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
