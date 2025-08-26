import { Card, CardActions } from '@mui/material'
import { TextField, Select } from 'components/formik'
import { formValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { formikField } from 'utils/formik'
import { CardHeader } from 'components/extends/CardHeader'
import { Options, StringStringType } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { AddOpenPortsTrafficRulesRequest } from 'types/xpb510/network/firewall'

type FormTypes = {
  options: Options
  list: StringStringType[]
}

type FormValues = {
  name: string
  proto: string
  extport: string
  schedule: string
}

export const PortForm = ({ options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()
  const protoList = optionsConverter(options, '_newopen.proto')
  const scheduleList = optionsConverter(options, '_newopen.schedule')
  const formik = useFormik<FormValues>({
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

      const payload: AddOpenPortsTrafficRulesRequest = {
        'cbi.submit': '1',
        'cbi.sts.firewall.rule': '', // WARNING
        '_newopen.submit': 'Add',
        '_newopen.name': values.name,
        '_newopen.proto': values.proto,
        '_newopen.extport': values.extport,
        '_newopen.schedule': values.schedule,
        ...enabledItems,
      }

      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_OPEN_PORTS_TRAFFIC_RULES,
        payload,
      )
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Open ports on router' />
      <StyledCardContent>
        <TextField label='Name' {...formikField(formik, 'name')} />
        <Select
          label='Protocol'
          options={protoList}
          {...formikField(formik, 'proto')}
        />
        <TextField label='External port' {...formikField(formik, 'extport')} />
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
