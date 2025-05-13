import {
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { Select, TextField, useStyles } from 'components/fields'
import React, { useMemo, useState } from 'react'
import { selectProps, textfieldProps } from 'utils/formik'
import { GetLANStatus, GetLanPage } from '../type'
import { FormikValuesType } from 'types'
import { FormikProps } from 'formik'
import { bytesToSize, durationConvert } from 'utils/old/utility'
import { CardHeader } from 'components/extends/CardHeader'
import { optionsConverter } from 'utils/optionsConverter'
import { StyledCardContent } from 'components/extends/StyledCardContent'

const TabIndex = {
  GENERAL_SETUP: 0,
  ADVANCED_SETTINGS: 1,
} as const

type TabIndexType = (typeof TabIndex)[keyof typeof TabIndex]

type CommonConfigurationProps = {
  data: GetLanPage
  statusData: GetLANStatus
  formik: FormikProps<FormikValuesType>
}

export const CommonConfiguration = ({
  data,
  statusData,
  formik,
}: CommonConfigurationProps) => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<TabIndexType>(
    TabIndex.GENERAL_SETUP,
  )

  const statusResult = statusData?.result

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const options = data?.options

  const natModeOptions = optionsConverter(options, 'cbid.network.lan.__natmode')

  const statusList = useMemo(
    () =>
      statusResult
        ? [
            { label: 'Uptime', value: durationConvert(statusResult.uptime) },
            { label: 'MAC-Address', value: statusResult.macaddr },
            {
              label: 'RX',
              value: `${bytesToSize(statusResult.rx_bytes)}(${statusResult.rx_packets} Pkts.)`,
            },
            {
              label: 'TX',
              value: `${bytesToSize(statusResult.tx_bytes)}(${statusResult.tx_packets} Pkts.)`,
            },
            {
              label: 'IPv4',
              value: statusResult.ipaddrs.length
                ? statusResult.ipaddrs[0].addr
                : [],
            },
          ]
        : [],
    [statusResult],
  )

  return (
    <Card>
      <CardHeader title='Common Configuration' />
      <StyledCardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='General Setup' tabIndex={TabIndex.GENERAL_SETUP} />
          <Tab
            label='Advanced Settings'
            tabIndex={TabIndex.ADVANCED_SETTINGS}
          />
        </Tabs>

        <TabPanel index={TabIndex.GENERAL_SETUP} value={activeTab}>
          <Grid container minWidth={480} maxWidth={600}>
            {statusList.map((item) => (
              <Grid key={item.label} item xs={6} mb={1}>
                <Typography
                  component='span'
                  variant='subtitle1'
                  color={theme.palette.secondary.dark}
                >
                  {item.label}
                </Typography>
                <Typography variant='h5'>{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
          <Select
            {...selectProps('__natmode', 'Mode', natModeOptions, formik)}
          />
          <TextField {...textfieldProps('ipaddr', 'IPv4 address', formik)} />
          <TextField {...textfieldProps('netmask', 'IPv4 netmask', formik)} />
        </TabPanel>

        <TabPanel index={TabIndex.ADVANCED_SETTINGS} value={activeTab}>
          <TextField
            {...textfieldProps('macaddr', 'Override MAC address', formik)}
            placeholder='00:11:E0:00:51:06'
          />
          <TextField
            {...textfieldProps('mtu', 'Override MTU', formik)}
            type='number'
            placeholder='1500'
          />
        </TabPanel>
      </StyledCardContent>
    </Card>
  )
}
