import { Card, CardActions } from '@mui/material'
import { formValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { CUSTOM_OPTION, BGW_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { CardHeader } from 'components/extends/CardHeader'
import { TextField, Select, Checkbox } from 'components/fields'
import { checkboxProps, selectProps, textfieldProps } from 'utils/formik'
import { boolToStrNum, strNumToBool } from 'utils'
import { FormikValuesType, StringStringType, OptionsOrSuggestType } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'

type FormTypes = {
  suggest: OptionsOrSuggestType
  options: OptionsOrSuggestType
  list: StringStringType[]
}

export const Form = ({ suggest, options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const ifaceList = optionsConverter(options, '_newonenat.iface')
  const priaddrList = optionsConverter(suggest, '_newonenat.priaddr')
  const fwdmodeList = optionsConverter(options, '_newonenat.fwdmode')
  const scheduleList = optionsConverter(options, '_newonenat.schedule')

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      name: '',
      priaddr: '',
      priaddrText: '',
      pubaddr: '',
      iface: '',
      fwdmode: '',
      proto: 'tcpudp', // When fwdmode === 'portforward' // 選項沒給所以暫時不顯示欄位
      src_port: '', // When fwdmode === 'portforward'
      dest_port: '', // When fwdmode === 'portforward'
      reflection: strNumToBool('1'), // When fwdmode === 'portforward'
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

      sendWsSetMessage(BGW_EVENT_ACTIONS.FIREWALL_ADD_ONE_TO_ONE_NAT, {
        'cbi.cts.firewall.staticnat.': 'Add',
        '_newonenat.name': values.name,
        '_newonenat.priaddr':
          values.priaddr === CUSTOM_OPTION
            ? values.priaddrText
            : values.priaddr,
        '_newonenat.pubaddr': values.pubaddr,
        '_newonenat.iface': values.iface,
        ...(isfwdmodePortForward
          ? {
              '_newonenat.proto': values.proto,
              '_newonenat.src_port': values.src_port,
              '_newonenat.dest_port': values.dest_port,
              '_newonenat.reflection': boolToStrNum(!!values.reflection),
            }
          : {}),
        '_newonenat.fwdmode': values.fwdmode,
        '_newonenat.schedule': values.schedule,
        ...enabledItems,
      })
      resetForm()
    },
  })

  const isfwdmodePortForward = formik.values.fwdmode === 'portforward'

  return (
    <Card>
      <CardHeader title='Add New One-to-One NAT Rule' />
      <StyledCardContent>
        <TextField
          {...textfieldProps('name', 'Name:', formik)}
          placeholder='New One-to-One NAT Name'
        />
        <Select
          {...selectProps('priaddr', 'Privete IP:', priaddrList, formik)}
        />
        <TextField {...textfieldProps('pubaddr', 'Public IP:', formik)} />
        <Select {...selectProps('iface', 'Interface:', ifaceList, formik)} />
        <Select
          {...selectProps('fwdmode', 'Forwarding mode:', fwdmodeList, formik)}
        />
        {isfwdmodePortForward && (
          <>
            {/* DOC: Protocol 選項沒給所以暫時註解 */}
            {/* <Select
              {...selectProps('proto', Protocal:', protoList, formik)}
            /> */}
            <TextField
              {...textfieldProps('src_port', 'External Port:', formik)}
            />
            <TextField
              {...textfieldProps('dest_port', 'Internal Port:', formik)}
            />
            <Checkbox
              {...checkboxProps('reflection', 'Enable NAT Loopback:', formik)}
            />
          </>
        )}
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
