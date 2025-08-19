import React, { SetStateAction, useEffect, useState } from 'react'
import { PageHeader } from 'components/PageHeader'
import { CardHeader } from 'components/extends/CardHeader'
import { Card, InputLabel, Stack, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Select } from 'components/fields'
import { selectProps } from 'utils/formik'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { BGW_EVENT_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

const TabsIndex = {
  Reboot: '0',
  Setting: '1',
} as const

type TabsIndexType = (typeof TabsIndex)[keyof typeof TabsIndex]

type PayloadType_reboot = {
  reboot: string
}
type PayloadType_timeSchedule = {
  'cbid.autoreboot.reboot_config.time_schedule': string
}

const rootId = 'cbid.autoreboot.reboot_config.'

export const Reboot = () => {
  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.administrator.reboot,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}

  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const [tabValue, setTabValue] = useState<TabsIndexType>(TabsIndex.Reboot)

  const scheduleOptions = optionsConverter(options, `${rootId}time_schedule`)

  const handleTabChange = (
    _e: React.SyntheticEvent<Element, Event>,
    value: SetStateAction<TabsIndexType>,
  ) => {
    setTabValue(value)
  }

  const handleReboot = () => {
    const payload: PayloadType_reboot = {
      reboot: '1',
    }
    if (window.confirm('Are you sure you want to restart the device?')) {
      sendWsSetMessage(BGW_EVENT_ACTIONS.REBOOT_PERFORM_REBOOT, payload)
    }
  }

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      time_schedule: result[`${rootId}time_schedule`] ?? '',
    },
    onSubmit: (values) => {
      const payload: PayloadType_timeSchedule = {
        [`${rootId}time_schedule`]: values.time_schedule,
      } as PayloadType_timeSchedule
      sendWsSetMessage(BGW_EVENT_ACTIONS.REBOOT_SET_SETTINGS_PAGE, payload)
    },
  })

  useEffect(() => {
    sendWsGetMessage(BGW_EVENT_ACTIONS.REBOOT_GET_SETTINGS_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader title='Reboot' />

      <Stack gap={2}>
        <Card>
          <CardHeader title='Reboot' />C
          <StyledCardContent>
            <TabContext value={tabValue}>
              <TabList onChange={handleTabChange}>
                <Tab label='System' value={TabsIndex.Reboot} />
                <Tab
                  label='Scheduled Automatic Reboot'
                  value={TabsIndex.Setting}
                />
              </TabList>

              <TabPanel value={TabsIndex.Reboot}>
                <InputLabel>Reboots the operating system</InputLabel>
                <Button
                  icon='reboot'
                  text='perform reboot'
                  color='error'
                  onClick={handleReboot}
                />
              </TabPanel>

              <TabPanel value={TabsIndex.Setting}>
                <Select
                  {...selectProps(
                    'time_schedule',
                    'Schedule',
                    scheduleOptions,
                    formik,
                  )}
                  helperText='The start time of schedule rule will apply automatic reboot time'
                />

                <Button
                  icon='save'
                  text='save'
                  onClick={() => formik.handleSubmit()}
                />
              </TabPanel>
            </TabContext>
          </StyledCardContent>
        </Card>
      </Stack>
    </>
  )
}
