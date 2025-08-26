import { Card, InputAdornment } from '@mui/material'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, SelectOptionProps } from 'types'
import { FormikProps } from 'formik'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select, TextField } from 'components/formik'

type LoggingType = {
  title: string
  formik: FormikProps<FormikValuesType>
  conloglevelOptions: SelectOptionProps[]
  cronloglevelOptions: SelectOptionProps[]
}

export const Logging = ({
  title,
  formik,
  conloglevelOptions,
  cronloglevelOptions,
}: LoggingType) => {
  return (
    <Card>
      <CardHeader title={title} />
      <StyledCardContent>
        {/* Log Buffer Size */}
        <TextField
          label='System log buffer size'
          {...formikField(formik, 'log_size')}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position='end'>kiB</InputAdornment>,
            },
          }}
        />
        {/* External System Log Server */}
        <TextField
          label='External system log server'
          {...formikField(formik, 'log_ip')}
          placeholder='0.0.0.0'
        />
        {/* External System Log Server Port */}
        <TextField
          label='External system log server port'
          {...formikField(formik, 'log_port')}
          placeholder='514'
        />
        {/* Log Output Level */}
        <Select
          label='Log output level'
          options={conloglevelOptions}
          {...formikField(formik, 'conloglevel')}
        />
        {/* Cron Log Level */}
        <Select
          label='Cron Log Level'
          options={cronloglevelOptions}
          {...formikField(formik, 'cronloglevel')}
        />
      </StyledCardContent>
    </Card>
  )
}
