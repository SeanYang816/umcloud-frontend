import { useEffect } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch, useSelector } from 'react-redux'
import { resetIot } from 'reducers/xpb510/iot/climateControl'
import { SampleInfo } from './SampleInfo'
import { Grid } from '@mui/material'
import { RootStateProps } from 'types'

export const Iot = () => {
  const dispatch = useDispatch()
  const { sendWsMessage } = useSendWsMessage()

  const sourceData = useSelector(
    (state: RootStateProps) => state.xpb510.iot.externalData.source,
  )
  console.log(sourceData)

  useEffect(() => {
    sendWsMessage(XPB_EVENT_ACTIONS.XPB_510_EXTERNAL_DATA_GET_DATA_SOURCE)

    return () => {
      dispatch(resetIot())
    }
  }, [dispatch, sendWsMessage])

  return (
    <Grid container spacing={2}>
      {sourceData?.sources.map((data) => (
        <Grid key={data.portNumber} size={{ xs: 12, md: 6 }}>
          <SampleInfo data={data} />
        </Grid>
      ))}
    </Grid>
  )
}
