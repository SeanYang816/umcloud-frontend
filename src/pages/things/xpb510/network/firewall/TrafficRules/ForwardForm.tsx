import { Card, CardActions } from '@mui/material'
import { TextField, Select } from 'components/formik'
import { forwardFormValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { StringStringType, Options } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { FC } from 'react'

type FormTypes = {
  options: Options
  list: StringStringType[]
}

type FormValues = {
  name: string
  src: string
  dest: string
  schedule: string
}

export const ForwardForm: FC<FormTypes> = ({ options, list }) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const srcList = optionsConverter(options, '_newfwd.src')
  const destList = optionsConverter(options, '_newfwd.dest')
  const scheduleList = optionsConverter(options, '_newopen.schedule')

  const formik = useFormik<FormValues>({
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
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_NEW_FORWARD_TRAFFIC_RULES,
        {
          'cbi.sts.firewall.rule': concatenatedKeys,
          '_newfwd.name': values.name,
          '_newfwd.src': values.src,
          '_newfwd.dest': values.dest,
          '_newfwd.schedule': values.schedule,
          '_newfwd.submit': 'Add',
          ...enabledItems,
        },
      )
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='New forward rule' />
      <StyledCardContent>
        <TextField label='Name' {...formikField(formik, 'name')} />
        <Select
          label='Source interface'
          options={srcList}
          {...formikField(formik, 'src')}
        />
        <Select
          label='Destination interface'
          options={destList}
          {...formikField(formik, 'dest')}
        />
        <Select
          label='Schedule'
          options={scheduleList}
          {...formikField(formik, 'schedule')}
        />
      </StyledCardContent>
      <CardActions>
        <Button icon='add' text='add' onClick={() => formik.handleSubmit()} />
      </CardActions>
    </Card>
  )
}
