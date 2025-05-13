import { Card, Box, CardContent, Tab, Tabs, Tooltip } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import {
  PasswordField,
  MultiSelect,
  Select,
  TextField,
  useStyles,
} from 'components/fields'
import { DISABLED_OPTIONS } from 'constant/options'
import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { FormikValuesType, OptionsOrSuggestType } from 'types'
import { multiSelectProps, selectProps, textfieldProps } from 'utils/formik'
import { GetWireless5Primary, GetWireless5PrimaryStatus } from '../type'
import { optionsConverter } from 'utils/optionsConverter'
import { WmmParams } from './WmmParams'
import { EncryptionOptionTypes, MacfilterOptionTypes } from 'enums'
import { CardHeader } from 'components/extends/CardHeader'
import { StyledCardContent } from 'components/extends/StyledCardContent'

enum TabIndex {
  GENERAL_SETUP = 0,
  WIRELESS_SECURITY = 1,
  MAC_FILTER = 2,
  ADVANCED_SETTINGS = 3,
}

type InterfaceConfigurationProps = {
  data: GetWireless5Primary
  statusData: GetWireless5PrimaryStatus
  formik: FormikProps<FormikValuesType>
}

export const InterfaceConfiguration = ({
  data,
  statusData,
  formik,
}: InterfaceConfigurationProps) => {
  const [activeTab, setActiveTab] = useState(TabIndex.GENERAL_SETUP)

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const options = data?.options as OptionsOrSuggestType

  const encryptionOptions = optionsConverter(
    options,
    'cbid.wireless.wifi1_primary.encryption',
  )
  const cipherOptions = optionsConverter(
    options,
    'cbid.wireless.wifi1_primary.cipher',
  )
  const macfilterOptions = optionsConverter(
    options,
    'cbid.wireless.wifi1_primary.macfilter',
  )
  const maclistOptions = optionsConverter(
    options,
    'cbid.wireless.wifi0_primary.maclist',
  )
  const conditionalCipherOptions_noCcmp = cipherOptions.filter(
    (object) => object.value !== 'ccmp',
  ) // 因受 encryption 影響有時需要排除 Force CCMP (AES) 選項，所以做此處裡
  const conditionalCipherOptions_noTkipCcmp = cipherOptions.filter(
    (object) => object.value !== 'tkip+ccmp',
  ) // 因受 encryption 影響有時需要排除 Force TKIP and CCMP (AES) 選項，所以做此處裡

  return (
    <>
      <Card>
        <CardHeader title='Interface Configuration' />
        <StyledCardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label='General Setup' tabIndex={TabIndex.GENERAL_SETUP} />
            <Tab
              label='Wireless Security'
              tabIndex={TabIndex.WIRELESS_SECURITY}
            />
            <Tab label='MAC-Filter' tabIndex={TabIndex.MAC_FILTER} />
            <Tab
              label='Advanced Settings'
              tabIndex={TabIndex.ADVANCED_SETTINGS}
            />
          </Tabs>

          <TabPanel value={activeTab} index={TabIndex.GENERAL_SETUP}>
            <TextField
              {...textfieldProps(
                'ssid',
                <>
                  <Tooltip title='Extended Service Set Identifier'>
                    <Box
                      component='span'
                      sx={{
                        borderBottom: (theme) =>
                          `1px ${theme.palette.primary.main} solid`,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      ESSID
                    </Box>
                  </Tooltip>
                </>,
                formik,
              )}
            />
            <Select
              {...selectProps(
                'hidden',
                <>
                  Hide&nbsp;
                  <Tooltip title='Extended Service Set Identifier'>
                    <Box
                      component='span'
                      sx={{
                        borderBottom: (theme) =>
                          `1px ${theme.palette.primary.main} solid`,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      ESSID
                    </Box>
                  </Tooltip>
                </>,
                DISABLED_OPTIONS,
                formik,
              )}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={TabIndex.WIRELESS_SECURITY}>
            <Select
              {...selectProps(
                'encryption',
                'Encryption',
                encryptionOptions,
                formik,
              )}
            />
            {formik.values.encryption !== EncryptionOptionTypes.No_Encryption &&
              formik.values.encryption !== EncryptionOptionTypes.OWE && (
                <>
                  {formik.values.encryption !==
                    EncryptionOptionTypes.WPA2_Personal_Mixed_Mode &&
                  formik.values.encryption !==
                    EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode ? (
                    <Select
                      {...selectProps(
                        'cipher',
                        'Cipher',
                        conditionalCipherOptions_noTkipCcmp,
                        formik,
                      )}
                    />
                  ) : (
                    <Select
                      {...selectProps(
                        'cipher',
                        'Cipher',
                        conditionalCipherOptions_noCcmp,
                        formik,
                      )}
                    />
                  )}
                </>
              )}
            {(formik.values.encryption ===
              EncryptionOptionTypes.WPA2_Personal ||
              formik.values.encryption ===
                EncryptionOptionTypes.WPA2_Personal_Mixed_Mode ||
              formik.values.encryption ===
                EncryptionOptionTypes.WPA3_Personal ||
              formik.values.encryption ===
                EncryptionOptionTypes.WPA2_WPA3_Personal_Mixed_Mode) && (
              <>
                <PasswordField {...textfieldProps('_wpa_key', 'Key', formik)} />
              </>
            )}
            {(formik.values.encryption ===
              EncryptionOptionTypes.WPA2_Enterprise ||
              formik.values.encryption ===
                EncryptionOptionTypes.WPA3_Enterprise ||
              formik.values.encryption ===
                EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode) && (
              <>
                <TextField
                  {...textfieldProps(
                    'auth_server',
                    'Radius Authentication Server',
                    formik,
                  )}
                />
                <TextField
                  {...textfieldProps(
                    'auth_port',
                    'Radius Authentication Port',
                    formik,
                  )}
                />
                <PasswordField
                  {...textfieldProps(
                    'auth_secret',
                    'Radius Authentication Secret',
                    formik,
                  )}
                />
              </>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={TabIndex.MAC_FILTER}>
            <Select
              {...selectProps(
                'macfilter',
                'MAC-Address Filter',
                macfilterOptions,
                formik,
              )}
            />
            {(formik.values.macfilter ===
              MacfilterOptionTypes.Allow_listed_only ||
              formik.values.macfilter === MacfilterOptionTypes.Deny_listed) && (
              <>
                <MultiSelect
                  {...multiSelectProps(
                    'maclist',
                    'MAC-List',
                    maclistOptions,
                    formik,
                  )}
                  freeSolo
                />
              </>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={TabIndex.ADVANCED_SETTINGS}>
            <Select
              {...selectProps(
                'isolate',
                'Separate Clients',
                DISABLED_OPTIONS,
                formik,
              )}
              helperText='Prevents client-to-client communication'
            />
            <Select
              disabled
              {...formik.getFieldProps('')}
              value='0'
              label='Protected Management Frames'
              options={DISABLED_OPTIONS}
            />{' '}
            {/** IDK */}
          </TabPanel>
        </StyledCardContent>
      </Card>

      {activeTab === TabIndex.ADVANCED_SETTINGS && (
        <WmmParams statusData={statusData} />
      )}
    </>
  )
}
