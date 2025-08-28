// SampleGraph.tsx
import { FC, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { Box, Typography, Stack } from '@mui/material'
import { RefreshControls } from 'components/RefreshControls'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { ExternalDataType } from 'enums'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { cToF } from 'utils'

type Variant = 'line' | 'bar' | 'scatter'
const formatHHmm = (ts: string | number | Date) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const fToC = (f: number) => ((f - 32) * 5) / 9

type SampleGraphProps = {
  alias: string
  unit: 'C' | 'F'
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

  const values = useMemo(() => {
    if (!data) return []
    if (type === ExternalDataType.TEMPERATURE) {
      return data.map((d) => (unit === 'C' ? d.value : cToF(d.value)))
    }

    return data.map((d) => d.value)
  }, [data, type, unit])

  const isLine = variant === 'line'
  const isBar = variant === 'bar'
  const isScatter = variant === 'scatter'

  const yAxisName =
    type === ExternalDataType.TEMPERATURE
      ? `Temperature (°${unit})`
      : 'Humidity (%)'

  const option = useMemo(
    () => ({
      tooltip: { trigger: isScatter ? 'item' : 'axis' },
      legend: { data: [yAxisName] },
      grid: { left: 48, right: 56, top: 36, bottom: 32 },
      xAxis: { type: 'category', boundaryGap: isBar, data: timestamps },
      yAxis: [{ type: 'value', name: yAxisName, position: 'right' }],
      series: [
        {
          name: yAxisName,
          type: isLine ? 'line' : isScatter ? 'scatter' : 'bar',
          yAxisIndex: 0,
          data: values,
          smooth: isLine ? smooth : undefined,
          showSymbol: isLine ? showSymbols : undefined,
        },
      ],
    }),
    [
      isBar,
      isLine,
      isScatter,
      showSymbols,
      smooth,
      values,
      timestamps,
      yAxisName,
    ],
  )

  return (
    <Box>
      {/* Header row: title + refresh control */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 1 }}
      >
        <Typography variant='h6' sx={{ fontWeight: 700, height: 24 }}>
          {alias}
        </Typography>

        <RefreshControls
          fetcher={() =>
            sendWsMessage(XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA, {
              dataType: type,
            })
          }
          doneSignal={data} // marks refresh complete when redux data changes
          auto // start auto-refresh
          intervalMs={30_000} // default interval for this graph
          minIntervalMs={5_000}
          pauseOnHidden
          initialFetch
          // Customize UI bits if you like:
          // hideAutoToggle
          // hideIntervalSelect
          // hideManualButton
          hideLastUpdated
          intervals={[5_000, 10_000, 30_000, 60_000]}
          size='small'
        />
      </Stack>

      {/* Chart controls row (unchanged) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
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

      <ReactECharts option={option} />
    </Box>
  )
}
