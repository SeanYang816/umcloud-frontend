import React from 'react'
import { useFormik } from 'formik'
import { Card, CardActions } from '@mui/material'
import { formValidationSchema } from './validationSchema'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { TextField, Select } from 'components/fields'
import { optionsConverter } from 'utils/optionsConverter'
import {
  handleSelectInputChange,
  selectProps,
  textfieldProps,
} from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type FormTypes = {
  suggest: OptionsOrSuggestType
  options: OptionsOrSuggestType
  list: StringStringType[]
}
export const Form: React.FC<FormTypes> = ({ suggest, options, list }) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const protoList = optionsConverter(options, '_newfwd.proto')
  const extifaceList = optionsConverter(options, '_newfwd.extiface')
  const intaddrList = optionsConverter(suggest, '_newfwd.intaddr')
  const scheduleList = optionsConverter(options, '_newfwd.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      proto: 'tcp udp',
      extiface: 'wan',
      extPort: '',
      intaddr: '',
      intaddrText: '',
      intPort: '',
      schedule: '',
    },
    validationSchema: formValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const enabledItems = list.reduce(
        (result, { key, enabled }) => ({
          ...result,
          [`cbid.firewall.${key}.enabled`]: enabled,
        }),
        {},
      )

      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_PORT_FORWARD_RULE, {
        '_newfwd.name': values.name,
        '_newfwd.proto': values.proto,
        '_newfwd.extzone': 'wan', // no show
        '_newfwd.extiface': values.extiface,
        '_newfwd.extport': values.extPort,
        '_newfwd.intzone': 'lan', // no show
        '_newfwd.intaddr': values.intaddr,
        '_newfwd.intport': values.intPort,
        '_newfwd.schedule': values.schedule,
        'cbi.cts.firewall.portforward.': 'Add',
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New Port Forward Rule' />
      <StyledCardContent>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New Port Forward Name'
        />
        <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
        <Select
          {...selectProps(
            'extiface',
            'External interface:',
            extifaceList,
            formik,
          )}
        />
        <TextField {...textfieldProps('extPort', 'External port:', formik)} />
        <Select
          {...selectProps(
            'intaddr',
            'Internal IP address:',
            intaddrList,
            formik,
          )}
          onChange={(e) => handleSelectInputChange(e, formik)}
        />
        <TextField {...textfieldProps('intPort', 'Internal port:', formik)} />
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
