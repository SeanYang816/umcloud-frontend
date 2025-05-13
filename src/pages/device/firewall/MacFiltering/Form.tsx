import { Card, CardActions, CardContent } from '@mui/material'
import { useStyles } from 'components/fields/index.style'
import { TextField, Select } from 'components/fields'
import { formValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { selectProps, textfieldProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikProps } from 'formik'
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { Button } from 'components/extends/Button'

type FormTypes = {
  parentformik: FormikProps<FormikValuesType>
  suggest: OptionsOrSuggestType
  options: OptionsOrSuggestType
  list: StringStringType[]
}

export const Form = ({ parentformik, suggest, options, list }: FormTypes) => {
  const classes = useStyles()
  const { sendWsSetMessage } = useSendWsMessage()
  const macAddrList = optionsConverter(suggest, '_newmacfilter.mac_addr')
  const scheduleList = optionsConverter(options, '_newmacfilter.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: { name: '', mac_addr: '', schedule: '' },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const enabledItems = list.reduce(
        (result, { key, enabled }) => ({
          ...result,
          [`cbid.firewall.${key}.enabled`]: enabled,
        }),
        {},
      )

      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_MAC_FILTERING_RULE, {
        'cbi.cts.firewall.macfilter.': 'Add',
        'cbid.firewall.mac_filter.enabled': parentformik.values.enabled,
        'cbid.firewall.mac_filter.mode': parentformik.values.mode,
        '_newmacfilter.name': values.name,
        '_newmacfilter.mac_addr': values.mac_addr,
        '_newmacfilter.schedule': values.schedule,
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New MAC Filtering Rule' />
      <CardContent className={classes.fieldWidth}>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New Port Forward Name'
        />
        <Select
          {...selectProps('mac_addr', 'MAC address:', macAddrList, formik)}
        />
        <Select
          {...selectProps(
            'schedule',
            'External interface:',
            scheduleList,
            formik,
          )}
        />
      </CardContent>
      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.handleSubmit()} />
      </CardActions>
    </Card>
  )
}
