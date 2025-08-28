import { useEffect, useState } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { resetIot } from 'reducers/xpb510/iot/climateControl'
import { SampleInfo } from './SampleInfo'
import { Grid, ToggleButtonGroup, ToggleButton, Box } from '@mui/material'
import { RootStateProps } from 'types'

export const Iot = () => {
  const dispatch = useDispatch()
  const { sendWsMessage } = useSendWsMessage()
  const [unit, setUnit] = useState<'F' | 'C'>('F') // default F

  const sourceData = useSelector(
    (state: RootStateProps) => state.xpb510.iot.externalData.source,
  )

  useEffect(() => {
    sendWsMessage(XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA_SOURCE)

    return () => {
      dispatch(resetIot())
    }
  }, [dispatch, sendWsMessage])

  return (
    <Box>
      {/* Toggle */}
      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={(_, val) => val && setUnit(val)}
        size='small'
        sx={{ mb: 2 }}
      >
        <ToggleButton value='F'>°F</ToggleButton>
        <ToggleButton value='C'>°C</ToggleButton>
      </ToggleButtonGroup>

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
