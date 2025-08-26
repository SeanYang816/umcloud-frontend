import { Card, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { Checkbox, Select, TextField } from 'components/formik'
import { formikField } from 'utils/formik'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import React, { useState } from 'react'
import { CardHeader } from 'components/extends/CardHeader'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { GetLanPageResponse } from 'types/xpb510/network/lan'

export const TabIndex = {
  GENERAL_SETUP: 0,
  ADVANCED_SETTINGS: 1,
} as const

export type TabIndexType = (typeof TabIndex)[keyof typeof TabIndex]

export const Ignore = {
  Enable: '0',
  Disable: '1',
  Relay: '2',
} as const

export type IgnoreType = (typeof Ignore)[keyof typeof Ignore]

type DHCPServerRelayProps = {
  data: GetLanPageResponse
  formik: FormikProps<FormikValuesType>
}

export const DHCPServerRelay = ({ data, formik }: DHCPServerRelayProps) => {
  const [activeTab, setActiveTab] = useState<TabIndexType>(
    TabIndex.GENERAL_SETUP,
  )

  const options = data?.options

  const handleTabChange = (
    _e: React.SyntheticEvent,
    newValue: TabIndexType,
  ) => {
    setActiveTab(newValue)
  }

  const dhcpModeOptions = optionsConverter(options, 'cbid.dhcp.lan.ignore')

  return (
    <Card>
      <CardHeader title='DHCP Server/Relay' />
      <StyledCardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='General Setup' tabIndex={TabIndex.GENERAL_SETUP} />
          {formik.values.ignore === Ignore.Enable && (
            <Tab
              label='Advanced Settings'
              tabIndex={TabIndex.ADVANCED_SETTINGS}
            />
          )}
        </Tabs>

        <TabPanel index={TabIndex.GENERAL_SETUP} value={activeTab}>
          <Select
            label='DHCP Mode'
            options={dhcpModeOptions}
            {...formikField(formik, 'ignore')}
            helperText='DHCP disable/enable/relay'
          />
          {formik.values.ignore === Ignore.Enable && (
            <>
              <TextField
                label='Start address'
                {...formikField(formik, 'start')}
                helperText=' DHCP start address.'
              />
              <TextField
                label='End address'
                {...formikField(formik, 'end')}
                helperText='DHCP end address.'
              />
              <TextField
                label='Lease Time'
                {...formikField(formik, 'leasetime')}
                helperText='Expiry time of leased addresses, range 2m ~ 999999h(m = minutes, h = hours)'
              />
              <TextField
                label='WINS server'
                {...formikField(formik, 'wins')}
                helperText='WINS(Windows Internet Name Service)server'
              />
              <TextField
                label='Primary DNS server'
                {...formikField(formik, 'dns1')}
              />
              <TextField
                label='Secondary DNS server'
                {...formikField(formik, 'dns2')}
              />
              <TextField
                label='Local domain name'
                {...formikField(formik, 'domain')}
              />
            </>
          )}
          {formik.values.ignore === Ignore.Relay && (
            <>
              <TextField
                label='DHCP relay server'
                {...formikField(formik, 'relay')}
              />
            </>
          )}
        </TabPanel>

        <TabPanel index={TabIndex.ADVANCED_SETTINGS} value={activeTab}>
          <Checkbox
            label='Dynamic DHCP'
            {...formikField(formik, 'dynamicdhcp')}
            helperText='Dynamically, allocate DHCP addresses for clients. If disabled, only clients having static leases will be saved'
          />
          <Checkbox
            label='Log queries'
            {...formikField(formik, 'logqueries')}
            helperText='Write received DNS requests to syslog'
          />
        </TabPanel>
      </StyledCardContent>
    </Card>
  )
}
