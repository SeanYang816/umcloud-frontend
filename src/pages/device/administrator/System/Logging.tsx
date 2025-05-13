import { Card, CardContent, InputAdornment } from '@mui/material'
import { useStyles } from 'components/fields/index.style'
import { TextField as TextField, Select as Select } from 'components/fields'
import { selectProps, textfieldProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, SelectOptionProps } from 'types'
import { FormikProps } from 'formik'
import { StyledCardContent } from 'components/extends/StyledCardContent'

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
          {...textfieldProps('log_size', 'System log buffer size', formik)}
          InputProps={{
            endAdornment: <InputAdornment position='end'>kiB</InputAdornment>,
          }}
        />
        {/* External System Log Server */}
        <TextField
          {...textfieldProps('log_ip', 'External system log server', formik)}
          placeholder='0.0.0.0'
        />
        {/* External System Log Server Port */}
        <TextField
          {...textfieldProps(
            'log_port',
            'External system log server port',
            formik,
          )}
          placeholder='514'
        />
        {/* Log Output Level */}
        <Select
          {...selectProps(
            'conloglevel',
            'Log output level',
            conloglevelOptions,
            formik,
          )}
        />
        {/* Cron Log Level */}
        <Select
          {...selectProps(
            'cronloglevel',
            'Cron Log Level',
            cronloglevelOptions,
            formik,
          )}
        />
      </StyledCardContent>
    </Card>
  )
}
