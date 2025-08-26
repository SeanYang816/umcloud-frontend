import { Card } from '@mui/material'
import { DisplayField } from 'components/fields'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { FormikValuesType, SelectOptionProps } from 'types'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { Select, TextField } from 'components/formik'

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
          <TextField label='Hostname' {...formikField(formik, 'hostname')} />
          {/* Timezone */}
          <Select
            label='Timezone'
            options={zoneOptions}
            {...formikField(formik, 'zonename')}
          />
        </StyledCardContent>
      </Card>
    </>
  )
}
