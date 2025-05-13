import { useState, useEffect, useRef, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Stack,
} from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { DashboardEventType } from 'enums'
import { RefreshButton } from 'components/RefreshButton'

interface QuickLookProps {
  data: object
  wsUrl: string
  spacing: number
}

interface rawDataProps {
  ap: {
    mac: string | null
    txBytes: string
    rxBytes: string
  }
  client: {
    mac: string | null
    txBytes: string
    rxBytes: string
  }
  type: string
}

export const QuickLook = ({ data, wsUrl, spacing }: QuickLookProps) => {
  const renderRef = useRef<number>()
  const [rawData, setRawData] = useState<rawDataProps | null>(null)
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const wsRequestEvent = useMemo(() => {
    return {
      event: DashboardEventType.MostActive,
      data,
    }
  }, [data])

  const { sendJsonMessage } = useWebSocket(wsUrl, {
    onOpen: () => {},
    onMessage: async (event) => {
      const json = JSON.parse(event.data)
      try {
        if (json?.type === wsRequestEvent.event) {
          setRawData(json)
        }
      } catch (err) {
        console.error(err)
      }
    },
    onError: (event) => {
      console.error('error:', event)
    },
    onClose: () => {},
    share: true,
  })

  // send request every 5 seconds
  useEffect(() => {
    renderRef.current = window.setInterval(
      () => {
        sendJsonMessage(wsRequestEvent)
      },
      import.meta.env.VITE_DASHBOARD_DATA_REFRESH_RATE_SECONDS * 1000,
    )

    return () => {
      clearInterval(renderRef.current)
    }
  }, [sendJsonMessage, wsRequestEvent, refresh])

  const apMac = rawData !== null ? rawData['ap'].mac : ''
  const apTxBytes = rawData !== null ? rawData['ap'].txBytes : 0
  const apRxBytes = rawData !== null ? rawData['ap'].rxBytes : 0
  const clientMac = rawData !== null ? rawData['client'].mac : ''
  const clientTxBytes = rawData !== null ? rawData['client'].txBytes : 0
  const clientRxBytes = rawData !== null ? rawData['client'].rxBytes : 0

  return (
    <Card sx={{ height: '450px' }}>
      <CardHeader
        title='Quick Look'
        action={<RefreshButton onClick={() => handleRefresh()} />}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={spacing}>
          <Grid size={{ xs: 12 }}>
            <Grid>
              <Typography>Most Active AP</Typography>

              <Stack
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                padding={2}
              >
                <Grid size={{ xs: 12, md: 5 }}>{apMac}</Grid>
                <Grid
                  size={{ xs: 12, md: 7 }}
                  display='flex'
                  justifyContent='space-evenly'
                >
                  <Grid display='flex' alignItems='center'>
                    <KeyboardDoubleArrowUpIcon htmlColor='red' />
                    {apTxBytes}
                  </Grid>
                  <Grid display='flex' alignItems='center'>
                    <KeyboardDoubleArrowDownIcon htmlColor='green' />
                    {apRxBytes}
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            <Divider />

            <Grid mt={2}>
              <Typography>Most Active Client</Typography>

              <Stack
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                padding={2}
              >
                <Grid size={{ xs: 12, md: 5 }}>{clientMac}</Grid>
                <Grid
                  size={{ xs: 12, md: 7 }}
                  display='flex'
                  justifyContent='space-evenly'
                >
                  <Grid display='flex' alignItems='center'>
                    <KeyboardDoubleArrowUpIcon htmlColor='red' />
                    {clientTxBytes}
                  </Grid>
                  <Grid display='flex' alignItems='center'>
                    <KeyboardDoubleArrowDownIcon htmlColor='green' />
                    {clientRxBytes}
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            <Divider />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
