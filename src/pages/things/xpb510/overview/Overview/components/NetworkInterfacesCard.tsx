import React, { FC } from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Paper,
  Chip,
} from '@mui/material'
import { ChipProps } from '@mui/material/Chip'
import { NetworkCheck } from '@mui/icons-material'
import { OverviewResult } from 'types/xpb510/status/overview'

type NetworkInterfacesCardProps = {
  data: OverviewResult
}

export const NetworkInterfacesCard: FC<NetworkInterfacesCardProps> = ({
  data,
}) => {
  const wanIf = data?.wan?.ifname ?? 'N/A'
  const wanUp = Boolean(data?.wan?.is_up)

  const wan2Up = Boolean(data?.wan2?.is_up)
  const hasWan2 = Boolean(data?.wan2)

  const apCount = Array.isArray(data?.wifinets) ? data.wifinets.length : 0

  interface RowProps {
    title: string
    subtitle: string
    label: string | number
    color?: ChipProps['color']
  }

  const Row: FC<RowProps> = ({ title, subtitle, label, color = 'default' }) => (
    <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography fontWeight='medium'>{title}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {subtitle}
          </Typography>
        </Box>
        <Chip label={label} color={color} size='small' />
      </Box>
    </Paper>
  )

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <NetworkCheck />
          <Typography variant='h6'>Network Interfaces</Typography>
        </Box>

        <Stack spacing={2}>
          {/* WAN */}
          <Row
            title={`WAN (${wanIf})`}
            subtitle='Primary Internet'
            label={wanUp ? 'Active' : 'Inactive'}
            color={wanUp ? 'success' : 'error'}
          />

          {/* WAN2 */}
          <Row
            title='WAN2'
            subtitle='Secondary Internet'
            label={hasWan2 ? (wan2Up ? 'Active' : 'Inactive') : 'Not Present'}
            color={hasWan2 ? (wan2Up ? 'success' : 'error') : 'default'}
          />

          {/* WiFi */}
          <Row
            title='WiFi Networks'
            subtitle='Wireless Access Points'
            label={`${apCount} APs`}
            color={apCount > 0 ? 'info' : 'default'}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
