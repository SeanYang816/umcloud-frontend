import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material'
import { People } from '@mui/icons-material'

export const ConnectionStatsCard = ({ data }) => {
  if (!data) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            No connection data available
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const getConnectionUsagePercentage = () => {
    if (!data.connmax || data.connmax === 0) return 0

    return (data.conncount / data.connmax) * 100
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <People />
          <Typography variant='h6'>Connection Stats</Typography>
        </Box>

        {/* Active Connections */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2'>Active Connections</Typography>
            <Typography variant='body2'>
              {data.conncount} / {data.connmax}
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={getConnectionUsagePercentage()}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>

        {/* Lease Counts */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              DHCP Leases
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              {data.leases?.length || 0}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              IPv6 Leases
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              {data.leases6?.length || 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
