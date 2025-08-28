import React, { useEffect } from 'react'
import {
  Box,
  Chip,
  Container,
  Typography,
  Grid,
  LinearProgress,
} from '@mui/material'
import {
  Router as RouterIcon,
  AccessTime,
  CheckCircle,
  Cancel,
  Computer,
  ShowChart,
} from '@mui/icons-material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { resetOverviewState } from 'reducers/xpb510/status/overview'
import { InfoCard } from './components/InfoCard'
import { WanConnectionCard } from './components/WanConnectionCard'
import { ConnectionStatsCard } from './components/ConnectionStatsCard'
import { MemoryUsageCard } from './components/MemoryUsageCard'
import { NetworkInterfacesCard } from './components/NetworkInterfacesCard'

export const Overview: React.FC = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.status.overview,
  )

  const result = data?.result ?? {}

  const formatUptime = (seconds: number) => {
    const secondsInMinute = 60
    const secondsInHour = secondsInMinute * 60 // 60 × 60
    const secondsInDay = secondsInHour * 24 // 60 × 60 × 24

    const days = Math.floor(seconds / secondsInDay)
    const hours = Math.floor((seconds % secondsInDay) / secondsInHour)
    const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute)

    return `${days}d ${hours}h ${minutes}m`
  }

  const getLoadAverage = () =>
    Math.min(((result?.loadavg?.[0] ?? 0) / 65536) * 100, 100)

  const infoCards = data
    ? [
        {
          title: 'System Uptime',
          value: formatUptime(result.uptime),
          subtext: 'Since last reboot',
          icon: <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />,
        },
        {
          title: 'Firmware Version',
          value: result.fwver.split(',')[0],
          subtext: `${result.fwver.split(',')[1]?.trim() || ''} ${
            result.fwver.split(',')[2]?.trim() || ''
          }`,
          icon: <Computer sx={{ color: 'text.secondary', fontSize: 20 }} />,
        },
        {
          title: 'Local Time',
          value: result.localtime.split(' ')[3],
          subtext: result.localtime.split(' ').slice(0, 3).join(' '),
          icon: <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />,
        },
        {
          title: 'Load Average',
          value: `${getLoadAverage().toFixed(1)}%`,
          subtext: 'System load',
          icon: <ShowChart sx={{ color: 'text.secondary', fontSize: 20 }} />,
        },
      ]
    : []

  useEffect(() => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_OVERVIEW_GET_STATUS_OVERVIEW_PAGE,
    )

    return () => {
      dispatch(resetOverviewState())
    }
  }, [dispatch, sendWsGetMessage])

  // Helper wrapper to force children to fill the grid cell height
  const CellFill: React.FC<React.PropsWithChildren> = ({ children }) => (
    <Box sx={{ height: '100%', '& > *': { height: '100%' } }}>{children}</Box>
  )

  return (
    <>
      {!data ? (
        <LinearProgress />
      ) : (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
          <Container maxWidth='xl'>
            {/* Unified Grid2 with matched heights */}
            <Grid
              container
              spacing={3}
              sx={{
                alignItems: 'stretch', // make items in the same row equal height
              }}
            >
              {/* Row 1: 4 info cards */}
              {infoCards.map((card, idx) => (
                <Grid key={idx} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <CellFill>
                    <InfoCard
                      title={card.title}
                      value={card.value}
                      subtext={card.subtext}
                      icon={card.icon}
                    />
                  </CellFill>
                </Grid>
              ))}

              {/* Row 2: 2 wide cards */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <CellFill>
                  <WanConnectionCard data={result} />
                </CellFill>
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <CellFill>
                  <ConnectionStatsCard data={result} />
                </CellFill>
              </Grid>

              {/* Row 3: 2 wide cards */}
              <Grid size={{ xs: 12, lg: 6 }}>
                <CellFill>
                  <MemoryUsageCard data={result} />
                </CellFill>
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <CellFill>
                  <NetworkInterfacesCard data={result} />
                </CellFill>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  )
}
