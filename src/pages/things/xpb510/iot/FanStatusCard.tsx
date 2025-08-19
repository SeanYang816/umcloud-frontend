import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
} from '@mui/material'
import {
  Thermostat,
  GpsFixed,
  Air,
  Settings,
  PowerSettingsNew,
  AutoMode,
} from '@mui/icons-material'
import { FanMode, FanStatus } from 'types/xpb510/iot/iot'
import { DialogController } from 'components/DialogController'
import { EditFanStatusDialog } from './EditFanStatusDialog'
import React from 'react'

type FanStatusCardProps = {
  data: FanStatus
}

const FAN_MODE_CONFIG: Record<
  FanMode,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  0: {
    label: 'Off',
    color: '#637588',
    bgColor: '#f1f5f9',
    borderColor: '#00000000',
  },
  1: {
    label: 'On',
    color: '#14e15f',
    bgColor: '#14e15f1a',
    borderColor: '#14e15f33',
  },
  2: {
    label: 'Auto',
    color: '#fff',
    bgColor: '#14b8e1',
    borderColor: '#fff',
  },
}

const getDeviationStatus = (deviation: number) => {
  const abs = Math.abs(deviation)
  if (abs <= 1)
    return {
      label: 'Within optimal range',
      color: 'success',
      bgColor: '#e8f5e8',
    }
  if (abs <= 3)
    return { label: 'Moderate deviation', color: 'warning', bgColor: '#fff3e0' }

  return { label: 'Significant deviation', color: 'error', bgColor: '#ffebee' }
}

export function FanStatusCard({
  data: { fanMode, deviation, threshold },
}: FanStatusCardProps) {
  const fanConfig = FAN_MODE_CONFIG[fanMode] || FAN_MODE_CONFIG[0]
  const deviationStatus = getDeviationStatus(deviation)

  const FAN_MODE_BUTTONS: {
    mode: FanMode
    label: string
    icon: React.ElementType
  }[] = [
    { mode: 0, label: 'Off', icon: PowerSettingsNew },
    { mode: 1, label: 'On', icon: Air },
    { mode: 2, label: 'Auto', icon: AutoMode },
  ]
  const Icon = FAN_MODE_BUTTONS[fanMode].icon

  return (
    <Card>
      <CardContent>
        <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
          <Stack direction='row' alignItems={'center'} gap={1}>
            <Air color='primary' />
            <Typography variant='h6' fontWeight='bold'>
              Fan Status
            </Typography>
          </Stack>
          <Chip
            label={
              <Stack direction='row' alignItems='center'>
                {<Icon sx={{ height: 20 }} />}
                {fanConfig.label}
              </Stack>
            }
            variant='outlined'
            sx={{
              color: fanConfig.color,
              backgroundColor: fanConfig.bgColor,
              borderColor: fanConfig.borderColor,
            }}
          />
        </Stack>
        {/* Fan Mode Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <DialogController>
            {({ open, onOpen, onClose }) => (
              <>
                <Button
                  variant='outlined'
                  startIcon={<Settings />}
                  onClick={onOpen}
                >
                  Edit
                </Button>
                {open && (
                  <EditFanStatusDialog
                    open={open}
                    onClose={onClose}
                    data={{ fanMode, deviation, threshold }}
                  />
                )}
              </>
            )}
          </DialogController>
        </Box>

        {/* Deviation & Threshold */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            gap: 2,
          }}
        >
          {/* Threshold */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                p: 1.5, // less padding
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 0.5, // less vertical spacing
                }}
              >
                <GpsFixed color='info' fontSize='small' />
                <Typography variant='body2' fontWeight='medium'>
                  Target Threshold
                </Typography>
              </Box>

              <Typography
                variant='h5' // smaller than h4
                fontWeight='bold'
                color='info.main'
                sx={{ lineHeight: 1.2 }}
              >
                {threshold.toFixed(1)}°C
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                System target temperature
              </Typography>
            </Box>
          </Box>

          {/* Deviation */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                p: 1.5, // reduced from 2
                borderRadius: 2,
                backgroundColor: deviationStatus.bgColor,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 0.5, // less vertical space
                }}
              >
                <Thermostat
                  fontSize='small'
                  // color={deviationStatus.color as string}
                />
                <Typography variant='body2' fontWeight='medium'>
                  Temperature Deviation
                </Typography>
              </Box>

              <Typography
                variant='h5' // reduced from h4
                fontWeight='bold'
                color={`${deviationStatus.color}.main`}
                sx={{ lineHeight: 1.2 }} // tighten line spacing
              >
                {deviation > 0 ? '+' : ''}
                {deviation.toFixed(1)}°C
              </Typography>

              <Typography variant='caption' color='text.secondary'>
                {deviationStatus.label}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
