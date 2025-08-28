import { useEffect, useState } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { resetIot } from 'reducers/xpb510/iot/climateControl'
import { SampleInfo } from './SampleInfo'
import {
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Stack,
} from '@mui/material'
import { RootStateProps } from 'types'
import { RefreshControls } from 'components/RefreshControls' // ⬅️ uses useAutoRefresh internally

export const Iot = () => {
  const dispatch = useDispatch()
  const { sendWsMessage } = useSendWsMessage()

  // Temperature unit toggle (kept local)
  const [unit, setUnit] = useState<'C' | 'F'>('C')

  // Redux data (used as doneSignal so the control knows when refresh completes)
  const sourceData = useSelector(
    (state: RootStateProps) => state.xpb510.iot.externalData.source,
  )

  // Only reset on unmount (no flicker during refresh)
  useEffect(() => {
    return () => {
      dispatch(resetIot())
    }
  }, [dispatch])

  return (
    <Box>
      {/* Toolbar: Unit toggle (left) + RefreshControls (right) */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 2, gap: 1 }}
      >
        {/* °F / °C toggle */}
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, val: 'C' | 'F' | null) => val && setUnit(val)}
          size='small'
        >
          <ToggleButton value='C'>°C</ToggleButton>
          <ToggleButton value='F'>°F</ToggleButton>
        </ToggleButtonGroup>

        {/* Reusable refresh UI (auto toggle, interval select, manual button, last updated) */}
        <RefreshControls
          fetcher={() =>
            sendWsMessage(
              XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA_SOURCE,
            )
          }
          doneSignal={sourceData} // mark refresh complete when redux updates
          auto // start auto-refresh on mount
          intervalMs={30_000} // default interval for this page
          minIntervalMs={5_000}
          pauseOnHidden
          initialFetch // do one fetch on mount
          // You can customize/hide parts if needed:
          // hideAutoToggle
          // hideIntervalSelect
          // hideManualButton
          hideLastUpdated
          intervals={[5_000, 10_000, 30_000, 60_000]}
          size='small'
        />
      </Stack>

      {/* Cards */}
      <Grid container spacing={2}>
        {sourceData?.sources.map((data) => (
          <Grid size={{ xs: 12, md: 6 }} key={data.portNumber}>
            <SampleInfo data={data} unit={unit} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
