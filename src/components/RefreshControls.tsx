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
  // 🔒 Defaults pulled from the hook's exported constants
  auto = AUTO_REFRESH_DEFAULTS.auto,
  intervalMs = AUTO_REFRESH_DEFAULTS.intervalMs,
  minIntervalMs = AUTO_REFRESH_DEFAULTS.minIntervalMs,
  pauseOnHidden = AUTO_REFRESH_DEFAULTS.pauseOnHidden,
  initialFetch = AUTO_REFRESH_DEFAULTS.initialFetch,

  intervals = [5_000, 10_000, 30_000, 60_000],
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
          sx={{ minWidth: 110 }}
        >
          {intervals.map((ms) => (
            <MenuItem key={ms} value={ms}>
              Every {Math.round(ms / 1000)}s
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
