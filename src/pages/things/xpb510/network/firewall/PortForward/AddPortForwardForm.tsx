import React from 'react'
import { useFormik } from 'formik'
import { Card, CardActions } from '@mui/material'
import { formValidationSchema } from './validationSchema'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { optionsConverter } from 'utils/optionsConverter'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { FormikValuesType, StringStringType, Suggest, Options } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { SelectWithCustom } from 'components/formik/SelectWithCustom'
import { Select } from 'components/formik/Select'
import { TextField } from 'components/formik/TextField'

type FormTypes = {
  suggest: Suggest
  options: Options
  list: StringStringType[]
}
export const AddPortForwardForm: React.FC<FormTypes> = ({
  suggest,
  options,
  list,
}) => {
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

      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_PORT_FORWARD_RULE,
        {
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
        },
      )
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New Port Forward Rule' />
      <StyledCardContent>
        <TextField label='Name' {...formikField(formik, 'name')} />

        <Select
          label='Protocol'
          options={protoList}
          {...formikField(formik, 'proto')}
        />
        <Select
          label='External interface'
          options={extifaceList}
          {...formikField(formik, 'extiface')}
        />
        <TextField label='External port' {...formikField(formik, 'extPort')} />

        <SelectWithCustom
          {...formikField(formik, 'intaddr')}
          label='Internal IP address:'
          options={intaddrList}
          triggerValue='-- custom --'
        />

        <TextField label='Internal port' {...formikField(formik, 'intPort')} />

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
