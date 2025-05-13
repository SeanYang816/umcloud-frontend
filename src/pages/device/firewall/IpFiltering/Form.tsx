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
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type FormTypes = {
  suggest: OptionsOrSuggestType
  options: OptionsOrSuggestType
  list: StringStringType[]
}

enum ProtoOptionTypes {
  All = 'all',
  Tcp_Udp = 'tcp udp',
  Tcp = 'tcp',
  Udp = 'udp',
  Icmp = 'Icmp',
}

export const Form = ({ suggest, options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const srcIpList = optionsConverter(suggest, '_newipfilter.srcip')
  const protoList = optionsConverter(options, '_newipfilter.proto')
  const scheduleList = optionsConverter(options, '_newipfilter.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      srcip: '',
      dstip: '',
      proto: '',
      srcport: '',
      dstport: '',
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

      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_ADD_IP_FILTERING_RULE, {
        '_newipfilter.submit': 'Add',
        '_newipfilter.name': values.name,
        '_newipfilter.srcip': values.srcip,
        '_newipfilter.dstip': values.dstip,
        '_newipfilter.proto': values.proto,
        '_newipfilter.srcport': values.srcport,
        '_newipfilter.dstport': values.dstport,
        '_newipfilter.schedule': values.schedule,
        ...enabledItems,
      })
      resetForm()
    },
  })

  return (
    <Card>
      <CardHeader title='Add New IP Filtering Rule' />
      <StyledCardContent>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New IP Filtering Name'
        />
        <Select {...selectProps('srcip', 'Source IP:', srcIpList, formik)} />
        <TextField {...textfieldProps('dstip', 'Destination IP:', formik)} />
        <Select {...selectProps('proto', 'Protocol:', protoList, formik)} />
        {(formik.values.proto === ProtoOptionTypes.Tcp_Udp ||
          formik.values.proto === ProtoOptionTypes.Tcp ||
          formik.values.proto === ProtoOptionTypes.Udp) && (
          <>
            <TextField {...textfieldProps('srcport', 'Source port:', formik)} />
          </>
        )}
        {(formik.values.proto === ProtoOptionTypes.Tcp_Udp ||
          formik.values.proto === ProtoOptionTypes.Tcp ||
          formik.values.proto === ProtoOptionTypes.Udp) && (
          <>
            <TextField
              {...textfieldProps('dstport', 'Destination port:', formik)}
            />
          </>
        )}
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
