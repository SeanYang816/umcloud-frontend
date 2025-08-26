import React from 'react'
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
} from '@mui/material'
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded'
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import { Edit } from '@mui/icons-material'
import { DialogController } from 'components/DialogController'
import { SampleGraph } from './graphs/SampleGraph'

// --- Mock Data ---
const mockRouter = {
  siteName: 'Hsinchu Router 01',
  groupName: 'Taiwan Cluster',
  lastContactDate: new Date().toISOString(),
  apInfo: {
    apn: 'internet',
    manufacturer: 'Huawei',
    modelName: 'B818',
    supportedBand: 'B1 / B3 / B7 / B8',
    rsrp: -92,
    rsrq: -8,
    signalStrength: -70,
    imei: '867123045678901',
    firmwareVersion: 'V12.0.3',
    hardwareVersion: 'HW-2.1',
    buildDate: '2025-06-20',
    partNumber: 'PN-4567',
    serialNumber: 'SN-889922',
  },
  fanMode: 'Auto',
  isFanEnabled: true,
}

const fwLabel = 'Up to date'
const fwColor: 'success' | 'error' | 'warning' | 'info' | 'default' = 'success'
const temp = '34.2°C'
const hum = '58%'
const tempColor = 'warning.main'

const fmt = (date: string) =>
  new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' })

const isRecent = (date: string) =>
  Date.now() - new Date(date).getTime() < 5 * 60 * 1000 // 5 mins

const Dot = ({ ok }: { ok: boolean }) => (
  <Box
    sx={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      bgcolor: ok ? 'success.main' : 'error.main',
    }}
  />
)

export function SampleInfo() {
  const router = mockRouter

  return (
    <Card variant='outlined'>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1.5}
          sx={{ mb: 2 }}
        >
          <Stack spacing={0.25}>
            <Stack direction='row' alignItems='center' gap={0.5}>
              <Typography variant='h6' sx={{ fontWeight: 700, height: 24 }}>
                {router.siteName}
              </Typography>
              <IconButton size='small'>
                <Edit fontSize='small' />
              </IconButton>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              Group: {router.groupName}
            </Typography>
          </Stack>

          <Stack direction='row' alignItems='center' gap={1.25}>
            <Dot ok={isRecent(router.lastContactDate)} />
            <Typography variant='body2' color='text.secondary'>
              Report Time: {fmt(router.lastContactDate)}
            </Typography>
          </Stack>
        </Stack>

        {/* Top quick stats row */}
        <Paper
          variant='outlined'
          sx={{
            p: 1.25,
            borderRadius: 2,
            bgcolor: 'background.default',
            mb: 2.5,
          }}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            flexWrap='wrap'
            gap={1.5}
          >
            <Stack direction='row' alignItems='center' gap={1.25}>
              <Avatar variant='rounded' sx={{ bgcolor: '#757575' }}>
                <SignalCellularAltRoundedIcon sx={{ color: 'grey.100' }} />
              </Avatar>
              <Typography variant='body2' color='text.secondary'>
                LTE · APN: <b>{router.apInfo.apn}</b>
              </Typography>
            </Stack>
            <DialogController>
              {({ open, onOpen, onClose }) => (
                <>
                  <Stack direction='row' alignItems='center' gap={1.25}>
                    <Avatar
                      variant='rounded'
                      sx={{ bgcolor: tempColor, cursor: 'pointer' }}
                      onClick={onOpen}
                    >
                      <ThermostatRoundedIcon sx={{ color: 'grey.100' }} />
                    </Avatar>
                    <Typography
                      variant='h6'
                      sx={{ color: tempColor, lineHeight: 1 }}
                    >
                      {temp}
                    </Typography>
                  </Stack>
                  <Dialog open={open} onClose={onClose}>
                    <DialogContent sx={{ '.MuiPaper-root': { maxWidth: 800 } }}>
                      <SampleGraph data={[]} />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </DialogController>

            <Stack direction='row' alignItems='center' gap={1.25}>
              <Avatar variant='rounded' sx={{ bgcolor: 'info.main' }}>
                <WaterDropRoundedIcon sx={{ color: 'grey.100' }} />
              </Avatar>
              <Typography variant='h6' color='info.main' sx={{ lineHeight: 1 }}>
                {hum}
              </Typography>
            </Stack>

            <Chip
              size='small'
              label={fwLabel}
              color={fwColor}
              sx={{ ml: 'auto' }}
            />
          </Stack>
        </Paper>

        {/* Three columns with comfy spacing */}
        {/* <Grid container spacing={2.25}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Section title='Connection'>
              <KVP label='Module'>
                {router.apInfo.manufacturer} {router.apInfo.modelName}
              </KVP>
              <KVP label='Bands'>{router.apInfo.supportedBand}</KVP>
              <KVP label='IMEI'>{router.apInfo.imei}</KVP>
              <Stack direction='row' gap={2}>
                <KVP label='RSRP'>
                  <Metric value={router.apInfo.rsrp} unit='dBm' />
                </KVP>
                <KVP label='RSRQ'>
                  <Metric value={router.apInfo.rsrq} unit='dB' />
                </KVP>
                <KVP label='RSSI'>
                  <Metric value={router.apInfo.signalStrength} unit='dBm' />
                </KVP>
              </Stack>
            </Section>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Section title='Firmware'>
              <KVP label='Module FW'>{router.apInfo.firmwareVersion}</KVP>
              <KVP label='Hardware'>{router.apInfo.hardwareVersion}</KVP>
              <KVP label='Build Date'>{router.apInfo.buildDate}</KVP>
              <KVP label='Part #'>{router.apInfo.partNumber}</KVP>
              <KVP label='Serial #'>{router.apInfo.serialNumber}</KVP>
            </Section>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Section title='Status'>
              <KVP label='Online'>
                {isRecent(router.lastContactDate) ? 'Yes' : 'No'}
              </KVP>
              <KVP label='Fan Mode'>{router.fanMode}</KVP>
              <KVP label='Fan Enabled'>
                {router.isFanEnabled ? 'Yes' : 'No'}
              </KVP>
              <KVP label='Location'>{router.siteName}</KVP>
              <KVP label='Group'>{router.groupName}</KVP>
            </Section>
          </Grid>
        </Grid> */}
      </CardContent>
    </Card>
  )
}

/* ---------- small presentational helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 1.5,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant='subtitle2' sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}

function KVP({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Stack spacing={0.25}>
      <Typography variant='caption' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body2'>{children}</Typography>
    </Stack>
  )
}

function Metric({ value, unit }: { value?: number; unit?: string }) {
  const display =
    typeof value === 'number' ? `${value}${unit ? ` ${unit}` : ''}` : 'N/A'

  return (
    <Tooltip title='Radio metric'>
      <Typography variant='body2'>{display}</Typography>
    </Tooltip>
  )
}
