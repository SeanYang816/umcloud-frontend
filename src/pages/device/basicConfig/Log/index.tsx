import React, { useState } from 'react'
import { Card, CardContent, Tab, Tabs } from '@mui/material'
import { DefaultRootStateProps } from 'types'
import { useSelector } from 'react-redux'
import { TabPanel } from 'components/TabPanel'
import { LogDevice } from './section/LogDevice'
import { Thing, useGetThingQuery } from 'generated/graphql'
import { LogDebug } from './section'
import { LogConfig } from './section/LogConfig'
import { PageHeader } from 'components/PageHeader'
import { CardHeader } from 'components/extends/CardHeader'

enum LogTabIndex {
  DEBUG = 0,
  DEVICE = 1,
  CONFIG = 2,
}

export const Log = () => {
  const deviceId = useSelector(
    (state: DefaultRootStateProps) => state.device.info.row?.id as string,
  )
  const [activeTab, setActiveTab] = useState(0)

  const { data } = useGetThingQuery({ variables: { id: deviceId } }) // currently, no pageIndex & pageSize params to search data over 10000 +

  const thing = data?.thing as Thing

  const debugLogs = thing?.debugLogs?.list ?? []
  const deviceLogs = thing?.deviceLogs?.list ?? []
  const configLogs = thing?.configLogs?.list ?? []

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <>
      <PageHeader title='Log' />
      <Card>
        <CardHeader title='Log' />
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label='Debug Log' value={LogTabIndex.DEBUG} />
            <Tab label='Device Log' value={LogTabIndex.DEVICE} />
            <Tab label='Configuration Log' value={LogTabIndex.CONFIG} />
          </Tabs>

          <TabPanel index={LogTabIndex.DEBUG} value={activeTab}>
            <LogDebug logs={debugLogs} />
          </TabPanel>
          <TabPanel index={LogTabIndex.DEVICE} value={activeTab}>
            <LogDevice logs={deviceLogs} />
          </TabPanel>
          <TabPanel index={LogTabIndex.CONFIG} value={activeTab}>
            <LogConfig logs={configLogs} />
          </TabPanel>
        </CardContent>
      </Card>
    </>
  )
}
