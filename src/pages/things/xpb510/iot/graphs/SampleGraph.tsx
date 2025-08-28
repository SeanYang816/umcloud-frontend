import { FC, useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Typography } from '@mui/material'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { ExternalDataType } from 'enums'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'

type Variant = 'line' | 'bar' | 'scatter'

const formatHHmm = (ts: string | number | Date) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

// Fahrenheit → Celsius
const fToC = (f: number) => ((f - 32) * 5) / 9

type SampleGraphProps = {
  alias: string
  unit: 'F' | 'C'
  type: ExternalDataType
}

export const SampleGraph: FC<SampleGraphProps> = ({ alias, unit, type }) => {
  const { sendWsMessage } = useSendWsMessage()
  const [variant, setVariant] = useState<Variant>('line')
  const [smooth, setSmooth] = useState(true)
  const [showSymbols, setShowSymbols] = useState(false)

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.iot.externalData.data?.data,
  )

  const timestamps = useMemo(
    () => data?.map((d) => formatHHmm(d.timestamp)) ?? [],
    [data],
  )

  // Apply conversion depending on type + unit
  const values = useMemo(() => {
    if (!data) return []
    if (type === ExternalDataType.TEMPERATURE) {
      return data.map((d) => (unit === 'F' ? d.value : fToC(d.value)))
    }

    return data.map((d) => d.value) // humidity or others
  }, [data, type, unit])

  const isLine = variant === 'line'
  const isBar = variant === 'bar'
  const isScatter = variant === 'scatter'

  const option = useMemo(() => {
    const baseType = isLine ? 'line' : isScatter ? 'scatter' : 'bar'

    const yAxisName =
      type === ExternalDataType.TEMPERATURE
        ? `Temperature (°${unit})`
        : 'Humidity (%)'

    return {
      tooltip: { trigger: isScatter ? 'item' : 'axis' },
      legend: { data: [yAxisName] },
      grid: { left: 48, right: 56, top: 36, bottom: 32 },
      xAxis: {
        type: 'category',
        boundaryGap: isBar,
        data: timestamps,
      },
      yAxis: [{ type: 'value', name: yAxisName, position: 'right' }],
      series: [
        {
          name: yAxisName,
          type: baseType,
          yAxisIndex: 0,
          data: values,
          smooth: isLine ? smooth : undefined,
          showSymbol: isLine ? showSymbols : undefined,
        },
      ],
    }
  }, [
    isBar,
    isLine,
    isScatter,
    showSymbols,
    smooth,
    values,
    timestamps,
    type,
    unit,
  ])

  useEffect(() => {
    sendWsMessage(XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA, {
      dataType: type,
    })
  }, [sendWsMessage, type])

  return (
    <Box>
      <Typography variant='h6' mb={2} sx={{ fontWeight: 700, height: 24 }}>
        {alias}
      </Typography>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
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

      <ReactECharts option={option} />
    </Box>
  )
}
