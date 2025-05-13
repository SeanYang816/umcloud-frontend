import { Card, CardContent, Tab, Tabs } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { Checkbox, Select, TextField, useStyles } from 'components/fields'
import { checkboxProps, selectProps, textfieldProps } from 'utils/formik'
import { GetLanPage } from '../type'
import { FormikProps } from 'formik'
import { FormikValuesType } from 'types'
import { optionsConverter } from 'utils/optionsConverter'
import React, { useState } from 'react'
import { CardHeader } from 'components/extends/CardHeader'

enum TabIndex {
  GENERAL_SETUP = 0,
  ADVANCED_SETTINGS = 1,
}

enum IgnoreType {
  Enable = '0',
  Disable = '1',
  Relay = '2',
}

type DHCPServerRelayProps = {
  data: GetLanPage
  formik: FormikProps<FormikValuesType>
}

export const DHCPServerRelay = ({ data, formik }: DHCPServerRelayProps) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(TabIndex.GENERAL_SETUP)

  const options = data?.options

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const dhcpModeOptions = optionsConverter(options, 'cbid.dhcp.lan.ignore')

  return (
    <Card>
      <CardHeader title='DHCP Server/Relay' />
      <CardContent className={classes.fieldWidth}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='General Setup' tabIndex={TabIndex.GENERAL_SETUP} />
          {formik.values.ignore === IgnoreType.Enable && (
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
          {formik.values.ignore === IgnoreType.Enable && (
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
          {formik.values.ignore === IgnoreType.Relay && (
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
      </CardContent>
    </Card>
  )
}
