import { Card } from '@mui/material'
import { optionsConverter } from 'utils/optionsConverter'
import { Radios, Select } from 'components/fields'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { OptionsOrSuggestType, FormikValuesType } from 'types'
import { radiosProps, selectProps } from 'utils/formik'
import { booleanList } from 'config'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type ModeFormType = {
  formik: FormikProps<FormikValuesType>
  options: OptionsOrSuggestType
}

export const ModeForm = ({ formik, options }: ModeFormType) => {
  const modeList = optionsConverter(options, 'cbid.firewall.mac_filter.mode')

  return (
    <Card>
      <CardHeader title='MAC Filtering Mode' />
      <StyledCardContent>
        <Select {...selectProps('enabled', 'Enable:', booleanList, formik)} />
        {formik.values.enabled === '1' && (
          <Radios
            {...radiosProps('mode', 'Mode:', modeList, formik)}
            helperText='In allow mode, only allowed MAC Address can access the network'
          />
        )}
      </StyledCardContent>
    </Card>
  )
}
