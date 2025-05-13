import { Card, CardContent } from '@mui/material'
import { optionsConverter } from 'utils/optionsConverter'
import { Radios, Select } from 'components/fields'
import { CardHeader } from 'components/extends/CardHeader'
import { useStyles } from 'components/fields/index.style'
import { FormikProps } from 'formik'
import { OptionsOrSuggestType, FormikValuesType } from 'types'
import { radiosProps, selectProps } from 'utils/formik'
import { booleanList } from 'config'

type ModeFormType = {
  formik: FormikProps<FormikValuesType>
  options: OptionsOrSuggestType
}

export const ModeForm = ({ formik, options }: ModeFormType) => {
  const classes = useStyles()
  const modeList = optionsConverter(options, 'cbid.firewall.mac_filter.mode')

  return (
    <Card>
      <CardHeader title='MAC Filtering Mode' />
      <CardContent className={classes.fieldWidth}>
        <Select {...selectProps('enabled', 'Enable:', booleanList, formik)} />
        {formik.values.enabled === '1' && (
          <Radios
            {...radiosProps('mode', 'Mode:', modeList, formik)}
            helperText='In allow mode, only allowed MAC Address can access the network'
          />
        )}
      </CardContent>
    </Card>
  )
}
