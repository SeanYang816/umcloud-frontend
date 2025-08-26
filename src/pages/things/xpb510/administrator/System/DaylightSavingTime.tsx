import { Card, Grid, InputLabel } from '@mui/material'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { FormikValuesType, SelectOptionProps } from 'types'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select } from 'components/formik'

type DaylightSavingTimeType = {
  title: string
  formik: FormikProps<FormikValuesType>
  daylightSavingEnableOptions: SelectOptionProps[]
  daylightSavingOffsetOptions: SelectOptionProps[]
  daylightSavingStartMonthOptions: SelectOptionProps[]
  daylightSavingStartWeekOptions: SelectOptionProps[]
  daylightSavingStartDayOfWeekOptions: SelectOptionProps[]
  daylightSavingStartTimeOptions: SelectOptionProps[]
  daylightSavingEndMonthOptions: SelectOptionProps[]
  daylightSavingEndWeekOptions: SelectOptionProps[]
  daylightSavingEndDayOfWeekOptions: SelectOptionProps[]
  daylightSavingEndTimeOptions: SelectOptionProps[]
}

export const DaylightSavingTime = ({
  title,
  formik,
  daylightSavingEnableOptions,
  daylightSavingOffsetOptions,
  daylightSavingStartMonthOptions,
  daylightSavingStartWeekOptions,
  daylightSavingStartDayOfWeekOptions,
  daylightSavingStartTimeOptions,
  daylightSavingEndMonthOptions,
  daylightSavingEndWeekOptions,
  daylightSavingEndDayOfWeekOptions,
  daylightSavingEndTimeOptions,
}: DaylightSavingTimeType) => {
  const isModeEnable = formik.values.daylight_saving_enable === '1'

  return (
    <Card>
      <CardHeader title={title} />
      <StyledCardContent>
        <Select
          label='Daylight Saving Enable'
          options={daylightSavingEnableOptions}
          {...formikField(formik, 'daylight_saving_enable')}
        />
        {isModeEnable && (
          <>
            <Select
              label='Daylight Saving Enable'
              options={daylightSavingOffsetOptions}
              {...formikField(formik, 'daylight_saving_offset')}
            />
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel sx={{ overflow: 'visible' }}>
                  Daylight Saving Start
                </InputLabel>
                <Select
                  label='Month'
                  options={daylightSavingStartMonthOptions}
                  {...formikField(formik, 'daylight_saving_start_month')}
                />
                <Select
                  label='Week'
                  options={daylightSavingStartWeekOptions}
                  {...formikField(formik, 'daylight_saving_start_week')}
                />
                <Select
                  label='Day of Week'
                  options={daylightSavingStartDayOfWeekOptions}
                  {...formikField(formik, 'daylight_saving_start_day_of_week')}
                />
                <Select
                  label='Hour'
                  options={daylightSavingStartTimeOptions}
                  {...formikField(formik, 'daylight_saving_start_time')}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel sx={{ overflow: 'visible' }}>
                  Daylight Saving End
                </InputLabel>
                <Select
                  label='Month'
                  options={daylightSavingEndMonthOptions}
                  {...formikField(formik, 'daylight_saving_end_month')}
                />
                <Select
                  label='Week'
                  options={daylightSavingEndWeekOptions}
                  {...formikField(formik, 'daylight_saving_end_week')}
                />
                <Select
                  label='Day of Week'
                  options={daylightSavingEndDayOfWeekOptions}
                  {...formikField(formik, 'daylight_saving_end_day_of_week')}
                />
                <Select
                  label='Hour'
                  options={daylightSavingEndTimeOptions}
                  {...formikField(formik, 'daylight_saving_end_time')}
                />
              </Grid>
            </Grid>
          </>
        )}
      </StyledCardContent>
    </Card>
  )
}
