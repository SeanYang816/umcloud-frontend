import { Card, CardActions } from '@mui/material'
import { formValidationSchema } from './validationSchema'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { XPB_EVENT_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { CardHeader } from 'components/extends/CardHeader'
import { TextField, Select, Checkbox } from 'components/formik'
import { formikField } from 'utils/formik'
import { StringStringType, Suggest, Options } from 'types'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import {
  AddOneToOneNatField,
  AddOneToOneNATPageRequest,
} from 'types/xpb510/network/firewall'

type FormTypes = {
  suggest: Suggest
  options: Options
  list: StringStringType[]
}

export const AddOneToOneNatForm = ({ suggest, options, list }: FormTypes) => {
  const { sendWsSetMessage } = useSendWsMessage()

  const ifaceList = optionsConverter(options, '_newonenat.iface')
  const priaddrList = optionsConverter(suggest, '_newonenat.priaddr')
  const fwdmodeList = optionsConverter(options, '_newonenat.fwdmode')
  const scheduleList = optionsConverter(options, '_newonenat.schedule')

  const formik = useFormik<AddOneToOneNatField>({
    initialValues: {
      name: '',
      priaddr: '',
      pubaddr: '',
      iface: '',
      fwdmode: '',
      proto: '', // When fwdmode === 'portforward' // 選項沒給所以暫時不顯示欄位
      src_port: '', // When fwdmode === 'portforward'
      dest_port: '', // When fwdmode === 'portforward'
      reflection: '', // When fwdmode === 'portforward'
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

      const payload: AddOneToOneNATPageRequest = {
        'cbi.submit': '1',
        'cbi.sts.firewall.staticnat': '', // WARNING I don't know what to do
        'cbi.cts.firewall.staticnat.': 'Add',
        '_newonenat.name': values.name,
        '_newonenat.priaddr': values.priaddr,
        '_newonenat.pubaddr': values.pubaddr,
        '_newonenat.iface': values.iface,
        ...(isfwdmodePortForward
          ? {
              '_newonenat.proto': values.proto,
              '_newonenat.src_port': values.src_port,
              '_newonenat.dest_port': values.dest_port,
              '_newonenat.reflection': values.reflection,
            }
          : {}),
        '_newonenat.fwdmode': values.fwdmode,
        '_newonenat.schedule': values.schedule,
        ...enabledItems,
      }

      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_FIREWALL_ADD_ONE_TO_ONE_NAT,
        payload,
      )
      resetForm()
    },
  })

  const isfwdmodePortForward = formik.values.fwdmode === 'portforward'

  return (
    <Card>
      <CardHeader title='Add New One-to-One NAT Rule' />
      <StyledCardContent>
        <TextField label='Name' {...formikField(formik, 'name')} />
        <Select
          label='Private IP'
          options={priaddrList}
          {...formikField(formik, 'priaddr')}
        />
        <TextField label='Public IP' {...formikField(formik, 'pubaddr')} />
        <Select
          label='Interface'
          options={ifaceList}
          {...formikField(formik, 'iface')}
        />
        <Select
          label='Forwarding mode'
          options={fwdmodeList}
          {...formikField(formik, 'fwdmode')}
        />
        {isfwdmodePortForward && (
          <>
            {/* DOC: Protocol 選項沒給所以暫時註解 */}
            {/* <Select
              {...selectProps('proto', Protocal:', protoList, formik)}
            /> */}
            <TextField
              label='External Port'
              {...formikField(formik, 'src_port')}
            />
            <TextField
              label='Internal Port'
              {...formikField(formik, 'dest_port')}
            />
            <Checkbox
              label='Enable NAT Loopback'
              {...formikField(formik, 'reflection')}
            />
          </>
        )}
        <Select
          label='External interface'
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
