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
import { FormikValuesType, OptionsOrSuggestType, StringStringType } from 'types'
import { Button } from 'components/extends/Button'

type FormTypes = {
  options: OptionsOrSuggestType
  list: StringStringType[]
}

export const PortForm = ({ options, list }: FormTypes) => {
  const classes = useStyles()
  const { sendWsSetMessage } = useSendWsMessage()
  const protoList = optionsConverter(options, '_newopen.proto')
  const scheduleList = optionsConverter(options, '_newopen.schedule')
  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      proto: 'tcp udp',
      extport: '',
      schedule: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const enabledItems = list.reduce(
        (result, { key, enabled }) => ({
          ...result,
          [`cbid.firewall.${key}.enabled`]: enabled,
        }),
        {},
      )

      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES, {
        '_newopen.name': values.name,
        '_newopen.proto': values.proto,
        '_newopen.extport': values.extport,
        '_newopen.schedule': values.schedule,
        '_newopen.submit': 'Add',
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Open ports on router' />
      <CardContent className={classes.fieldWidth}>
        <TextField {...textfieldProps('name', 'Name:', formik)} />
        <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
        <TextField {...textfieldProps('extport', 'External port:', formik)} />
        <Select
          {...selectProps('schedule', 'Schedule:', scheduleList, formik)}
        />
      </CardContent>
      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.handleSubmit()} />
      </CardActions>
    </Card>
  )
}
