import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { clearRealtimeGraphsTrafficGetDeviceStatus } from 'reducers/bgw5105/status'

type TrafficTabProps = {
  propertyKey: string
  propertyValue: string
}

export const TrafficTab = ({ propertyKey, propertyValue }: TrafficTabProps) => {
  const intervalRef = useRef<number | null>(null)
  const { sendWsGetMessage } = useSendWsMessage()
  const [isStart, setIsStart] = useState(false)
  const data = useSelector(
    (state: RootStateProps) =>
      state.bgw5105.status.realtimeGraph.trafficGetDeviceStatus,
  )
  const result = useMemo(() => data?.result, [data?.result])
  const requestId = data?.requestId
  const dispatch = useDispatch()

  const lastStampRef = useRef(0)

  const initialArr = Array(240).fill(0)
  const [inbound, setInbound] = useState<number[]>(initialArr)
  const [outbound, setOutbound] = useState<number[]>(initialArr)

  const mbitsLabel = 'MBits/s'
  const toMBits = (num: number) => (num * 8) / 1000 / 1000
  const getLast = (nums: number[]) => nums[nums.length - 1]?.toFixed(2) || 0
  const getPeak = (nums: number[]) => Math.max(...nums).toFixed(2)

  const tableList = [
    {
      label: 'Inbound:',
      average:
        result?.length === 1
          ? 0
          : getLast(result.map((item) => toMBits(item[1]))),
      peak: getPeak(inbound),
    },
    {
      label: 'Outbound:',
      average:
        result?.length === 1
          ? 0
          : getLast(result.map((item) => toMBits(item[3]))),
      peak: getPeak(outbound),
    },
  ]

  const option = {
    color: ['rgba(0, 0, 255, 0.6)', 'rgba(51, 147, 50, 0.6)'],
    animation: false,
    title: { text: propertyValue },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Inbound', 'Outbound'],
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
          formatter: (value: number) => `${value}${mbitsLabel}`,
        },
      },
    ],
    series: [
      {
        name: 'Inbound',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: inbound,
      },
      {
        name: 'Outbound',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: outbound,
      },
    ],
  }

  useEffect(() => {
    // tab 切換時，要重置圖表資料
    if (!result.length || result.length === 1) {
      setInbound(initialArr)
      setOutbound(initialArr)
      lastStampRef.current = 0

      return
    }

    // tab 切換時，若回傳的資料不是當前頁面的資料，要重置 redux 和圖表資料
    if (!requestId.startsWith(propertyKey)) {
      dispatch(clearRealtimeGraphsTrafficGetDeviceStatus())
      setInbound(initialArr)
      setOutbound(initialArr)
      lastStampRef.current = 0

      return
    }

    // 第一次開始
    if (!isStart) {
      setIsStart(true)
      setInbound((prev) => [...prev, ...result.map((item) => toMBits(item[1]))])
      setOutbound((prev) => [
        ...prev,
        ...result.map((item) => toMBits(item[3])),
      ])
      lastStampRef.current = result[result.length - 1][0]
    } else {
      // 除了第一次之外的資料
      const newQueue = result.filter((item) => item[0] > lastStampRef.current)
      setInbound((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => toMBits(item[1])),
      ])
      setOutbound((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => toMBits(item[3])),
      ])
      lastStampRef.current = result[result.length - 1][0]
    }
  }, [isStart, result, requestId]) // 沒有把 initialArr 加進來，因為會導致無限迴圈

  useEffect(() => {
    dispatch(clearRealtimeGraphsTrafficGetDeviceStatus())
    const sendMessage = () => {
      sendWsGetMessage(
        SERVER_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE_STATUS,
        propertyKey,
        propertyKey,
      )
    }
    intervalRef.current = setInterval(sendMessage, 3000) as unknown as number

    return () => {
      clearInterval(intervalRef.current as unknown as number)
    }
  }, [dispatch, propertyKey, sendWsGetMessage])

  return (
    <React.Fragment key={propertyKey}>
      <ReactECharts option={option} />
      <Box textAlign='right' sx={{ paddingRight: '24px' }}>
        (5 minute window, 3 second interval)
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableBody sx={{ border: '1px #eeeeee solid' }}>
              {tableList.map(({ label, average, peak }, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'right' }}>{label}</TableCell>
                  <TableCell>
                    {average} {mbitsLabel}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>Peak:</TableCell>
                  <TableCell>
                    {peak} {mbitsLabel}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
