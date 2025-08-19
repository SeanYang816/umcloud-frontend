import React from 'react'
import { Card, CardContent, Box, Typography } from '@mui/material'
import { Language, CheckCircle, Cancel } from '@mui/icons-material'

export const WanConnectionCard = ({ data }) => {
  if (!data?.wan) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>No WAN data available</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Language />
          <Typography variant='h6'>WAN Connection</Typography>
        </Box>

        {/* Content Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          {/* Status */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {data.wan.is_up ? (
                <CheckCircle sx={{ color: 'success.main', fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: 'error.main', fontSize: 16 }} />
              )}
              <Typography fontWeight='medium'>
                {data.wan.is_up ? 'Connected' : 'Disconnected'}
              </Typography>
            </Box>
          </Box>

          {/* Protocol */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Protocol
            </Typography>
            <Typography fontWeight='medium'>
              {data.wan.proto || 'N/A'}
            </Typography>
          </Box>

          {/* IP Address */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              IP Address
            </Typography>
            <Typography fontWeight='medium'>
              {data.wan.ipaddr || 'N/A'}
            </Typography>
          </Box>

          {/* Gateway */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Gateway
            </Typography>
            <Typography fontWeight='medium'>
              {data.wan.gwaddr || 'N/A'}
            </Typography>
          </Box>

          {/* Netmask */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Netmask
            </Typography>
            <Typography fontWeight='medium'>
              {data.wan.netmask || 'N/A'}
            </Typography>
          </Box>

          {/* DNS */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              DNS
            </Typography>
            <Typography fontWeight='medium'>
              {Array.isArray(data.wan.dns) && data.wan.dns.length > 0
                ? data.wan.dns.join(', ')
                : 'No DNS'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
