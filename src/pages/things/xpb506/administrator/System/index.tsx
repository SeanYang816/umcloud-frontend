import { useEffect } from 'react'
import { SERVER_ACTIONS } from 'constant'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { SystemProperties } from './SystemProperties'
import { PageHeader } from 'components/PageHeader'
import { useFormik } from 'formik'
import { Logging } from './Logging'
import { useOptionsConverter } from 'hooks/useOptionsConverter'
import { DaylightSavingTime } from './DaylightSavingTime'
import { DateTimeSetting } from './DateTimeSetting'
import { validationSchema } from './validationSchema'
import { Stack } from '@mui/material'
import { Button } from 'components/extends/Button'

type PayloadType = {
  'cbid.system.system.hostname': string
  'cbid.system.system.log_size': string
  'cbid.system.system.log_ip': string
  'cbid.system.system.log_port': string
  'cbid.system.system.conloglevel': string
  'cbid.system.system.cronloglevel': string
  'cbid.system.system.zonename': string
  'cbid.system.system.daylight_saving_enable': string
  'cbid.system.system.daylight_saving_offset': string
  'cbid.system.system.daylight_saving_start_month': string
  'cbid.system.system.daylight_saving_start_week': string
  'cbid.system.system.daylight_saving_start_day_of_week': string
  'cbid.system.system.daylight_saving_start_time': string
  'cbid.system.system.daylight_saving_end_month': string
  'cbid.system.system.daylight_saving_end_week': string
  'cbid.system.system.daylight_saving_end_day_of_week': string
  'cbid.system.system.daylight_saving_end_time': string
  'cbid.system.system.clock_mode': string
  'cbid.system.system.localtime_year'?: string
  'cbid.system.system.localtime_month'?: string
  'cbid.system.system.localtime_day'?: string
  'cbid.system.system.localtime_hour'?: string
  'cbid.system.system.localtime_minute'?: string
  'cbid.system.system.localtime_second'?: string
  'cbid.system.system.ntpserver'?: object[]
}

export const System = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.bgw5105.administrator.system,
  )
  const { dataRefresher } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.refetchData,
  )
  const localTime =
    useSelector(
      (state: RootStateProps) =>
        state.bgw5105.localTime.localTime.result.timestring,
    ) ?? ''
  const result = data?.result
  const options = data?.options

  const rootId = 'cbid.system.system.'

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      hostname: result?.[`${rootId}hostname`] ?? 'UMRouter',
      log_size: result?.[`${rootId}log_size`] ?? '64',
      log_ip: result?.[`${rootId}log_ip`] ?? '',
      log_port: result?.[`${rootId}log_port`] ?? '',
      conloglevel: result?.[`${rootId}conloglevel`] ?? '8',
      cronloglevel: result?.[`${rootId}cronloglevel`] ?? '8',
      zonename: result?.[`${rootId}zonename`] ?? 'UTC',
      daylight_saving_enable:
        result?.[`${rootId}daylight_saving_enable`] ?? '0',
      daylight_saving_offset:
        result?.[`${rootId}daylight_saving_offset`] ?? '60',
      daylight_saving_start_month:
        result?.[`${rootId}daylight_saving_start_month`] ?? '4',
      daylight_saving_start_week:
        result?.[`${rootId}daylight_saving_start_week`] ?? '1',
      daylight_saving_start_day_of_week:
        result?.[`${rootId}daylight_saving_start_day_of_week`] ?? '0',
      daylight_saving_start_time:
        result?.[`${rootId}daylight_saving_start_time`] ?? '2',
      daylight_saving_end_month:
        result?.[`${rootId}daylight_saving_end_month`] ?? '10',
      daylight_saving_end_week:
        result?.[`${rootId}daylight_saving_end_week`] ?? '1',
      daylight_saving_end_day_of_week:
        result?.[`${rootId}daylight_saving_end_day_of_week`] ?? '0',
      daylight_saving_end_time:
        result?.[`${rootId}daylight_saving_end_time`] ?? '2',
      clock_mode: result?.[`${rootId}clock_mode`] ?? '0',
      localtime_year: result?.[`${rootId}localtime_year`] ?? '',
      localtime_month: result?.[`${rootId}localtime_month`] ?? '',
      localtime_day: result?.[`${rootId}localtime_day`] ?? '',
      localtime_hour: result?.[`${rootId}localtime_hour`] ?? '',
      localtime_minute: result?.[`${rootId}localtime_minute`] ?? '',
      localtime_second: result?.[`${rootId}localtime_second`] ?? '',
      ntpserver: result?.[`${rootId}ntpserver`] ?? [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: PayloadType = {
        [`${rootId}hostname`]: values.hostname,
        [`${rootId}log_size`]: values.log_size,
        [`${rootId}log_ip`]: values.log_ip,
        [`${rootId}log_port`]: values.log_port,
        [`${rootId}conloglevel`]: values.conloglevel,
        [`${rootId}cronloglevel`]: values.cronloglevel,
        [`${rootId}zonename`]: values.zonename,
        [`${rootId}daylight_saving_enable`]: values.daylight_saving_enable,
        [`${rootId}daylight_saving_offset`]: values.daylight_saving_offset,
        [`${rootId}daylight_saving_start_month`]:
          values.daylight_saving_start_month,
        [`${rootId}daylight_saving_start_week`]:
          values.daylight_saving_start_week,
        [`${rootId}daylight_saving_start_day_of_week`]:
          values.daylight_saving_start_day_of_week,
        [`${rootId}daylight_saving_start_time`]:
          values.daylight_saving_start_time,
        [`${rootId}daylight_saving_end_month`]:
          values.daylight_saving_end_month,
        [`${rootId}daylight_saving_end_week`]: values.daylight_saving_end_week,
        [`${rootId}daylight_saving_end_day_of_week`]:
          values.daylight_saving_end_day_of_week,
        [`${rootId}daylight_saving_end_time`]: values.daylight_saving_end_time,
        [`${rootId}clock_mode`]: values.clock_mode,
        [`${rootId}localtime_year`]: values.localtime_year,
        [`${rootId}localtime_month`]: values.localtime_month,
        [`${rootId}localtime_day`]: values.localtime_day,
        [`${rootId}localtime_hour`]: values.localtime_hour,
        [`${rootId}localtime_minute`]: values.localtime_minute,
        [`${rootId}localtime_second`]: values.localtime_second,
        [`${rootId}ntpserver`]: values.ntpserver,
      } as PayloadType
      sendWsSetMessage(SERVER_ACTIONS.SYSTEM_SET_SYSTEM_TIME_DATE_PAGE, payload)
    },
  })

  // System Properties
  const zoneOptions = useOptionsConverter(options, rootId, 'zonename')

  // Logging
  const conlogOptions = useOptionsConverter(options, rootId, 'conloglevel')
  const cronlogOptions = useOptionsConverter(options, rootId, 'cronloglevel')

  // Daylight Saving Time
  const daylightSavingEnableOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_enable',
  )
  const daylightSavingOffsetOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_offset',
  )
  const daylightSavingStartMonthOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_start_month',
  )
  const daylightSavingStartWeekOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_start_week',
  )
  const daylightSavingStartDayOfWeekOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_start_day_of_week',
  )
  const daylightSavingStartTimeOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_start_time',
  )
  const daylightSavingEndMonthOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_end_month',
  )
  const daylightSavingEndWeekOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_end_week',
  )
  const daylightSavingEndDayOfWeekOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_end_day_of_week',
  )
  const daylightSavingEndTimeOptions = useOptionsConverter(
    options,
    rootId,
    'daylight_saving_end_time',
  )

  // Date/Time Setting
  const clockModeOptions = useOptionsConverter(options, rootId, 'clock_mode')
  const localTimeYearOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_year',
  )
  const localTimeMonthOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_month',
  )
  const localTimeDayOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_day',
  )
  const localTimeHourOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_hour',
  )
  const localTimeMinuteOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_minute',
  )
  const localTimeSecondOptions = useOptionsConverter(
    options,
    rootId,
    'localtime_second',
  )

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.SYSTEM_GET_SYSTEM_TIME_DATE_PAGE)
  }, [sendWsGetMessage])

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.SYSTEM_GET_LOCAL_TIME)
  }, [sendWsGetMessage, dataRefresher])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formik.values.clock_mode === '0') {
        sendWsSetMessage(SERVER_ACTIONS.SYSTEM_SET_LOCAL_TIME, {
          set: Math.floor(new Date().getTime() / 1000),
        })
      }
    }, window.__CONFIG__.VITE_DUT_LOCAL_TIME_REPORT_RATE_SECONDS * 1000)

    return () => clearInterval(intervalId)
  }, [formik.values.clock_mode, result, sendWsSetMessage])

  return (
    <>
      <PageHeader
        title='System'
        subtitle='This section allows you to set up the router date and time settings, change the host name, and configure logging to be sent to an external syslog server for monitoring and troubleshooting.'
      />
      <Stack gap={2}>
        <SystemProperties
          title='System Properties'
          formik={formik}
          localTime={localTime}
          zoneOptions={zoneOptions}
        />
        <Logging
          title='Logging'
          formik={formik}
          conloglevelOptions={conlogOptions}
          cronloglevelOptions={cronlogOptions}
        />
        <DaylightSavingTime
          title='Daylight Saving Time'
          formik={formik}
          daylightSavingEnableOptions={daylightSavingEnableOptions}
          daylightSavingOffsetOptions={daylightSavingOffsetOptions}
          daylightSavingStartMonthOptions={daylightSavingStartMonthOptions}
          daylightSavingStartWeekOptions={daylightSavingStartWeekOptions}
          daylightSavingStartDayOfWeekOptions={
            daylightSavingStartDayOfWeekOptions
          }
          daylightSavingStartTimeOptions={daylightSavingStartTimeOptions}
          daylightSavingEndMonthOptions={daylightSavingEndMonthOptions}
          daylightSavingEndWeekOptions={daylightSavingEndWeekOptions}
          daylightSavingEndDayOfWeekOptions={daylightSavingEndDayOfWeekOptions}
          daylightSavingEndTimeOptions={daylightSavingEndTimeOptions}
        />
        <DateTimeSetting
          title='Date/Time Setting'
          formik={formik}
          clockModeOptions={clockModeOptions}
          localTimeYearOptions={localTimeYearOptions}
          localTimeMonthOptions={localTimeMonthOptions}
          localTimeDayOptions={localTimeDayOptions}
          localTimeHourOptions={localTimeHourOptions}
          localTimeMinuteOptions={localTimeMinuteOptions}
          localTimeSecondOptions={localTimeSecondOptions}
        />
      </Stack>
      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
