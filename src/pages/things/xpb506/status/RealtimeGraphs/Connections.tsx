import { useEffect, useRef, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { MRT_ColumnDef } from 'material-react-table'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { connectionsTable } from 'types/reducers'

export const Connections = () => {
  const intervalRef = useRef<number | null>(null)
  const lastStampRef = useRef(0)
  const { sendWsGetMessage } = useSendWsMessage()
  const [isStart, setIsStart] = useState(false)
  const { result } = useSelector(
    (state: DefaultRootStateProps) => state.status.realtimeGraph.connections,
  )
  // const statistics = result?.statistics || []
  const connections = result?.connections || []

  const initialArr = Array(240).fill(0)
  const [udp, setUdp] = useState<number[]>(initialArr)
  const [tcp, setTcp] = useState<number[]>(initialArr)
  const [other, setOther] = useState<number[]>(initialArr)

  const getLast = (nums: number[]) => nums[nums.length - 1]
  const getPeak = (nums: number[]) => Math.max(...nums)

  const tableList = [
    { label: 'UDP:', average: getLast(udp), peak: getPeak(udp) },
    { label: 'TCP:', average: getLast(tcp), peak: getPeak(tcp) },
    { label: 'Other:', average: getLast(other), peak: getPeak(other) },
  ]

  const option = {
    color: [
      'rgba(76,76,255, 0.6)',
      'rgba(15,135,15, 0.6)',
      'rgba(192,29,46, 0.6)',
    ],
    animation: false,
    title: { text: 'Active Connections' },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['UDP', 'TCP', 'Other'],
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
          formatter: (_value: number, index: number) => {
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
          formatter: (value: number) => value,
        },
      },
    ],
    series: [
      {
        name: 'UDP',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: udp,
      },
      {
        name: 'TCP',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: tcp,
      },
      {
        name: 'Other',
        type: 'line',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: other,
      },
    ],
  }

  const columns: MRT_ColumnDef<connectionsTable>[] = [
    {
      header: 'Network',
      accessorFn: (row) => row.layer3,
      size: 150,
    },
    {
      header: 'Protocol',
      accessorFn: (row) => row.layer4,
      size: 150,
    },
    {
      header: 'Source',
      accessorFn: (row) => `${row.src}:${row.sport || 0}`,
      size: 150,
    },
    {
      header: 'Destination',
      accessorFn: (row) => row.dst,
      size: 150,
    },
    {
      header: 'Transfer',
      accessorFn: (row) => (
        <div>{`${row.bytes} KB (${row.packets} Pkts.)`}</div>
      ),
      size: 150,
    },
  ]

  useEffect(() => {
    const statistics = result?.statistics || []
    if (!statistics.length || statistics.length === 1) return
    if (!isStart) {
      setIsStart(true)
      setUdp((prev) => [...prev, ...statistics.map((item) => item[1])])
      setTcp((prev) => [...prev, ...statistics.map((item) => item[2])])
      setOther((prev) => [...prev, ...statistics.map((item) => item[3])])
      lastStampRef.current = statistics[statistics.length - 1][0]
    } else {
      const newQueue: number[][] = statistics.filter(
        (item) => item[0] > lastStampRef.current,
      )
      setUdp((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[1]),
      ])
      setTcp((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[2]),
      ])
      setOther((prev) => [
        ...prev.slice(newQueue.length),
        ...newQueue.map((item) => item[3]),
      ])
      lastStampRef.current = statistics[statistics.length - 1][0]
    }
  }, [isStart, result])

  useEffect(() => {
    const sendMessage = () => {
      sendWsGetMessage(SERVER_ACTIONS.REAL_TIME_GRAPHS_CONNECTIONS)
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
      <StyledMuiReactTable
        title='Connections'
        rows={connections}
        columns={columns}
      />
    </>
  )
}
