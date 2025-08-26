import { XPB_EVENT_ACTIONS } from 'constant'
import { useFormik } from 'formik'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType } from 'types'
import * as Yup from 'yup'
import { Box, Card, Stack } from '@mui/material'
import { CardHeader } from 'components/extends/CardHeader'
import { TextField, Select } from 'components/formik'
import { PageHeader } from 'components/PageHeader'
import { formikField } from 'utils/formik'
import { booleanList, validation } from 'config'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { OverviewForm } from './OverviewForm'
import { NeighborForm } from './NeighborForm'
import { cloneDeep } from 'lodash'
import { Button } from 'components/extends/Button'
import { StyledCardContent } from 'components/extends/StyledCardContent'
import { GetBgpPageResult } from 'types/xpb510/network/routing'

export const Bgp = () => {
  const { sendWsSetMessage, sendWsGetMessage } = useSendWsMessage()
  const rootConfig = 'cbid.bgpd.config'
  const data = useSelector(
    (state: RootStateProps) => state.xpb510.network.routing.bgp,
  )
  const result = data?.result ?? ({} as GetBgpPageResult)
  const options = data?.options ?? {}
  const suggest = data?.suggest ?? {}

  const [overviewList, setOverviewList] = useApiResultObjectToArrayByCommonId(
    result,
    'bgp-interface',
  )
  const [neighborList, setNeighborList] = useApiResultObjectToArrayByCommonId(
    result,
    'neighbor',
  )

  const handleOverviewListUpdate = (
    key: string,
    newValue: string,
    type: string,
  ) => {
    setOverviewList((prevLocalList) => {
      // Use a more descriptive name for newList
      const index = prevLocalList.findIndex((e) => e.key === key)
      const updatedList = [...prevLocalList]
      updatedList[index] = { ...updatedList[index], [type]: newValue }

      return cloneDeep(updatedList)
    })
  }

  const handleNeighborListUpdate = (
    key: string,
    newValue: string,
    type: string,
  ) => {
    setNeighborList((prevLocalList) => {
      // Use a more descriptive name for newList
      const index = prevLocalList.findIndex((e) => e.key === key)
      const updatedList = [...prevLocalList]
      updatedList[index] = { ...updatedList[index], [type]: newValue }

      return cloneDeep(updatedList)
    })
  }

  const overviewItems = overviewList.reduce(
    (result, { key, name, bgp_enable }) => ({
      ...result,
      [`cbid.bgpd.${key}.name`]: name,
      [`cbid.bgpd.${key}.bgp_enable`]: bgp_enable,
    }),
    {},
  )
  const neighborItems = neighborList.reduce(
    (result, { key, remote_as, authentication, neighbor_ip, key_string }) => ({
      ...result,
      [`cbid.bgpd.${key}.remote_as`]: remote_as.toString(),
      [`cbid.bgpd.${key}.authentication`]: authentication,
      [`cbid.bgpd.${key}.neighbor_ip`]: neighbor_ip,
      [`cbid.bgpd.${key}.key_string`]: key_string.toString(),
    }),
    {},
  )

  const sendData = (data: FormikValuesType) => {
    return {
      [`${rootConfig}.enable`]: data.enable,
      [`${rootConfig}.router_id`]: data.router_id,
      [`${rootConfig}.asn`]: data.asn,
      ...overviewItems,
      ...neighborItems,
    }
  }

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      enable: result[`${rootConfig}.enable`] ?? '',
      router_id: result[`${rootConfig}.router_id`] ?? '',
      asn: result[`${rootConfig}.asn`] ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      enable: Yup.string().required('Enable field is required'),
      router_id: Yup.string()
        .required('Router ID field is required')
        .matches(validation.ip4addr.reg, validation.ip4addr.error),
      asn: Yup.string().required('ASN field is required'),
    }),

    onSubmit: (values) => {
      sendWsSetMessage(
        XPB_EVENT_ACTIONS.XPB_510_ROUTING_SET_BGP_PAGE,
        sendData(values),
      )
    },
  })

  const handleAddClick = () => {
    sendWsSetMessage(XPB_EVENT_ACTIONS.XPB_510_ROUTING_ADD_BGP_IPV4_NEIGHBOR, {
      'cbi.cts.bgpd.neighbor.': 'Add',
      ...sendData(formik.values),
    })
  }

  const handleDeleteClick = (key: string) => {
    sendWsSetMessage(
      XPB_EVENT_ACTIONS.XPB_510_ROUTING_DELETE_BGP_IPV4_NEIGHBOR,
      {
        [`cbi.rts.bgpd.${key}`]: 'Delete',
        ...sendData(formik.values),
      },
    )
  }

  useEffect(() => {
    sendWsGetMessage(XPB_EVENT_ACTIONS.XPB_510_ROUTING_GET_BGP_PAGE)
  }, [sendWsGetMessage])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <PageHeader title='BGP' subtitle='BGP (Border Gateway Protocol)' />
      <Card>
        <CardHeader title='BGP Configuration' />

        <StyledCardContent>
          <Select
            label='BGP enable'
            options={booleanList}
            {...formikField(formik, 'enable')}
          />
          <TextField label='Router ID' {...formikField(formik, 'router_id')} />
          <TextField label='ASN' {...formikField(formik, 'asn')} />
        </StyledCardContent>
      </Card>

      <OverviewForm
        options={options}
        overviewList={overviewList}
        onChange={handleOverviewListUpdate}
      />

      <NeighborForm
        neighborList={neighborList}
        suggest={suggest}
        onChange={handleNeighborListUpdate}
        onAdd={handleAddClick}
        onDelete={handleDeleteClick}
      />

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </Box>
  )
}
