// components/RefreshControls.tsx
import { FC } from 'react'
import {
  Stack,
  IconButton,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Tooltip,
  CircularProgress,
  Typography,
} from '@mui/material'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { useAutoRefresh, AUTO_REFRESH_DEFAULTS } from 'hooks/useAutoRefresh'

// ⬇️ helper: 59s -> "59s", 60_000 -> "1m", 90_000 -> "1.5m"
const formatInterval = (ms: number) => {
  const sec = Math.round(ms / 1000)
  if (sec < 60) return `${sec}s`
  const min = sec / 60

  return Number.isInteger(min) ? `${min}m` : `${min.toFixed(1)}m`
}

export type RefreshControlsProps = {
  fetcher: () => void | Promise<void>
  doneSignal?: unknown
  auto?: boolean
  intervalMs?: number
  minIntervalMs?: number
  pauseOnHidden?: boolean
  initialFetch?: boolean
  intervals?: number[]
  hideAutoToggle?: boolean
  hideIntervalSelect?: boolean
  hideManualButton?: boolean
  hideLastUpdated?: boolean
  autoLabel?: string
  lastUpdatedLabel?: string
  disabled?: boolean
  size?: 'small' | 'medium'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any
  className?: string
}

export const RefreshControls: FC<RefreshControlsProps> = ({
  fetcher,
  doneSignal,
  // 🔒 Keep defaults in sync with the hook
  auto = AUTO_REFRESH_DEFAULTS.auto,
  intervalMs = AUTO_REFRESH_DEFAULTS.intervalMs,
  minIntervalMs = AUTO_REFRESH_DEFAULTS.minIntervalMs,
  pauseOnHidden = AUTO_REFRESH_DEFAULTS.pauseOnHidden,
  initialFetch = AUTO_REFRESH_DEFAULTS.initialFetch,

  intervals = [60_000, 120_000, 300_000],
  hideAutoToggle = false,
  hideIntervalSelect = false,
  hideManualButton = false,
  hideLastUpdated = false,
  autoLabel = 'Auto refresh',
  lastUpdatedLabel = 'Last updated',
  disabled = false,
  size = 'small',
  sx,
  className,
}) => {
  const {
    isAutoRefresh,
    setIsAutoRefresh,
    intervalMs: currentInterval,
    setIntervalMs,
    isRefreshing,
    lastRefreshed,
    refresh,
  } = useAutoRefresh({
    fetcher,
    doneSignal,
    auto,
    intervalMs,
    minIntervalMs,
    pauseOnHidden,
    initialFetch,
  })

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1.5}
      sx={sx}
      className={className}
    >
      {!hideAutoToggle && (
        <FormControlLabel
          control={
            <Switch
              size={size}
              checked={isAutoRefresh}
              onChange={(e) => setIsAutoRefresh(e.target.checked)}
              disabled={disabled}
            />
          }
          label={autoLabel}
        />
      )}

      {!hideIntervalSelect && (
        <Select
          size={size}
          value={currentInterval}
          onChange={(e) => setIntervalMs(Number(e.target.value))}
          disabled={disabled || !isAutoRefresh}
          sx={{ minWidth: 120 }}
          // Ensures the closed select shows "Every 1m" etc.
          renderValue={(value) => `Every ${formatInterval(Number(value))}`}
        >
          {intervals.map((ms) => (
            <MenuItem key={ms} value={ms}>
              Every {formatInterval(ms)}
            </MenuItem>
          ))}
        </Select>
      )}

      {!hideManualButton && (
        <Tooltip title='Refresh now'>
          <span>
            <IconButton
              size={size}
              onClick={refresh}
              disabled={disabled || isRefreshing}
              aria-label='refresh'
            >
              {isRefreshing ? (
                <CircularProgress size={size === 'small' ? 18 : 20} />
              ) : (
                <RefreshRoundedIcon
                  fontSize={size === 'small' ? 'small' : 'medium'}
                />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}

      {!hideLastUpdated && (
        <Typography variant='caption' color='text.secondary'>
          {lastUpdatedLabel}:{' '}
          {lastRefreshed ? new Date(lastRefreshed).toLocaleTimeString() : '—'}
        </Typography>
      )}
    </Stack>
  )
}
