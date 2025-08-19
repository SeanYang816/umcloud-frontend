import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material'
import { Memory } from '@mui/icons-material'

export const MemoryUsageCard = ({ data }) => {
  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))

    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
  }

  if (!data?.memory) {
    return (
      <Card>
        <CardContent>
          <Typography color='text.secondary'>
            No memory data available
          </Typography>
        </CardContent>
      </Card>
    )
  }

  const getMemoryUsagePercentage = () => {
    const { total, free, buffered, shared } = data.memory
    const used = total - free - buffered - shared

    return total > 0 ? (used / total) * 100 : 0
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Memory />
          <Typography variant='h6'>Memory Usage</Typography>
        </Box>

        {/* Usage Progress */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2'>Memory Usage</Typography>
            <Typography variant='body2'>
              {getMemoryUsagePercentage().toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={getMemoryUsagePercentage()}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Box>

        {/* Memory Details */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Total
            </Typography>
            <Typography fontWeight='medium'>
              {formatBytes(data.memory.total)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Free
            </Typography>
            <Typography fontWeight='medium'>
              {formatBytes(data.memory.free)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Buffered
            </Typography>
            <Typography fontWeight='medium'>
              {formatBytes(data.memory.buffered)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              Shared
            </Typography>
            <Typography fontWeight='medium'>
              {formatBytes(data.memory.shared)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
