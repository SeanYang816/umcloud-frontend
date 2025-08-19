import { useEffect } from 'react'
import { XPB_EVENT_ACTIONS } from 'constant'
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
import { LinearProgress, Stack } from '@mui/material'
import { Button } from 'components/extends/Button'
import { GetSystemTimeDatePageResult } from 'types/xpb510/administrator/system'

export const System = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const data = useSelector(
    (state: RootStateProps) => state.xpb510.administrator.system.timeDate,
  )
  const { dataRefresher } = useSelector(
    (state: RootStateProps) => state.bgw5105.config.refetchData,
  )
  const localTime =
    useSelector(
      (state: RootStateProps) =>
        state.xpb510.administrator.system.localTime?.result.timestring,
    ) || ''
  const result = data?.result
  const options = data?.options

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      hostname: result?.[`cbid.system.system.hostname`] ?? 'UMRouter',
      log_size: result?.[`cbid.system.system.log_size`] ?? '64',
      log_ip: result?.[`cbid.system.system.log_ip`] ?? '',
      log_port: result?.[`cbid.system.system.log_port`] ?? '',
      conloglevel: result?.[`cbid.system.system.conloglevel`] ?? '8',
      cronloglevel: result?.[`cbid.system.system.cronloglevel`] ?? '8',
      zonename: result?.[`cbid.system.system.zonename`] ?? 'UTC',
      daylight_saving_enable:
        result?.[`cbid.system.system.daylight_saving_enable`] ?? '0',
      daylight_saving_offset:
        result?.[`cbid.system.system.daylight_saving_offset`] ?? '60',
      daylight_saving_start_month:
        result?.[`cbid.system.system.daylight_saving_start_month`] ?? '4',
      daylight_saving_start_week:
        result?.[`cbid.system.system.daylight_saving_start_week`] ?? '1',
      daylight_saving_start_day_of_week:
        result?.[`cbid.system.system.daylight_saving_start_day_of_week`] ?? '0',
      daylight_saving_start_time:
        result?.[`cbid.system.system.daylight_saving_start_time`] ?? '2',
      daylight_saving_end_month:
        result?.[`cbid.system.system.daylight_saving_end_month`] ?? '10',
      daylight_saving_end_week:
        result?.[`cbid.system.system.daylight_saving_end_week`] ?? '1',
      daylight_saving_end_day_of_week:
        result?.[`cbid.system.system.daylight_saving_end_day_of_week`] ?? '0',
      daylight_saving_end_time:
        result?.[`cbid.system.system.daylight_saving_end_time`] ?? '2',
      clock_mode: result?.[`cbid.system.system.clock_mode`] ?? '0',
      localtime_year: result?.[`cbid.system.system.localtime_year`] ?? '',
      localtime_month: result?.[`cbid.system.system.localtime_month`] ?? '',
      localtime_day: result?.[`cbid.system.system.localtime_day`] ?? '',
      localtime_hour: result?.[`cbid.system.system.localtime_hour`] ?? '',
      localtime_minute: result?.[`cbid.system.system.localtime_minute`] ?? '',
      localtime_second: result?.[`cbid.system.system.localtime_second`] ?? '',
      ntpserver: result?.[`cbid.system.system.ntpserver`] ?? [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload: GetSystemTimeDatePageResult = {
        [`cbid.system.system.hostname`]: String(values.hostname ?? ''),
        [`cbid.system.system.log_size`]: String(values.log_size ?? ''),
        [`cbid.system.system.log_ip`]: String(values.log_ip ?? ''),
        [`cbid.system.system.log_port`]: String(values.log_port ?? ''),
        [`cbid.system.system.conloglevel`]: String(values.conloglevel ?? ''),
        [`cbid.system.system.cronloglevel`]: String(values.cronloglevel ?? ''),
        [`cbid.system.system.zonename`]: String(values.zonename ?? ''),
        [`cbid.system.system.daylight_saving_enable`]: String(
          values.daylight_saving_enable ?? '',
        ),
        [`cbid.system.system.daylight_saving_offset`]: String(
          values.daylight_saving_offset ?? '',
        ),
        [`cbid.system.system.daylight_saving_start_month`]: String(
          values.daylight_saving_start_month ?? '',
        ),
        [`cbid.system.system.daylight_saving_start_week`]: String(
          values.daylight_saving_start_week ?? '',
        ),
        [`cbid.system.system.daylight_saving_start_day_of_week`]: String(
          values.daylight_saving_start_day_of_week ?? '',
        ),
        [`cbid.system.system.daylight_saving_start_time`]: String(
          values.daylight_saving_start_time ?? '',
        ),
        [`cbid.system.system.daylight_saving_end_month`]: String(
          values.daylight_saving_end_month ?? '',
        ),
        [`cbid.system.system.daylight_saving_end_week`]: String(
          values.daylight_saving_end_week ?? '',
        ),
        [`cbid.system.system.daylight_saving_end_day_of_week`]: String(
          values.daylight_saving_end_day_of_week ?? '',
        ),
        [`cbid.system.system.daylight_saving_end_time`]: String(
          values.daylight_saving_end_time ?? '',
        ),
        [`cbid.system.system.clock_mode`]: String(values.clock_mode ?? ''),
        [`cbid.system.system.localtime_year`]: String(
          values.localtime_year ?? '',
        ),
        [`cbid.system.system.localtime_month`]: String(
          values.localtime_month ?? '',
        ),
        [`cbid.system.system.localtime_day`]: String(
          values.localtime_day ?? '',
        ),
        [`cbid.system.system.localtime_hour`]: String(
          values.localtime_hour ?? '',
        ),
        [`cbid.system.system.localtime_minute`]: String(
          values.localtime_minute ?? '',
        ),
        [`cbid.system.system.localtime_second`]: String(
          values.localtime_second ?? '',
        ),
        [`cbid.system.system.ntpserver`]: Array.isArray(values.ntpserver)
          ? values.ntpserver.map((s) => String(s))
          : typeof values.ntpserver === 'string'
            ? values.ntpserver
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
      }
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_SYSTEM_SET_SYSTEM_TIME_DATE_PAGE,
        payload,
      )
    },
  })

  // System Properties
  const zoneOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'zonename',
  )

  // Logging
  const conlogOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'conloglevel',
  )

  const cronlogOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'cronloglevel',
  )

  // Daylight Saving Time
  const daylightSavingEnableOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_enable',
  )
  const daylightSavingOffsetOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_offset',
  )
  const daylightSavingStartMonthOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_start_month',
  )
  const daylightSavingStartWeekOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_start_week',
  )
  const daylightSavingStartDayOfWeekOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_start_day_of_week',
  )
  const daylightSavingStartTimeOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_start_time',
  )
  const daylightSavingEndMonthOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_end_month',
  )
  const daylightSavingEndWeekOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_end_week',
  )
  const daylightSavingEndDayOfWeekOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_end_day_of_week',
  )
  const daylightSavingEndTimeOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'daylight_saving_end_time',
  )

  // Date/Time Setting
  const clockModeOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'clock_mode',
  )
  const localTimeYearOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_year',
  )
  const localTimeMonthOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_month',
  )
  const localTimeDayOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_day',
  )
  const localTimeHourOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_hour',
  )
  const localTimeMinuteOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_minute',
  )
  const localTimeSecondOptions = useOptionsConverter(
    options,
    'cbid.system.system.',
    'localtime_second',
  )

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_SYSTEM_GET_SYSTEM_TIME_DATE_PAGE)
  }, [sendWsGetMessage])

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_SYSTEM_GET_LOCAL_TIME)
  }, [sendWsGetMessage, dataRefresher])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (formik.values.clock_mode === '0') {
        sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_SYSTEM_GET_LOCAL_TIME)
      }
    }, window.__CONFIG__.VITE_DUT_LOCAL_TIME_REPORT_RATE_SECONDS * 1000)

    return () => clearInterval(intervalId)
  }, [formik.values.clock_mode, sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='System'
        subtitle='This section allows you to set up the router date and time settings, change the host name, and configure logging to be sent to an external syslog server for monitoring and troubleshooting.'
      />
      {!data ? (
        <LinearProgress />
      ) : (
        <>
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
              daylightSavingEndDayOfWeekOptions={
                daylightSavingEndDayOfWeekOptions
              }
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
            <Button
              icon='save'
              text='save'
              onClick={() => formik.handleSubmit()}
            />
          </Stack>
        </>
      )}
    </>
  )
}
