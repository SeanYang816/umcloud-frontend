import { SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SERVER_ACTIONS } from 'constant'
import { Card, CardContent, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PageHeader } from 'components/PageHeader'
import { Load } from './Load'
import { Connections } from './Connections'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { TrafficTab } from './TrafficTab'

enum TabsIndex {
  Load = '0',
  Traffic = '1',
  Connections = '2',
}

export const RealtimeGraphs = () => {
  const { sendWsGetMessage } = useSendWsMessage()
  const data = useSelector(
    (state: DefaultRootStateProps) =>
      state.status.realtimeGraph.trafficGetDevice,
  )
  const result = data?.result
  const [tabValue, setTabValue] = useState(TabsIndex.Load)
  const [trafficValue, setTrafficValue] = useState('')
  const handleTabChange = (
    _event: SyntheticEvent<Element, Event>,
    value: SetStateAction<TabsIndex>,
  ) => setTabValue(value)
  const handleTrafficTabChange = (
    _event: SyntheticEvent<Element, Event>,
    value: SetStateAction<string>,
  ) => setTrafficValue(value)

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.REAL_TIME_GRAPHS_TRAFFIC_GET_DEVICE)
  }, [sendWsGetMessage])

  useEffect(() => {
    if (Object.keys(result).length !== 0 && trafficValue === '') {
      setTrafficValue(Object.keys(result)[0])
    }
  }, [result, trafficValue])

  return (
    <>
      <PageHeader title='Realtime Graph' />

      <Card>
        <CardContent>
          <TabContext value={tabValue}>
            <TabList onChange={handleTabChange}>
              <Tab label='Load' value={TabsIndex.Load} />
              <Tab label='Traffic' value={TabsIndex.Traffic} />
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
                    {Object.entries(result).map(([key, value]) => (
                      <Tab key={key} label={value} value={key} />
                    ))}
                  </TabList>
                  {Object.entries(result).map(([key, value]) => (
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
