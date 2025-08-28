import {
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { XPB_EVENT_ACTIONS } from 'constant'
import { Card, CardContent, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PageHeader } from 'components/PageHeader'
import { Load } from './Load'
import { Connections } from './Connections'
import { useSelector } from 'react-redux'
import { RootStateProps } from 'types'
import { TrafficTab } from './TrafficTab'

export const TabsIndex = {
  Load: '0',
  Traffic: '1',
  Connections: '2',
} as const

export type TabsIndexType = (typeof TabsIndex)[keyof typeof TabsIndex]

export const RealtimeGraphs = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.status.realtimeGraphs,
  )
  const trafficResult = useMemo(() => data?.traffic?.result ?? {}, [data])

  const [tabValue, setTabValue] = useState<TabsIndexType>(TabsIndex.Load)
  const [trafficValue, setTrafficValue] = useState('')
  const handleTabChange = (
    _event: SyntheticEvent<Element, Event>,
    value: SetStateAction<TabsIndexType>,
  ) => setTabValue(value)
  const handleTrafficTabChange = (
    _event: SyntheticEvent<Element, Event>,
    value: SetStateAction<string>,
  ) => setTrafficValue(value)

  useEffect(() => {
    sendWsGetMessage(
      XPB_EVENT_ACTIONS.XPB_510_REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE,
    )
  }, [sendWsGetMessage])

  useEffect(() => {
    if (Object.keys(trafficResult).length !== 0 && trafficValue === '') {
      setTrafficValue(Object.keys(trafficResult)[0])
    }
  }, [trafficResult, trafficValue])

  return (
    <>
      <PageHeader title='Realtime Graph' />

      <Card>
        <CardContent>
          <TabContext value={tabValue}>
            <TabList onChange={handleTabChange}>
              <Tab label='Load' value={TabsIndex.Load} />
              {/** TODO */}
              {/* <Tab label='Traffic' value={TabsIndex.Traffic} /> */}
              <Tab label='Connections' value={TabsIndex.Connections} />
            </TabList>

            <TabPanel value={TabsIndex.Load}>
              <Load />
            </TabPanel>
            <TabPanel value={TabsIndex.Traffic}>
              {trafficValue === '' ? (
                <></>
              ) : (
                <TabContext value={trafficValue}>
                  <TabList onChange={handleTrafficTabChange}>
                    {Object.entries(trafficResult).map(([key, value]) => (
                      <Tab key={key} label={value} value={key} />
                    ))}
                  </TabList>
                  {Object.entries(trafficResult).map(([key, value]) => (
                    <TabPanel key={key} value={key}>
                      <TrafficTab propertyKey={key} propertyValue={value} />
                    </TabPanel>
                  ))}
                </TabContext>
              )}
            </TabPanel>
            <TabPanel value={TabsIndex.Connections}>
              <Connections />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </>
  )
}
