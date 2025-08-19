import { Grid } from '@mui/material'
import { BasicViewSystem } from './section/BasicViewSystem'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { useEffect } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BasicViewWire } from './section/BasicViewWire'
import { BasicViewWan1 } from './section/BasicViewWan1'
import { WifiNetIndex } from 'enums'
import { BGW_EVENT_ACTIONS } from 'constant'
import { PageHeader } from 'components/PageHeader'

export const BasicInformation = () => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.basicConfig.basicConfig,
  )
  const data_24g = useSelector(
    (state: RootStateProps) => state.bgw5105.wireless.wireless2Primary,
  )
  const data_5g = useSelector(
    (state: RootStateProps) => state.bgw5105.wireless.wireless5Primary,
  )
  const result = data?.result ?? {}
  const hwMode_24g_value =
    data_24g?.result?.['cbid.wireless.wifi0.hwmode'] ?? ''
  const hwMode_5g_value = data_5g?.result?.['cbid.wireless.wifi1.hwmode'] ?? ''
  const hwMode_24g_options =
    data_24g?.options?.['cbid.wireless.wifi0.hwmode'] ?? []
  const hwMode_5g_options =
    data_5g?.options?.['cbid.wireless.wifi1.hwmode'] ?? []
  const hwMode_24g_text =
    hwMode_24g_options.find((obj) => obj.value === hwMode_24g_value)?.text ?? ''
  const hwMode_5g_text =
    hwMode_5g_options.find((obj) => obj.value === hwMode_5g_value)?.text ?? ''
  const { sendWsGetMessage } = useSendWsMessage()
  const { dataRefresher } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.refetchData,
  )

  useEffect(() => {
    sendWsGetMessage(BGW_EVENT_ACTIONS.OVERVIEW_GET_STATUS_OVERVIEW_PAGE)
    sendWsGetMessage(
      BGW_EVENT_ACTIONS.WIRELESS_TWO_POINT_FOUR_GHZ_GET_PRIMARY_SSID_CONFIG,
    )
    sendWsGetMessage(
      BGW_EVENT_ACTIONS.WIRELESS_FIVE_GHZ_GET_PRIMARY_SSID_CONFIG,
    )
  }, [sendWsGetMessage, dataRefresher])

  return (
    <>
      <PageHeader title='Basic Information' />
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid size={{ xs: 12 }}>
          <BasicViewSystem title='System' result={result} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BasicViewWire
            title='Wireless 2.4GHz'
            result={result}
            hwMode={hwMode_24g_text}
            wifinet={WifiNetIndex.WIRE}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BasicViewWire
            title='Wireless 5GHz'
            result={result}
            hwMode={hwMode_5g_text}
            wifinet={WifiNetIndex.WIRE5}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <BasicViewWan1 title='WAN1' result={result} />
        </Grid>
      </Grid>
    </>
  )
}
