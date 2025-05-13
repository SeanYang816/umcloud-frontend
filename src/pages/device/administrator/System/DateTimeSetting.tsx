import { Card, CardContent, Grid, InputLabel } from '@mui/material'
import { Select as Select, MultiSelect } from 'components/fields'
import { multiSelectProps, selectProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { useStyles } from 'components/fields/index.style'
import { FormikValuesType, SelectOptionProps } from 'types'
import { FormikProps } from 'formik'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type DateTimeSettingType = {
  title: string
  formik: FormikProps<FormikValuesType>
  clockModeOptions: SelectOptionProps[]
  localTimeYearOptions: SelectOptionProps[]
  localTimeMonthOptions: SelectOptionProps[]
  localTimeDayOptions: SelectOptionProps[]
  localTimeHourOptions: SelectOptionProps[]
  localTimeMinuteOptions: SelectOptionProps[]
  localTimeSecondOptions: SelectOptionProps[]
}

export const DateTimeSetting = ({
  title,
  formik,
  clockModeOptions,
  localTimeYearOptions,
  localTimeMonthOptions,
  localTimeDayOptions,
  localTimeHourOptions,
  localTimeMinuteOptions,
  localTimeSecondOptions,
}: DateTimeSettingType) => {
  const isClockMode = formik.values.clock_mode === '0'
  const isNTP = formik.values.clock_mode === '1'

  return (
    <Card>
      <CardHeader title={title} />
      <StyledCardContent>
        <Select
          {...selectProps('clock_mode', 'Clock Mode', clockModeOptions, formik)}
        />
        {isClockMode && (
          <>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Date Settings</InputLabel>
                <Select
                  {...selectProps(
                    'localtime_year',
                    'Year',
                    localTimeYearOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'localtime_month',
                    'Month',
                    localTimeMonthOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'localtime_day',
                    'Day',
                    localTimeDayOptions,
                    formik,
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Time Settings</InputLabel>
                <Select
                  {...selectProps(
                    'localtime_hour',
                    'Hour',
                    localTimeHourOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'localtime_minute',
                    'Minute',
                    localTimeMinuteOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'localtime_second',
                    'Second',
                    localTimeSecondOptions,
                    formik,
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
        {isNTP && (
          <>
            <MultiSelect
              {...multiSelectProps(
                'ntpserver',
                'NTP server candidates',
                [],
                formik,
              )}
              freeSolo
            />
          </>
        )}
      </StyledCardContent>
    </Card>
  )
}
