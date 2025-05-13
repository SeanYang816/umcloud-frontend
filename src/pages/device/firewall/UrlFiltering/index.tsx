import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps } from 'types'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { PageHeader } from 'components/PageHeader'
import { Card, CardContent, Stack } from '@mui/material'
import { MultiSelect, Select } from 'components/fields'
import { useFormik } from 'formik'
import { optionsConverter } from 'utils/optionsConverter'
import { CardHeader } from 'components/extends/CardHeader'
import * as Yup from 'yup'
import { multiSelectProps, selectProps } from 'utils/formik'
import { booleanList, validation } from 'config'
import { useStyles } from 'components/fields/index.style'
import { FormikValuesType } from 'types'
import { Button } from 'components/extends/Button'

type PayloadType = {
  'cbid.firewall.urlfilter.enabled': string
  'cbid.firewall.urlfilter.blockurl': object[]
  'cbid.firewall.urlfilter.time_schedule': string
}

enum EnabledTypes {
  Enable = '1',
  Disable = '0',
}

export const UrlFiltering = () => {
  const data = useSelector(
    (state: DefaultRootStateProps) => state.firewall.urlFiltering,
  )
  const result = data?.result ?? {}
  const options = data?.options ?? {}
  const { sendWsGetMessage } = useSendWsMessage()

  const classes = useStyles()
  const { sendWsSetMessage } = useSendWsMessage()
  const rootId = 'cbid.firewall.urlfilter'
  const scheduleList = optionsConverter(options, `${rootId}.time_schedule`)
  const customValidation = (array: string[] | undefined): boolean => {
    if (!Array.isArray(array) || array.length === 0) {
      return true // Allow empty array or non-array values
    }

    return array.every(
      (item) =>
        validation.hostname.reg.test(item) || validation.ip4addr.reg.test(item),
    )
  }

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enabled: result[`${rootId}.enabled`] ?? '0',
      blockurl: result[`${rootId}.blockurl`] ?? [],
      time_schedule: result[`${rootId}.time_schedule`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      enabled: Yup.string(),
      blockurl: Yup.array()
        .test('array-match', validation.hostnameOrIPv4.error, (array) =>
          customValidation(array),
        )
        .required('This field is required'),
    }),
    onSubmit: (values) => {
      const payload: PayloadType = {
        [`${rootId}.enabled`]: values.enabled,
        [`${rootId}.blockurl`]: values.blockurl,
        [`${rootId}.time_schedule`]: values.time_schedule,
      } as PayloadType
      sendWsSetMessage(SERVER_ACTIONS.FIREWALL_SET_URL_FILTERING_PAGE, payload)
    },
  })

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.FIREWALL_GET_URL_FILTERING_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Firewall - URL Filtering'
        subtitle='URL Filtering allows you to add outbound access control rules to specific clients computers or devices on your local network (LAN) & wireless network.'
      />
      <Card>
        <CardHeader title='URL Filtering' />
        <CardContent className={classes.fieldWidth}>
          <Select {...selectProps('enabled', 'Enable:', booleanList, formik)} />
          {formik.values.enabled === EnabledTypes.Enable && (
            <>
              <MultiSelect
                {...multiSelectProps('blockurl', 'Block URL:', [], formik)}
                freeSolo
              />
              <Select
                {...selectProps(
                  'time_schedule',
                  'Schedule:',
                  scheduleList,
                  formik,
                )}
              />
            </>
          )}
        </CardContent>
      </Card>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
