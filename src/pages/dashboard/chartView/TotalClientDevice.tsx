import { useMemo, useEffect, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Card, CardHeader, Divider, CardContent } from '@mui/material'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { DashboardEvent } from 'enums'
import { RefreshButton } from 'components/RefreshButton'

echarts.use([
  GridComponent,
  PieChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
])

interface TotalClientDeviceProps {
  data: object
  wsUrl: string
}

interface rawDataProps {
  fiveGHz1Numbers: number
  fiveGHz2Numbers: number
  twoPointFourGHzNumbers: number
}

export const TotalClientDevice = ({ data, wsUrl }: TotalClientDeviceProps) => {
  const renderRef = useRef<number>()
  const [rawData, setRawData] = useState<rawDataProps | null>(null)
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const wsRequestEvent = useMemo(() => {
    return {
      event: DashboardEvent.ClientsRadioFrequencyRatio,
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

  const TotalDeviceData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      top: '30px',
      left: 'left',
      data: ['2.4GHz', '5GHz¹', '5GHz²'],
    },
    series: [
      {
        name: 'Total Clients',
        type: 'pie',
        radius: '75%',
        center: ['50%', '60%'],
        label: {
          show: !1,
        },
        data: [
          {
            value: rawData !== null ? rawData.twoPointFourGHzNumbers : 0,
            name: '2.4GHz',
            itemStyle: {
              color: '#006bb3',
            },
          },
          {
            value: rawData !== null ? rawData.fiveGHz1Numbers : 0,
            name: '5GHz¹',
            itemStyle: {
              color: '#00b300',
            },
          },
          {
            value: rawData !== null ? rawData.fiveGHz2Numbers : 0,
            name: '5GHz²',
            itemStyle: {
              color: '#F6821F',
            },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  return (
    <Card sx={{ height: '450px' }}>
      <CardHeader
        title='Client (Total)'
        action={<RefreshButton onClick={() => handleRefresh()} />}
      />
      <Divider />
      <CardContent>
        <ReactEChartsCore echarts={echarts} option={TotalDeviceData} />
      </CardContent>
    </Card>
  )
}
