import { Card, CardContent } from '@mui/material'
import { useStyles } from 'components/fields/index.style'
import {
  TextField as TextField,
  Select as Select,
  DisplayField,
} from 'components/fields'
import { selectProps, textfieldProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { FormikValuesType, SelectOptionProps } from 'types'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type SystemPropertiesType = {
  title: string
  formik: FormikProps<FormikValuesType>
  localTime: string
  zoneOptions: SelectOptionProps[]
}

export const SystemProperties = ({
  title,
  formik,
  localTime,
  zoneOptions,
}: SystemPropertiesType) => {
  return (
    <>
      <Card>
        <CardHeader title={title} />
        <StyledCardContent>
          {/* Local Time */}
          <DisplayField label='Local Time' text={localTime} />
          {/* Hostname */}
          <TextField {...textfieldProps('hostname', 'Hostname', formik)} />
          {/* Timezone */}
          <Select
            {...selectProps('zonename', 'Timezone', zoneOptions, formik)}
          />
        </StyledCardContent>
      </Card>
    </>
  )
}
