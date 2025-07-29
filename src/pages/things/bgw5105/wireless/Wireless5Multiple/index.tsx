import { Box, Card, SelectChangeEvent, Tooltip, Stack } from '@mui/material'
import { PasswordField, Select, TextField } from 'components/fields'
import { DISABLED_OPTIONS } from 'constant/options'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  DefaultRootStateProps,
  FormikValuesType,
  OptionsOrSuggestType,
  SelectOptionProps,
} from 'types'
import { selectProps, textfieldProps } from 'utils/formik'
import { GetWireless5MultipleResult } from './type'
import { isNumber } from 'lodash'
import { optionsConverter } from 'utils/optionsConverter'
import { CardHeader } from 'components/extends/CardHeader'
import { SERVER_ACTIONS } from 'constant'
import { validationSchema } from './validationSchema'
import { EncryptionOption } from 'enums'
import { PageHeader } from 'components/PageHeader'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

const Network = {
  Network3: 3,
  Network4: 4,
  Network5: 5,
  Network6: 6,
  Network7: 7,
  Network8: 8,
  Network9: 9,
} as const

type NetworkType = (typeof Network)[keyof typeof Network]

const MSSID = {
  MSSID1: 1,
  MSSID2: 2,
  MSSID3: 3,
  MSSID4: 4,
  MSSID5: 5,
  MSSID6: 6,
  MSSID7: 7,
} as const

type MSSIDType = (typeof MSSID)[keyof typeof MSSID]

export const Wireless5Multiple = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: DefaultRootStateProps) => state.wireless.wireless5Multiple,
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = data?.result as GetWireless5MultipleResult as any

  const [network, setNetwork] = useState<NetworkType>(Network.Network3)
  const [mssid, setMssid] = useState<MSSIDType>(MSSID.MSSID1)

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      disabled: result?.[`cbid.wireless.wifi1_mssid${mssid}.disabled`] ?? '1',
      time_schedule:
        result?.[`cbid.wireless.wifi1_mssid${mssid}.time_schedule`] ?? '',
      ssid: result?.[`cbid.wireless.wifi1_mssid${mssid}.ssid`] ?? '',
      mode: result?.[`cbid.wireless.wifi1_mssid${mssid}.mode`] ?? 'ap',
      hidden: result?.[`cbid.wireless.wifi1_mssid${mssid}.hidden`] ?? '0',
      isolate: result?.[`cbid.wireless.wifi1_mssid${mssid}.isolate`] ?? '0',
      encryption:
        result?.[`cbid.wireless.wifi1_mssid${mssid}.encryption`] ?? 'none',
      cipher: result?.[`cbid.wireless.wifi1_mssid${mssid}.cipher`] ?? '',
      _wpa_key: result?.[`cbid.wireless.wifi1_mssid${mssid}._wpa_key`] ?? '',
      auth_server:
        result?.[`cbid.wireless.wifi1_mssid${mssid}.auth_server`] ?? '',
      auth_port:
        result?.[`cbid.wireless.wifi1_mssid${mssid}.auth_port`] ?? '1812',
      auth_secret:
        result?.[`cbid.wireless.wifi1_mssid${mssid}.auth_secret`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        'cbi.submit': '1',
        // 'cbi.apply': 'Apply' // No need
        [`cbid.wireless.wifi1_mssid${mssid}.disabled`]: values.disabled,
        [`cbid.wireless.wifi1_mssid${mssid}.time_schedule`]:
          values.time_schedule,
        [`cbid.wireless.wifi1_mssid${mssid}.ssid`]: values.ssid,
        [`cbid.wireless.wifi1_mssid${mssid}.mode`]: values.mode,
        [`cbid.wireless.wifi1_mssid${mssid}.hidden`]: values.hidden,
        [`cbid.wireless.wifi1_mssid${mssid}.isolate`]: values.isolate,
        [`cbid.wireless.wifi1_mssid${mssid}.encryption`]: values.encryption,
        [`cbid.wireless.wifi1_mssid${mssid}.cipher`]: values.cipher,
        [`cbid.wireless.wifi1_mssid${mssid}._wpa_key`]: values._wpa_key,
        [`cbid.wireless.wifi1_mssid${mssid}.auth_server`]: values.auth_server,
        [`cbid.wireless.wifi1_mssid${mssid}.auth_port`]: values.auth_port,
        [`cbid.wireless.wifi1_mssid${mssid}.auth_secret`]: values.auth_secret,
      }
      switch (mssid) {
        case MSSID.MSSID1:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_1_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID2:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_2_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID3:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_3_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID4:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_4_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID5:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_5_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID6:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_6_CONFIG,
            payload,
          )
          break
        case MSSID.MSSID7:
          sendWsSetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_SET_MULTIPLE_SSID_7_CONFIG,
            payload,
          )
          break
        default:
          break
      }
    },
  })

  const handleSsidChange = (event: SelectChangeEvent<unknown>) => {
    if (typeof event.target.value === 'string') {
      const networkNumber = Number(
        event.target.value[event.target.value.length - 1],
      ) as NetworkType
      const mssid = (networkNumber - 2) as MSSIDType
      if (isNumber(networkNumber)) {
        setNetwork(networkNumber)
        setMssid(mssid)
      }
    }
  }

  const handleMSSIDChange = useCallback(
    (mssid: MSSIDType) => {
      switch (mssid) {
        case MSSID.MSSID1:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_1_CONFIG,
          )
          break
        case MSSID.MSSID2:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_2_CONFIG,
          )
          break
        case MSSID.MSSID3:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_3_CONFIG,
          )
          break
        case MSSID.MSSID4:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_4_CONFIG,
          )
          break
        case MSSID.MSSID5:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_5_CONFIG,
          )
          break
        case MSSID.MSSID6:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_6_CONFIG,
          )
          break
        case MSSID.MSSID7:
          sendWsGetMessage(
            SERVER_ACTIONS.WIRELESS_FIVE_GHZ_GET_MULTIPLE_SSID_7_CONFIG,
          )
          break
        default:
          break
      }
    },
    [sendWsSetMessage],
  )

  const ssidOptions = useMemo((): SelectOptionProps[] => {
    const list =
      result?.list_ssid.map((item: { ssid: string; netid: string }) => {
        const idNum = Number(item.netid[item.netid.length - 1])

        return {
          label:
            item.ssid.length !== 0
              ? `SSID ${idNum - 2}. ${item.ssid}`
              : `SSID ${idNum - 2}.`,
          value: item.netid,
        }
      }) ?? []

    return list
  }, [result])

  const options = data?.options as OptionsOrSuggestType

  const timeScheduleList = optionsConverter(
    options,
    `cbid.wireless.wifi1_mssid${mssid}.time_schedule`,
  )
  const encryptionList = optionsConverter(
    options,
    `cbid.wireless.wifi1_mssid${mssid}.encryption`,
  )
  const cipherList = optionsConverter(
    options,
    `cbid.wireless.wifi1_mssid${mssid}.cipher`,
  )
  const conditionalCipherList_noCcmp = cipherList.filter(
    (object) => object.value !== 'ccmp',
  ) // 因受 encryption 影響有時需要排除 Force CCMP (AES) 選項，所以做此處裡
  const conditionalCipherList_noTkipCcmp = cipherList.filter(
    (object) => object.value !== 'tkip+ccmp',
  ) // 因受 encryption 影響有時需要排除 Force TKIP and CCMP (AES) 選項，所以做此處裡

  useEffect(() => {
    handleMSSIDChange(mssid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network])

  return (
    <>
      <PageHeader
        title='Wireless 5GHz Multiple SSID'
        subtitle='The multiple SSID feature allows you to broadcast additional SSIDs (or wireless network names). When wireless client devices are searching for available wireless networks to connect to, the SSIDs (or wireless network names) will appear as separate wireless networks in addition to your primary wireless SSIDs and/or guest network SSIDs. Since they appear as separate wireless networks, they are also referred to as virtual APs (Access Points) since they appear as separate wireless access points but are actually all being broadcasting and managed by a single wireless access point. Each virtual AP can be configured each with a different SSID (or wireless network name), security type and additional settings for wireless devices to connect. You can use the multiple SSID feature to setup with different security types and keys to keep your primary wireless network security information private.'
      />
      <Stack gap={2}>
        <Card>
          <CardHeader title='General Setup' />
          <StyledCardContent>
            <Select
              {...selectProps('disabled', 'Enabled', DISABLED_OPTIONS, formik)}
            />
            <Select
              label='Multiple SSID'
              value={`wifi1.network${network}`}
              options={ssidOptions}
              onChange={handleSsidChange}
            />
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
            <Select
              {...selectProps(
                'time_schedule',
                'Turn off wireless radio by schedule',
                timeScheduleList,
                formik,
              )}
            />
          </StyledCardContent>
        </Card>
        <Card>
          <CardHeader title='Wireless Security' />
          <StyledCardContent>
            <Select
              {...selectProps(
                'encryption',
                'Encryption',
                encryptionList,
                formik,
              )}
            />
            {formik.values.encryption !== EncryptionOption.No_Encryption &&
              formik.values.encryption !== EncryptionOption.OWE && (
                <>
                  {formik.values.encryption !==
                    EncryptionOption.WPA2_Personal_Mixed_Mode &&
                  formik.values.encryption !==
                    EncryptionOption.WPA2_Enterprise_Mixed_Mode ? (
                    <Select
                      {...selectProps(
                        'cipher',
                        'Cipher',
                        conditionalCipherList_noTkipCcmp,
                        formik,
                      )}
                    />
                  ) : (
                    <Select
                      {...selectProps(
                        'cipher',
                        'Cipher',
                        conditionalCipherList_noCcmp,
                        formik,
                      )}
                    />
                  )}
                </>
              )}
            {(formik.values.encryption === EncryptionOption.WPA2_Personal ||
              formik.values.encryption ===
                EncryptionOption.WPA2_Personal_Mixed_Mode ||
              formik.values.encryption === EncryptionOption.WPA3_Personal ||
              formik.values.encryption ===
                EncryptionOption.WPA2_WPA3_Personal_Mixed_Mode) && (
              <>
                <PasswordField {...textfieldProps('_wpa_key', 'Key', formik)} />
              </>
            )}
            {(formik.values.encryption === EncryptionOption.WPA2_Enterprise ||
              formik.values.encryption === EncryptionOption.WPA3_Enterprise ||
              formik.values.encryption ===
                EncryptionOption.WPA2_Enterprise_Mixed_Mode) && (
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
          </StyledCardContent>
        </Card>
        <Card>
          <CardHeader title='Advanced Settings' />
          <StyledCardContent>
            <Select
              {...selectProps(
                'isolate',
                'Separate Clients',
                DISABLED_OPTIONS,
                formik,
              )}
            />
            <Select
              disabled
              label='Protected Management Frames'
              value='0'
              options={DISABLED_OPTIONS}
              onChange={() => {}}
            />
          </StyledCardContent>
        </Card>
      </Stack>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
