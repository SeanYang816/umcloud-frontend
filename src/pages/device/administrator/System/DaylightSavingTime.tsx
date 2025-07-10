import { Card, Grid, InputLabel } from '@mui/material'
import { Select as Select } from 'components/fields'
import { selectProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { FormikValuesType, SelectOptionProps } from 'types'
import { StyledCardContent } from 'components/extends/StyledCardContent'

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
          {...selectProps(
            'daylight_saving_enable',
            'Daylight Saving Enable',
            daylightSavingEnableOptions,
            formik,
          )}
        />
        {isModeEnable && (
          <>
            <Select
              {...selectProps(
                'daylight_saving_offset',
                'Daylight Saving Enable',
                daylightSavingOffsetOptions,
                formik,
              )}
            />
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Daylight Saving Start</InputLabel>
                <Select
                  {...selectProps(
                    'daylight_saving_start_month',
                    'Month',
                    daylightSavingStartMonthOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_start_week',
                    'Week',
                    daylightSavingStartWeekOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_start_day_of_week',
                    'Day of Week',
                    daylightSavingStartDayOfWeekOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_start_time',
                    'Hour ',
                    daylightSavingStartTimeOptions,
                    formik,
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid display='flex' alignItems='center' gap={2}>
                <InputLabel>Daylight Saving End</InputLabel>
                <Select
                  {...selectProps(
                    'daylight_saving_end_month',
                    'Month',
                    daylightSavingEndMonthOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_end_week',
                    'Week',
                    daylightSavingEndWeekOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_end_day_of_week',
                    'Day of Week',
                    daylightSavingEndDayOfWeekOptions,
                    formik,
                  )}
                />
                <Select
                  {...selectProps(
                    'daylight_saving_end_time',
                    'Hour ',
                    daylightSavingEndTimeOptions,
                    formik,
                  )}
                />
              </Grid>
            </Grid>
          </>
        )}
      </StyledCardContent>
    </Card>
  )
}
