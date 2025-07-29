import { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'

export const Load = () => {
  const intervalRef = useRef<number | null>(null)
  const { sendWsGetMessage } = useSendWsMessage()
  const [isStart, setIsStart] = useState(false)
  const { result } = useSelector(
    (state: DefaultRootStateProps) => state.status.realtimeGraph.load,
  )
  const lastStampRef = useRef(0)

  const initialArr = Array(240).fill(0)
  const [queue1, setQueue1] = useState<number[]>(initialArr)
  const [queue5, setQueue5] = useState<number[]>(initialArr)
  const [queue15, setQueue15] = useState<number[]>(initialArr)

  const getLast = (nums: number[]) => nums[nums.length - 1] / 100
  const getPeak = (nums: number[]) => (Math.max(...nums) / 100).toFixed(2)

  const tableList = [
    {
      label: '1 Minute Load:',
      average: getLast(queue1),
      peak: getPeak(queue1),
    },
    {
      label: '5 Minutes Load:',
      average: getLast(queue5),
      peak: getPeak(queue5),
    },
    {
      label: '15 Minutes Load:',
      average: getLast(queue15),
      peak: getPeak(queue15),
    },
  ]

  const option = {
    color: [
      'rgba(255, 30, 30, 0.6)',
      'rgba(255, 148, 77, 0.6)',
      'rgba(255, 195, 77, 0.6)',
    ],
    animation: false,
    title: { text: 'Realtime Load' },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['1min', '5min', '15min'],
    },
    toolbox: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          type: 'time',
          interval: 59,
          formatter: (_value: never, index: number) => {
            switch (`${index / 60}`) {
              case '0':
                return '5min'
              case '1':
                return '4min'
              case '2':
                return '3min'
              case '3':
                return '2min'
              case '4':
                return '1min'
            }
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `${value / 100}`,
        },
      },
    ],
    series: [
      {
        name: '1min',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: queue1,
      },
      {
        name: '5min',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: queue5,
      },
      {
        name: '15min',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: queue15,
      },
    ],
  }

  useEffect(() => {
    if (!result.length || result.length === 1) return
    if (!isStart) {
      setIsStart(true)
      setQueue1((prev) => [...prev, ...result.map((item) => item[1])])
      setQueue5((prev) => [...prev, ...result.map((item) => item[2])])
      setQueue15((prev) => [...prev, ...result.map((item) => item[3])])
      lastStampRef.current = result[result.length - 1][0]
    } else {
      const newQueue = result.filter((item) => item[0] > lastStampRef.current)
      setQueue1((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[1]),
      ])
      setQueue5((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[2]),
      ])
      setQueue15((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[3]),
      ])
      lastStampRef.current = result[result.length - 1][0]
    }
  }, [isStart, result])

  useEffect(() => {
    const sendMessage = () => {
      sendWsGetMessage(SERVER_ACTIONS.REAL_TIME_GRAPHS_LOAD)
    }
    intervalRef.current = setInterval(sendMessage, 3000) as unknown as number

    return () => {
      clearInterval(intervalRef.current as unknown as number)
    }
  }, [sendWsGetMessage])

  return (
    <>
      <ReactECharts option={option} />
      <Box textAlign='right' sx={{ paddingRight: '24px' }}>
        (5 minute window, 3 second interval)
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableBody sx={{ border: '1px #eeeeee solid' }}>
              {tableList.map(({ label, average, peak }, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:nth-of-type(even)': {
                      backgroundColor: '#F9F9F9',
                    },
                  }}
                >
                  <TableCell sx={{ textAlign: 'right' }}>{label}</TableCell>
                  <TableCell>{average}</TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>Peak:</TableCell>
                  <TableCell>{peak}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
