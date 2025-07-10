import { Card, CardActions } from '@mui/material'
import { TextField, Select } from 'components/fields'
import { forwardFormValidationSchema } from './validationSchema'
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

export const ForwardForm = ({ options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const srcList = optionsConverter(options, '_newfwd.src')
  const destList = optionsConverter(options, '_newfwd.dest')
  const scheduleList = optionsConverter(options, '_newopen.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      src: '',
      dest: '',
      schedule: '',
    },
    enableReinitialize: true,
    validationSchema: forwardFormValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const keysArray = list.map((item) => item.key)
      const concatenatedKeys = keysArray.join(' ')
      const enabledItems = list.reduce(
        (result, { key, enabled }) => ({
          ...result,
          [`cbid.firewall.${key}.enabled`]: enabled,
        }),
        {},
      )
      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES, {
        'cbi.sts.firewall.rule': concatenatedKeys,
        '_newfwd.name': values.name,
        '_newfwd.src': values.src,
        '_newfwd.dest': values.dest,
        '_newfwd.schedule': values.schedule,
        '_newfwd.submit': 'Add',
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='New forward rule' />
      <StyledCardContent>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New input rule'
        />
        <Select {...selectProps('src', 'Source interface:', srcList, formik)} />
        <Select
          {...selectProps('dest', 'Destination interface:', destList, formik)}
        />
        <Select
          {...selectProps('schedule', 'Schedule:', scheduleList, formik)}
        />
      </StyledCardContent>
      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.handleSubmit()} />
      </CardActions>
    </Card>
  )
}
