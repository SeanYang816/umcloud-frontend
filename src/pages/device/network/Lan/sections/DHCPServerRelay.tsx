import { Card, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { Checkbox, Select, TextField } from 'components/fields'
import { checkboxProps, selectProps, textfieldProps } from 'utils/formik'
import { GetLanPage } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import React, { useState } from 'react'
import { CardHeader } from 'components/extends/CardHeader'
import { StyledCardContent } from 'components/extends/StyledCardContent'

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
  data: GetLanPage
  formik: FormikProps<FormikValuesType>
}

export const DHCPServerRelay = ({ data, formik }: DHCPServerRelayProps) => {
  const [activeTab, setActiveTab] = useState<TabIndexType>(
    TabIndex.GENERAL_SETUP,
  )

  const options = data?.options

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
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
            {...selectProps('ignore', 'DHCP Mode', dhcpModeOptions, formik)}
            helperText='DHCP disable/enable/relay'
          />
          {formik.values.ignore === Ignore.Enable && (
            <>
              <TextField
                {...textfieldProps('start_addr', 'Start address', formik)}
                helperText=' DHCP start address.'
              />
              <TextField
                {...textfieldProps('end_addr', 'End address', formik)}
                helperText='DHCP end address.'
              />
              <TextField
                {...textfieldProps('leasetime', 'Lease Time', formik)}
                helperText='Expiry time of leased addresses, range 2m ~ 999999h(m = minutes, h = hours)'
              />
              <TextField
                {...textfieldProps('wins', 'WINS server', formik)}
                helperText='WINS(Windows Internet Name Service)server'
              />
              <TextField
                {...textfieldProps('dns1', 'Primary DNS server', formik)}
              />
              <TextField
                {...textfieldProps('dns2', 'Secondary DNS server', formik)}
              />
              <TextField
                {...textfieldProps('domain', 'Local domain name', formik)}
              />
            </>
          )}
          {formik.values.ignore === Ignore.Relay && (
            <>
              <TextField
                {...textfieldProps('relay', 'DHCP relay server', formik)}
              />
            </>
          )}
        </TabPanel>

        <TabPanel index={TabIndex.ADVANCED_SETTINGS} value={activeTab}>
          <Checkbox
            {...checkboxProps('dynamicdhcp', 'Dynamic DHCP', formik)}
            helperText='Dynamically, allocate DHCP addresses for clients. If disabled, only clients having static leases will be saved'
          />
          <Checkbox
            {...checkboxProps('logqueries', 'Log queries', formik)}
            helperText='Write received DNS requests to syslog'
          />
        </TabPanel>
      </StyledCardContent>
    </Card>
  )
}
