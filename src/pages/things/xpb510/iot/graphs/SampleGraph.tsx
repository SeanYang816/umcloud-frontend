import { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Typography } from '@mui/material'

type DataPoint = {
  timestamp: string | number | Date
  temperature: number
  humidity: number
}

type Variant = 'line' | 'bar' | 'scatter'

type Props = {
  data: DataPoint[]
  height?: number | string
  width?: number | string
}

const formatHHmm = (ts: string | number | Date) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

// 👇 paste this near your App or in a utils file
function generateMockData(count = 30): DataPoint[] {
  const now = Date.now()
  let temp = 24
  let hum = 55

  return Array.from({ length: count }, (_, i) => {
    // each point 1 minute apart
    const timestamp = now - (count - i) * 60_000

    // small random variation
    temp += (Math.random() - 0.5) * 0.5
    hum += (Math.random() - 0.5) * 1.0

    return {
      timestamp,
      temperature: Math.round(temp * 10) / 10, // 1 decimal place
      humidity: Math.round(hum),
    }
  })
}

export const SampleGraph = ({ height = 600 }: Props) => {
  const data = generateMockData()
  const [variant, setVariant] = useState<Variant>('line')
  const [smooth, setSmooth] = useState(true)
  const [showSymbols, setShowSymbols] = useState(false)

  // x-axis labels (HH:mm) + series data
  const timestamps = useMemo(
    () => data.map((d) => formatHHmm(d.timestamp)),
    [data],
  )
  const temperatures = useMemo(() => data.map((d) => d.temperature), [data])

  const isLine = variant === 'line'
  const isBar = variant === 'bar'
  const isScatter = variant === 'scatter'

  const option = useMemo(() => {
    const baseType = isLine ? 'line' : isScatter ? 'scatter' : 'bar'

    return {
      tooltip: { trigger: isScatter ? 'item' : 'axis' },
      legend: { data: ['Temperature', 'Humidity'] },
      grid: { left: 48, right: 56, top: 36, bottom: 32 },
      xAxis: {
        type: 'category',
        boundaryGap: isBar, // bars prefer gap; line/scatter don't
        data: timestamps,
      },
      yAxis: [{ type: 'value', name: 'Value', position: 'right' }],
      series: [
        {
          name: 'Value',
          type: baseType,
          yAxisIndex: 0,
          data: temperatures,
          smooth: isLine ? smooth : undefined,
          showSymbol: isLine ? showSymbols : undefined,
        },
      ],
    }
  }, [isBar, isLine, isScatter, showSymbols, smooth, temperatures, timestamps])

  return (
    <div>
      <Typography variant='h6' mb={2} sx={{ fontWeight: 700, height: 24 }}>
        Hisnchu Router 01
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <label>
          Chart type:&nbsp;
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as Variant)}
          >
            <option value='line'>Line</option>
            <option value='bar'>Bar</option>
            <option value='scatter'>Scatter</option>
          </select>
        </label>

        {isLine && (
          <>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type='checkbox'
                checked={smooth}
                onChange={(e) => setSmooth(e.target.checked)}
              />
              Smooth lines
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type='checkbox'
                checked={showSymbols}
                onChange={(e) => setShowSymbols(e.target.checked)}
              />
              Show points
            </label>
          </>
        )}
      </div>

      <ReactECharts option={option} style={{ height }} />
    </div>
  )
}
