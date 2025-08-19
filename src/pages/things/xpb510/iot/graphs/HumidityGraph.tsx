import { format, subMinutes } from 'date-fns'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import { ClimateHistory } from 'types/xpb510/iot/iot'
import { Card, CardContent } from '@mui/material'

type HumidityGraphProps = {
  data: ClimateHistory[] | null
}

type HumidityLog = {
  humidity: number | 'N/A'
  timestamp: Date
}

export const HumidityGraph = ({ data }: HumidityGraphProps) => {
  const [humidityLogs, setHumidityLogs] = useState<HumidityLog[]>([])

  useEffect(() => {
    if (!data || data.length === 0) return

    const truncatedData = data.map((item) => ({
      humidity: item.humidity,
      timestamp: new Date(item.timestamp),
    }))

    const sorted = [...truncatedData].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    )

    const logMap = new Map<number, HumidityLog>()

    sorted.forEach((log) => {
      const time = new Date(log.timestamp)
      time.setSeconds(0)
      time.setMilliseconds(0)
      logMap.set(time.getTime(), { ...log, timestamp: time })
    })

    const filledLogs: HumidityLog[] = []

    for (let i = 0; i < 30; i++) {
      const time = subMinutes(sorted[sorted.length - 1].timestamp, 29 - i)
      time.setSeconds(0)
      time.setMilliseconds(0)
      const existing = logMap.get(time.getTime())

      filledLogs.push(existing ?? { humidity: 'N/A', timestamp: time })
    }

    setHumidityLogs(filledLogs)
  }, [data])

  const option = {
    color: ['rgb(70, 130, 180)'],
    animation: true,
    title: { text: 'Humidity Graph' },
    tooltip: {
      trigger: 'axis',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any[]) => {
        const time = params[0]?.axisValue
        const humidity = params[0]?.data

        return `Time: ${time}<br/>Humidity: ${humidity}%`
      },
    },
    grid: {
      width: '90%',
      left: '5%',
      right: '5%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: { show: false },
      data: humidityLogs.map((item) => format(item.timestamp, 'hh:mm a')),
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (val: number) => `${val.toFixed(1)}%`,
      },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: 'Humidity',
        type: 'line',
        data: humidityLogs.map((item) =>
          item.humidity === 'N/A'
            ? null
            : Number(item.humidity.toFixed?.(1) ?? item.humidity),
        ),
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(135, 206, 250)' },
            { offset: 1, color: 'rgb(70, 130, 180)' },
          ]),
        },
      },
    ],
  }

  return (
    <Card>
      <CardContent>
        <ReactECharts option={option} />
      </CardContent>
    </Card>
  )
}
