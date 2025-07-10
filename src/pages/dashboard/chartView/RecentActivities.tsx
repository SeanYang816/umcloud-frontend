import { useState, useEffect, useRef, useMemo } from 'react'
import useWebSocket from 'react-use-websocket'
import { Card, CardHeader, Divider, CardContent, Grid } from '@mui/material'
import * as echarts from 'echarts/core'
import ReactECharts from 'echarts-for-react'
import { LinesChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { MainCard } from 'components/cards/MainCard'
import { dateValueFormatterSecondsTable } from 'utils/utility'
import { DashboardEvent } from 'enums'
import { RefreshButton } from 'components/RefreshButton'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LinesChart,
  CanvasRenderer,
])

interface RecentActivitiesProps {
  data: object
  wsUrl: string
  spacing: number
}

interface rawDataProps {
  clientData: string[]
  clientTime: string[]
  trafficData: string[]
  trafficTime: string[]
}

export const RecentActivities = ({
  data,
  wsUrl,
  spacing,
}: RecentActivitiesProps) => {
  const renderRef = useRef<number>(0)
  const [rawData, setRawData] = useState<rawDataProps | null>(null)
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const wsRequestEvent = useMemo(() => {
    return {
      event: DashboardEvent.RecentActivity,
      data,
    }
  }, [data])

  const { sendJsonMessage } = useWebSocket(wsUrl, {
    onOpen: () => {},
    onMessage: async (event) => {
      const json = JSON.parse(event.data)
      try {
        if (json?.type === wsRequestEvent.event) {
          setRawData((rawData) => {
            const newClientData = json['clients'].number.toString()
            const newClientTime = dateValueFormatterSecondsTable(
              json['clients'].timestamp,
            )
            const newTrafficData = json['traffic'].volume
            const newTrafficTime = dateValueFormatterSecondsTable(
              json['traffic'].timestamp,
            )

            // insert the newest data
            const newData =
              rawData !== null
                ? {
                    clientData: [...rawData.clientData, newClientData],
                    clientTime: [...rawData.clientTime, newClientTime],
                    trafficData: [...rawData.trafficData, newTrafficData],
                    trafficTime: [...rawData.trafficTime, newTrafficTime],
                  }
                : {
                    clientData: [newClientData],
                    clientTime: [newClientTime],
                    trafficData: [newTrafficData],
                    trafficTime: [newTrafficTime],
                  }

            // delete the oldest data when data's length > 5
            if (newData.clientData.length > 5) {
              newData.clientData?.shift()
              newData.clientTime?.shift()
              newData.trafficData?.shift()
              newData.trafficTime?.shift()
            }

            return newData
          })
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
        sendJsonMessage({ event: 'pong' })
      },
      import.meta.env.VITE_DASHBOARD_DATA_REFRESH_RATE_SECONDS * 1000,
    )

    return () => {
      clearInterval(renderRef.current)
    }
  }, [sendJsonMessage, wsRequestEvent, refresh])

  const lineClientOption = {
    title: {
      text: 'Clients (Total)',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: rawData !== null ? rawData.clientTime : [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        max: 20,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        type: 'line',
        data: rawData !== null ? rawData.clientData : [],
      },
    ],
  }

  const lineTrafficOption = {
    title: {
      text: 'Traffic (MBytes)',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      show: false,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom: 30,
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: rawData !== null ? rawData.trafficTime : [],
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        max: 800,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        type: 'line',
        data: rawData !== null ? rawData.trafficData : [],
        color: '#ff8302',
        areaStyle: {},
      },
    ],
  }

  return (
    <Card>
      <CardHeader
        title='Recent Activities'
        action={<RefreshButton onClick={() => handleRefresh()} />}
      />
      <Divider />
      <CardContent>
        <MainCard>
          <Grid container spacing={spacing}>
            <Grid size={{ xs: 12 }}>
              <ReactECharts option={lineClientOption} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <ReactECharts option={lineTrafficOption} />
            </Grid>
          </Grid>
        </MainCard>
      </CardContent>
    </Card>
  )
}
