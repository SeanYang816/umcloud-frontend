import { useEffect } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useDispatch } from 'react-redux'
import { resetIot } from 'reducers/xpb510/iot/climateControl'
import { SampleInfo2 } from './SampleInfo2'

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
    <div>
      <SampleInfo2 />
    </div>
  )
}
