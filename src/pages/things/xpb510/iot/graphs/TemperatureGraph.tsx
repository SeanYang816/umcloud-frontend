import { Card, CardContent, useTheme } from '@mui/material'
import { format } from 'date-fns'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { ClimateHistory } from 'types/xpb510/iot/iot'

type TemperatureGraphProps = {
  data: ClimateHistory[] | null
}

export const TemperatureGraph = ({ data }: TemperatureGraphProps) => {
  const theme = useTheme()

  const logs = data ?? []

  const minTemperature =
    logs.length > 0 ? Math.min(...logs.map((log) => log.temperature)) : 0

  const maxTemperature =
    logs.length > 0 ? Math.max(...logs.map((log) => log.temperature)) : 100

  const getMinYaxis = (val: number) => (val >= 0 ? 0 : val * 1.5)

  const getMaxYaxis = (val: number) => (val <= 50 ? val * 1.5 : 100)
  const getYaxisInterval = (max: number, min: number) =>
    (Math.abs(max) + Math.abs(min)) / 4

  const option = {
    color: [theme.palette.error.light],
    animation: true,
    title: { text: 'Temperature Graph' },
    tooltip: {
      trigger: 'axis',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any[]) => {
        const time = params[0]?.axisValue
        const temp = params[0]?.data?.toFixed(1)

        return `Time: ${time}<br/>Temperature: ${temp}°C`
      },
    },
    grid: {
      width: '90%',
      left: '5%',
      right: '5%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: { show: false },
        data: logs.map((item) => format(item.timestamp, 'hh:mm a')),
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (val: number) => `${val.toFixed(1)}°C`,
        },
        min: getMinYaxis(minTemperature),
        max: getMaxYaxis(maxTemperature),
        interval: getYaxisInterval(
          getMaxYaxis(maxTemperature),
          Math.abs(getMinYaxis(minTemperature)),
        ),
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        data: logs.map((item) => item.temperature),
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(255, 158, 68)' },
            { offset: 1, color: 'rgb(255, 70, 131)' },
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
