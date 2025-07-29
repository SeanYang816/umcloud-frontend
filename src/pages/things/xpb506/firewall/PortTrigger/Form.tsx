import { Card, CardActions } from '@mui/material'
import { TextField, Select } from 'components/fields'
import { formValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { selectProps, textfieldProps } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type FormTypes = {
  options: OptionsOrSuggestType
  list: StringStringType[]
}

export const Form = ({ options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const ifaceList = optionsConverter(options, '_newfwd.iface')
  const matchProtoList = optionsConverter(options, '_newfwd.match_proto')
  const triggerProtoList = optionsConverter(options, '_newfwd.trigger_proto')
  const scheduleList = optionsConverter(options, '_newfwd.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      iface: '',
      match_proto: '',
      match_port: '',
      trigger_proto: '',
      trigger_port: '',
      schedule: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const enabledItems = list.reduce(
        (result, { key, enabled }) => ({
          ...result,
          [`cbi.sts.firewall.${key}.enabled`]: enabled,
        }),
        {},
      )

      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_PORT_TRIGGER_RULE, {
        '_newfwd.name': values.name,
        '_newfwd.iface': values.iface,
        '_newfwd.match_proto': values.match_proto,
        '_newfwd.match_port': values.match_port,
        '_newfwd.trigger_proto': values.trigger_proto,
        '_newfwd.trigger_port': values.trigger_port,
        '_newfwd.schedule': values.schedule,
        'cbi.cts.firewall.trigger.': 'Add',
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New Port Trigger Rule' />
      <StyledCardContent>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New Port Trigger Name'
        />
        <Select {...selectProps('iface', 'Interface:', ifaceList, formik)} />
        <Select
          {...selectProps(
            'match_proto',
            'Match protocol:',
            matchProtoList,
            formik,
          )}
        />
        <TextField {...textfieldProps('match_port', 'Match port:', formik)} />
        <Select
          {...selectProps(
            'trigger_proto',
            'Trigger protocal:',
            triggerProtoList,
            formik,
          )}
        />
        <TextField
          {...textfieldProps('trigger_port', 'Trigger port:', formik)}
        />
        <Select
          {...selectProps(
            'schedule',
            'External interface:',
            scheduleList,
            formik,
          )}
        />
      </StyledCardContent>
      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.handleSubmit()} />
      </CardActions>
    </Card>
  )
}
