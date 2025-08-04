import * as Yup from 'yup'
import { SERVER_ACTIONS } from 'constant'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps, FormikValuesType, StringStringType } from 'types'
import { PageHeader } from 'components/PageHeader'
import { MRT_ColumnDef } from 'material-react-table'
import { DeleteButton } from 'components/DeleteButton'
import { StyledMuiReactTable } from 'components/StyledMuiReactTable'
import { optionsConverter } from 'utils/optionsConverter'
import { Box, Stack, Tooltip } from '@mui/material'
import { TextField, Select } from 'components/fields'
import { validation } from 'config'
import { isEmpty } from 'lodash'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { Button } from 'components/extends/Button'
import { useFormik } from 'formik'

type ValidationObjProps = {
  [key: string]: Yup.StringSchema<string>
}

export const StaticRoutes = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()

  const { options, result } = useSelector(
    (state: RootStateProps) => state.bgw5105.routing.staticRoutes,
  )

  const [list] = useApiResultObjectToArrayByCommonId(result, 'route')

  const formikInitList = list.reduce(
    (result, { key, target, gateway, master_interface, netmask, metric }) => ({
      ...result,
      [`${key}_target`]: target ?? '',
      [`${key}_gateway`]: gateway ?? '',
      [`${key}_master_interface`]: master_interface ?? '',
      [`${key}_netmask`]: netmask ?? '',
      [`${key}_metric`]: metric ?? '',
    }),
    {},
  )

  const validationObj: ValidationObjProps = {}
  list.forEach((item) => {
    validationObj[`${item.key}_target`] = Yup.string().required('required')
  })

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      ...formikInitList,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape(validationObj),
    onSubmit: () => {
      sendWsSetMessage(SERVER_ACTIONS.ROUTING_SET_STATIC_ROUTES_PAGE, {
        ...payload,
      })
    },
  })

  const payload = list.reduce(
    (result, { key }) => ({
      ...result,
      [`cbid.network.${key}.target`]: formik.values[`${key}_target`] as string,
      [`cbid.network.${key}.gateway`]: formik.values[
        `${key}_gateway`
      ] as string,
      [`cbid.network.${key}.master_interface`]: formik.values[
        `${key}_master_interface`
      ] as string,
      [`cbid.network.${key}.netmask`]: formik.values[
        `${key}_netmask`
      ] as string,
      [`cbid.network.${key}.metric`]: formik.values[`${key}_metric`] as string,
    }),
    {},
  )

  const onDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.ROUTING_DELETE_STATIC_IPV4_ROUTES, {
      [`cbi.rts.network.${key}`]: 'Delete',
      ...payload,
    })
  }

  const handleAddClick = () => {
    sendWsSetMessage(SERVER_ACTIONS.ROUTING_ADD_STATIC_IPV4_ROUTES, {
      'cbi.cts.network.route.': 'Add',
      ...payload,
    })
  }

  const columns: MRT_ColumnDef<StringStringType>[] = [
    {
      header: 'Interface',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string

        return (
          <Select
            {...formik.getFieldProps(`${key}_master_interface`)}
            options={optionsConverter(
              options,
              `cbid.network.${key}.master_interface`,
            )}
          />
        )
      },
      size: 150,
    },
    {
      header: 'Target Host-IP or Network',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`${key}_target`] as string

        return (
          <TextField
            {...formik.getFieldProps(`${key}_target`)}
            errorMessage={
              formik.touched[`${key}_target`] &&
              !validation.ip4addr.reg.test(value)
                ? validation.ip4addr.error
                : false
            }
          />
        )
      },
      size: 150,
      Header: () => (
        <Box>
          Target
          <br />
          Host-
          <Tooltip title='Internet Protocol Address'>
            <Box
              component='span'
              sx={{
                borderBottom: (theme) =>
                  `1px ${theme.palette.primary.main} solid`,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              IP
            </Box>
          </Tooltip>
          &nbsp;or Network
        </Box>
      ),
    },
    {
      header: 'IPv4-Netmask',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`${key}_netmask`] as string

        return (
          <TextField
            placeholder='255.255.255.255'
            {...formik.getFieldProps(`${key}_netmask`)}
            errorMessage={
              formik.touched[`${key}_netmask`] &&
              !isEmpty(value) &&
              !validation.ip4addr.reg.test(value)
                ? validation.ip4addr.error
                : false
            }
          />
        )
      },
      size: 150,
      Header: () => (
        <Box>
          <Tooltip title='Internet Protocol Version 4'>
            <Box
              component='span'
              sx={{
                borderBottom: (theme) =>
                  `1px ${theme.palette.primary.main} solid`,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              IPv4
            </Box>
          </Tooltip>
          -Netmask
        </Box>
      ),
    },
    {
      header: 'IPv4-Gateway',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`${key}_gateway`] as string

        return (
          <TextField
            {...formik.getFieldProps(`${key}_gateway`)}
            errorMessage={
              !isEmpty(value) && !validation.ip4addr.reg.test(value)
                ? validation.ip4addr.error
                : false
            }
          />
        )
      },
      size: 150,
      Header: () => (
        <Box>
          <Tooltip title='Internet Protocol Version 4'>
            <Box
              component='span'
              sx={{
                borderBottom: (theme) =>
                  `1px ${theme.palette.primary.main} solid`,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              IPv4
            </Box>
          </Tooltip>
          -Gateway
        </Box>
      ),
    },
    {
      header: 'Metric',
      accessorFn: (row) => row.key,
      Cell: ({ renderedCellValue }) => {
        const key = renderedCellValue as string
        const value = formik.values[`${key}_metric`] as string

        return (
          <TextField
            placeholder='0'
            {...formik.getFieldProps(`${key}_metric`)}
            errorMessage={
              !isEmpty(value) && !validation.limitTo255.reg.test(value)
                ? validation.limitTo255.error
                : false
            }
          />
        )
      },
      size: 150,
    },
    {
      accessorKey: '編輯',
      header: '',
      size: 150,
      Cell: ({ row }) => (
        <DeleteButton id={row.original.key} onDelete={onDelete} />
      ),
    },
  ]

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.ROUTING_GET_STATIC_ROUTES_PAGE)
  }, [sendWsGetMessage])

  return (
    <>
      <PageHeader
        title='Routes'
        subtitle='Static routes can be configured to allow your router to allow communication between your local IP networks and other IP networks located on neighboring routers.'
      />
      <StyledMuiReactTable
        title='Static IPv4 Routes'
        rows={list}
        columns={columns}
        onAdd={handleAddClick}
      />

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
