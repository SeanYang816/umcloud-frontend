import { useEffect } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch } from 'react-redux'
import { resetIot } from 'reducers/xpb510/iot/climateControl'
import { SampleInfo } from './SampleInfo'
import { Grid } from '@mui/material'

export const Iot = () => {
  const dispatch = useDispatch()
  const { sendWsGetMessage } = useSendWsMessage()

  useEffect(() => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_GET_CLIMATE_HISTORY,
    )
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_CLIMATE_CONTROL_GET_FAN_STATUS)

    return () => {
      dispatch(resetIot())
    }
  }, [dispatch, sendWsGetMessage])

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SampleInfo />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SampleInfo />
      </Grid>
    </Grid>
  )
}
