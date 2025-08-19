import React, { useMemo, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Tooltip,
  TextField,
  Stack,
} from '@mui/material'
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded'
import WifiRoundedIcon from '@mui/icons-material/WifiRounded'
import BatteryStdRoundedIcon from '@mui/icons-material/BatteryStdRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

/**
 * Sensors Page (MUI version, desktop dashboard focus)
 * - Shows sensors connected to a router
 * - Larger typography for readability on desktop
 */

// ===== Types =====
type Quality = 'good' | 'uncertain' | 'bad'
type ValueKind = 'number' | 'boolean' | 'string' | 'enum'

type Channel = {
  key: string
  kind: ValueKind
  unit?: string
  value: number | boolean | string
  ts: string
  range?: { min: number; max: number }
  precision?: number
  allowed?: (string | number)[]
  quality?: Quality
}

type SensorLike = {
  id: string
  kind: 'sensor' | 'actuator'
  type: string
  subtype?: string
  model?: string
  manufacturer?: string
  name: string
  status: 'online' | 'offline' | 'sleeping' | 'fault'
  lastSeenAt?: string
  power?: { source: 'battery' | 'mains' | 'poe'; batteryLevel?: number }
  channels: Channel[]
  thresholds?: Record<string, { high?: number; low?: number }>
}

// ===== Helpers =====
const unitLabel = (unit?: string) =>
  unit === 'Cel'
    ? '°C'
    : unit === '%RH'
      ? '%'
      : unit === 'ug/m3'
        ? 'µg/m³'
        : (unit ?? '')
const formatNumber = (val: number, precision?: number) =>
  precision == null
    ? String(val)
    : val.toFixed(Math.max(0, Math.ceil(Math.log10(1 / precision))))
const formatValue = (c: Channel) =>
  c.kind === 'number' && typeof c.value === 'number'
    ? `${formatNumber(c.value, c.precision)}${c.unit ? ' ' + unitLabel(c.unit) : ''}`
    : c.kind === 'boolean'
      ? c.value
        ? 'Yes'
        : 'No'
      : String(c.value)

const qualityColor = (q?: Quality) =>
  q === 'good'
    ? 'success'
    : q === 'uncertain'
      ? 'warning'
      : q === 'bad'
        ? 'error'
        : undefined

const channelIcon = (key: string) => {
  switch (key) {
    case 'temperature':
      return <ThermostatRoundedIcon fontSize='inherit' />
    case 'humidity':
      return <WaterDropRoundedIcon fontSize='inherit' />
    case 'co2':
      return <CloudOutlinedIcon fontSize='inherit' />
    case 'pm2_5':
    case 'pm10':
      return <SignalCellularAltRoundedIcon fontSize='inherit' />
    default:
      return <SignalCellularAltRoundedIcon fontSize='inherit' />
  }
}

const ChannelChip: React.FC<{ c: Channel }> = ({ c }) => (
  <Tooltip
    title={
      <Box sx={{ p: 0.5 }}>
        <Typography variant='body2' color='text.secondary' display='block'>
          Timestamp: {new Date(c.ts).toLocaleString()}
        </Typography>
        {c.range && (
          <Typography variant='body2' color='text.secondary' display='block'>
            Range: {c.range.min} - {c.range.max} {unitLabel(c.unit)}
          </Typography>
        )}
      </Box>
    }
    arrow
  >
    <Chip
      size='medium'
      variant='outlined'
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'inline-flex', fontSize: 20 }}>
            {channelIcon(c.key)}
          </Box>
          <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
            {c.key.replace(/_/g, ' ')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {formatValue(c)}
          </Typography>
        </Box>
      }
      color={qualityColor(c.quality)}
      sx={{ borderRadius: 999, fontSize: '0.9rem', px: 1.5, py: 0.5 }}
    />
  </Tooltip>
)

const SensorCard: React.FC<{ s: SensorLike }> = ({ s }) => {
  const temp = s.channels.find((c) => c.key === 'temperature')
  const hum = s.channels.find((c) => c.key === 'humidity')

  return (
    <Card variant='outlined' sx={{ borderRadius: 3 }}>
      <CardHeader
        title={
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='h6' fontWeight={700}>
              {s.name}
            </Typography>
          </Stack>
        }
        subheader={
          <Typography variant='body2' color='text.secondary'>
            {s.type}
            {s.subtype ? ` · ${s.subtype}` : ''}
            {s.model ? ` · ${s.model}` : ''}
          </Typography>
        }
        action={
          <Stack direction='row' spacing={2} alignItems='center'>
            {s.power?.source === 'battery' && (
              <Stack direction='row' spacing={0.5} alignItems='center'>
                <BatteryStdRoundedIcon fontSize='small' />
                <Typography variant='body2'>
                  {Math.round((s.power.batteryLevel ?? 0) * 100)}%
                </Typography>
              </Stack>
            )}
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <WifiRoundedIcon fontSize='small' />
              <Typography variant='body2'>
                Last seen{' '}
                {s.lastSeenAt
                  ? new Date(s.lastSeenAt).toLocaleTimeString()
                  : '-'}
              </Typography>
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        {(temp || hum) && (
          <Stack direction='row' spacing={1} sx={{ mb: 2 }}>
            {temp && <ChannelChip c={temp} />}
            {hum && <ChannelChip c={hum} />}
          </Stack>
        )}
        <Grid container spacing={1}>
          {s.channels
            .filter((c) => c.key !== 'temperature' && c.key !== 'humidity')
            .map((c) => (
              <Grid key={c.key}>
                <ChannelChip c={c} />
              </Grid>
            ))}
        </Grid>
        {s.thresholds && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant='body2'
              color='text.secondary'
              fontWeight={700}
              display='block'
              gutterBottom
            >
              Thresholds
            </Typography>
            <Stack direction='row' spacing={1} flexWrap='wrap'>
              {Object.entries(s.thresholds).map(([k, v]) => (
                <Chip
                  key={k}
                  size='medium'
                  variant='outlined'
                  label={`${k}: ${v.low ?? '–'}/${v.high ?? '–'}`}
                  sx={{ fontSize: '0.85rem' }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

// ===== Mock Sensors =====
const sensorsMock: SensorLike[] = [
  {
    id: 'sensor_tempHum_01',
    kind: 'sensor',
    type: 'environment',
    subtype: 'temperature_humidity',
    model: 'DHT22',
    name: 'Office Temp/Humidity',
    status: 'online',
    lastSeenAt: new Date().toISOString(),
    power: { source: 'battery', batteryLevel: 0.78 },
    channels: [
      {
        key: 'temperature',
        kind: 'number',
        unit: 'Cel',
        value: 34.2,
        ts: new Date().toISOString(),
        range: { min: -40, max: 85 },
        precision: 0.1,
        quality: 'good',
      },
      {
        key: 'humidity',
        kind: 'number',
        unit: '%RH',
        value: 58,
        ts: new Date().toISOString(),
        range: { min: 0, max: 100 },
        precision: 0.1,
        quality: 'good',
      },
    ],
  },
  {
    id: 'sensor_motion_01',
    kind: 'sensor',
    type: 'presence',
    subtype: 'pir',
    model: 'HC-SR501',
    name: 'Hallway PIR',
    status: 'online',
    lastSeenAt: new Date().toISOString(),
    power: { source: 'mains' },
    channels: [
      {
        key: 'motion',
        kind: 'boolean',
        value: true,
        ts: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'sensor_air_01',
    kind: 'sensor',
    type: 'air_quality',
    subtype: 'pm_co2_tvoc',
    model: 'AeroSense X',
    name: 'Meeting Room AQ',
    status: 'online',
    lastSeenAt: new Date().toISOString(),
    power: { source: 'mains' },
    channels: [
      {
        key: 'pm2_5',
        kind: 'number',
        unit: 'ug/m3',
        value: 12,
        ts: new Date().toISOString(),
      },
      {
        key: 'pm10',
        kind: 'number',
        unit: 'ug/m3',
        value: 21,
        ts: new Date().toISOString(),
      },
      {
        key: 'co2',
        kind: 'number',
        unit: 'ppm',
        value: 720,
        ts: new Date().toISOString(),
      },
      {
        key: 'tvoc',
        kind: 'number',
        unit: 'ppb',
        value: 180,
        ts: new Date().toISOString(),
      },
    ],
  },
]

const Toolbar: React.FC<{
  filter: string
  setFilter: (_v: string) => void
}> = ({ filter, setFilter }) => (
  <Stack direction='row' spacing={1} alignItems='center'>
    <TextField
      size='medium'
      placeholder='Search sensor...'
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      InputProps={{
        startAdornment: (
          <SearchRoundedIcon
            fontSize='medium'
            sx={{ mr: 1, color: 'text.disabled' }}
          />
        ),
      }}
    />
  </Stack>
)

export function SampleInfo2() {
  const [filter, setFilter] = useState('')
  const filtered = useMemo(() => {
    if (!filter.trim()) return sensorsMock
    const q = filter.toLowerCase()

    return sensorsMock.filter((s) =>
      [s.name, s.type, s.subtype, s.model].join(' ').toLowerCase().includes(q),
    )
  }, [filter])

  return (
    <Box sx={{ p: { xs: 3, md: 4 } }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 3 }}
      >
        <Typography variant='h4' fontWeight={700}>
          Connected Sensors
        </Typography>
        <Toolbar filter={filter} setFilter={setFilter} />
      </Stack>

      <Grid container spacing={3}>
        {filtered.map((s) => (
          <Grid size={{ xs: 12, md: 6 }} key={s.id}>
            <SensorCard s={s} />
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid size={12}>
            <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 10 }}>
              No matching sensors
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
