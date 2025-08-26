import { Card, Grid, InputLabel } from '@mui/material'
import { Select, MultiSelect } from 'components/formik'
import { formikArrayField, formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
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
          label='Clock Mode'
          options={clockModeOptions}
          {...formikField(formik, 'clock_mode')}
        />
        {isClockMode && (
          <>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Date Settings</InputLabel>
                <Select
                  label='Year'
                  options={localTimeYearOptions}
                  {...formikField(formik, 'localtime_year')}
                />
                <Select
                  label='Month'
                  options={localTimeMonthOptions}
                  {...formikField(formik, 'localtime_month')}
                />
                <Select
                  label='Day'
                  options={localTimeDayOptions}
                  {...formikField(formik, 'localtime_day')}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Time Settings</InputLabel>
                <Select
                  label='Hour'
                  options={localTimeHourOptions}
                  {...formikField(formik, 'localtime_hour')}
                />
                <Select
                  label='Minute'
                  options={localTimeMinuteOptions}
                  {...formikField(formik, 'localtime_minute')}
                />
                <Select
                  label='Second'
                  options={localTimeSecondOptions}
                  {...formikField(formik, 'localtime_second')}
                />
              </Grid>
            </Grid>
          </>
        )}
        {isNTP && (
          <>
            <MultiSelect
              label='NTP server candidates'
              options={[]}
              {...formikArrayField(formik, 'ntpserver')}
              freeSolo
            />
          </>
        )}
      </StyledCardContent>
    </Card>
  )
}
