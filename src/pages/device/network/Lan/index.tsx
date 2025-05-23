import * as Yup from 'yup'
import { Stack } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { DefaultRootStateProps, FormikValuesType } from 'types'
import { CommonConfiguration } from './sections/CommonConfiguration'
import { DHCPServerRelay } from './sections/DHCPServerRelay'
import { StaticLeases } from './sections/StaticLeases'
import { HostEntries } from './sections/HostEntries'
import { StaticArp } from './sections/StaticArp'
import { useSendWsMessage } from 'hooks/useSendWsMessage'
import { useEffect } from 'react'
import { SERVER_ACTIONS } from 'constant'
import { useApiResultObjectToArrayByCommonId } from 'hooks/useApiResultObjectToArrayByCommonId'
import { Button } from 'components/extends/Button'
import { validationSchema } from './validationSchema'
import { PageHeader } from 'components/PageHeader'

type ValidationObjProps = {
  [key: string]: Yup.StringSchema<string>
}

export const Lan = () => {
  const { sendWsGetMessage, sendWsSetMessage } = useSendWsMessage()
  const data = useSelector((state: DefaultRootStateProps) => state.network.lan)
  const statusData = useSelector(
    (state: DefaultRootStateProps) => state.network.lanStatus,
  )
  const { dataRefresher } = useSelector(
    (state: DefaultRootStateProps) => state.config.refetchData,
  )

  const result = data?.result
  const [staticLeasesList] = useApiResultObjectToArrayByCommonId(result, 'host')
  const [hostEntiresList] = useApiResultObjectToArrayByCommonId(
    result,
    'domain',
  )
  const [staticArpList] = useApiResultObjectToArrayByCommonId(result, 'arpbind')

  const formikInitStaticLeasesList = staticLeasesList.reduce(
    (result, { key, name, mac, ip, isvlan }) => ({
      ...result,
      [`staticLeases_${key}_name`]: name ?? '',
      [`staticLeases_${key}_mac`]: mac ?? '',
      [`staticLeases_${key}_ip`]: ip ?? '',
      [`staticLeases_${key}_isvlan`]: isvlan ?? '',
    }),
    {},
  )

  const formikInitHostEntiresList = hostEntiresList.reduce(
    (result, { key, name, ip }) => ({
      ...result,
      [`hostEntires_${key}_name`]: name ?? '',
      [`hostEntires_${key}_ip`]: ip ?? '',
    }),
    {},
  )

  const formikInitStaticArpList = staticArpList.reduce(
    (result, { key, macaddr, ipaddr }) => ({
      ...result,
      [`staticArp_${key}_macaddr`]: macaddr ?? '',
      [`staticArp_${key}_ipaddr`]: ipaddr ?? '',
    }),
    {},
  )

  const hostEntiresValidationObj: ValidationObjProps = {}
  hostEntiresList.forEach((item) => {
    hostEntiresValidationObj[`hostEntires_${item.key}_name`] =
      Yup.string().required('required')
    hostEntiresValidationObj[`hostEntires_${item.key}_ip`] =
      Yup.string().required('required')
  })

  const validationObj = {
    ...validationSchema,
    ...hostEntiresValidationObj,
  }

  const formik = useFormik<FormikValuesType>({
    initialValues: {
      __natmode: result?.['cbid.network.lan.__natmode'] ?? '0',
      proto: result?.['cbid.network.lan.proto'] ?? ' static',
      ipaddr: result?.['cbid.network.lan.ipaddr'] ?? ' 192.168.1.1',
      netmask: result?.['cbid.network.lan.netmask'] ?? ' 255.255.255.0',
      gateway: result?.['cbid.network.lan.gateway'] ?? '',
      dns: result?.['cbid.network.lan.dns'] ?? [],
      macaddr: result?.['cbid.network.lan.macaddr'] ?? '',
      mtu: result?.['cbid.network.lan.mtu'] ?? '',
      metric: result?.['cbid.network.lan.metric'] ?? '',
      delegate: result?.['cbid.network.lan.delegate'] ?? '1',
      auto: result?.['cbid.network.lan.auto'] ?? '1',
      broadcast: result?.['cbid.network.lan.broadcast'] ?? '',
      ip6addr: result?.['cbid.network.lan.ip6addr'] ?? '',
      ip6assign: result?.['cbid.network.lan.ip6assign'] ?? '64',
      ip6gw: result?.['cbid.network.lan.ip6gw'] ?? '',
      ip6hint: result?.['cbid.network.lan.ip6hint'] ?? '',
      ip6prefix: result?.['cbid.network.lan.ip6prefix'] ?? '',
      ignore: result?.['cbid.dhcp.lan.ignore'] ?? '0',
      relay: result?.['cbid.dhcp.lan.relay'] ?? '192.0.2.10',
      start_addr: result?.['cbid.dhcp.lan.start_addr'] ?? '192.168.1.101',
      end_addr: result?.['cbid.dhcp.lan.end_addr'] ?? '192.168.1.199',
      leasetime: result?.['cbid.dhcp.lan.leasetime'] ?? '12h',
      wins: result?.['cbid.dhcp.lan.wins'] ?? '',
      dns1: result?.['cbid.dhcp.lan.dns1'] ?? '',
      dns2: result?.['cbid.dhcp.lan.dns2'] ?? '',
      domain: result?.['cbid.dhcp.lan.domain'] ?? '',
      dynamicdhcp: result?.['cbid.dhcp.lan.dynamicdhcp'] ?? '',
      logqueries: result?.['cbid.dhcp.lan.logqueries'] ?? '0',
      staticLeases: result?.['host'] ?? [],
      hostDomain: result?.['domain'] ?? [],
      staticArp: result?.['arpbind'] ?? [],

      ...formikInitStaticLeasesList,
      ...formikInitHostEntiresList,
      ...formikInitStaticArpList,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape(validationObj),
    onSubmit: () => {
      sendWsSetMessage(SERVER_ACTIONS.LAN_SET_LAN_PAGE, payload)
    },
  })

  const newStaticLeasesList = staticLeasesList.reduce(
    (result, { key }) => ({
      ...result,
      [`cbid.dhcp.${key}.name`]: formik.values[
        `staticLeases_${key}_name`
      ] as string,
      [`cbid.dhcp.${key}.mac`]: formik.values[
        `staticLeases_${key}_mac`
      ] as string,
      [`cbid.dhcp.${key}.ip`]: formik.values[
        `staticLeases_${key}_ip`
      ] as string,
      [`cbid.dhcp.${key}.isvlan`]: formik.values[
        `staticLeases_${key}_isvlan`
      ] as string,
    }),
    {},
  )

  const newHostEntiresList = hostEntiresList.reduce(
    (result, { key }) => ({
      ...result,
      [`cbid.dhcp.${key}.name`]: formik.values[
        `hostEntires_${key}_name`
      ] as string,
      [`cbid.dhcp.${key}.ip`]: formik.values[`hostEntires_${key}_ip`] as string,
    }),
    {},
  )

  const newStaticArpList = staticArpList.reduce(
    (result, { key }) => ({
      ...result,
      [`cbid.arpbind.${key}.macaddr`]: formik.values[
        `staticArp_${key}_macaddr`
      ] as string,
      [`cbid.arpbind.${key}.ipaddr`]: formik.values[
        `staticArp_${key}_ipaddr`
      ] as string,
    }),
    {},
  )

  const payload = {
    'cbid.network.lan.__natmode': formik.values.__natmode,
    'cbid.network.lan.proto': formik.values.proto,
    'cbid.network.lan.ipaddr': formik.values.ipaddr,
    'cbid.network.lan.netmask': formik.values.netmask,
    'cbid.network.lan.gateway': formik.values.gateway,
    'cbid.network.lan.dns': formik.values.dns,
    'cbid.network.lan.macaddr': formik.values.macaddr,
    'cbid.network.lan.mtu': formik.values.mtu,
    'cbid.network.lan.metric': formik.values.metric,
    'cbid.network.lan.delegate': formik.values.delegate,
    'cbid.network.lan.auto': formik.values.auto,
    'cbid.network.lan.broadcast': formik.values.broadcast,
    'cbid.network.lan.ip6addr': formik.values.ip6addr,
    'cbid.network.lan.ip6assign': formik.values.ip6assign,
    'cbid.network.lan.ip6gw': formik.values.ip6gw,
    'cbid.network.lan.ip6hint': formik.values.ip6hint,
    'cbid.network.lan.ip6prefix': formik.values.ip6prefix,
    'cbid.dhcp.lan.ignore': formik.values.ignore,
    'cbid.dhcp.lan.relay': formik.values.relay,
    'cbid.dhcp.lan.start_addr': formik.values.start_addr,
    'cbid.dhcp.lan.end_addr': formik.values.end_addr,
    'cbid.dhcp.lan.leasetime': formik.values.leasetime,
    'cbid.dhcp.lan.wins': formik.values.wins,
    'cbid.dhcp.lan.dns1': formik.values.dns1,
    'cbid.dhcp.lan.dns2': formik.values.dns2,
    'cbid.dhcp.lan.domain': formik.values.domain,
    'cbid.dhcp.lan.dynamicdhcp': formik.values.dynamicdhcp,
    'cbid.dhcp.lan.logqueries': formik.values.logqueries,

    ...newStaticLeasesList,
    ...newHostEntiresList,
    ...newStaticArpList,
  }

  const handleStaticLeasesAdd = () => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_ADD_STATIC_LEASES, {
      ...payload,
      'cbi.cts.dhcp.host.': 'Add',
    })
  }

  const handleStaticLeasesDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_DELETE_STATIC_LEASES, {
      ...payload,
      [`cbi.rts.dhcp.${key}`]: 'Delete',
    })
  }

  const handleHostAdd = () => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_ADD_HOST_ENTRIES, {
      ...payload,
      'cbi.cts.dhcp.domain.': 'Add',
    })
  }

  const handleHostDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_DELETE_HOST_ENTRIES, {
      ...payload,
      [`cbi.rts.dhcp.${key}`]: 'Delete',
    })
  }

  const handleStaticArpAdd = () => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_ADD_STATIC_ARP, {
      ...payload,
      'cbi.cts.arpbind.arpbind.': 'Add',
    })
  }

  const handleStaticArpDelete = (key: string) => {
    sendWsSetMessage(SERVER_ACTIONS.LAN_DELETE_STATIC_ARP, {
      ...payload,
      [`cbi.rts.arpbind.${key}`]: 'Delete',
    })
  }

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.LAN_GET_LAN_PAGE)
  }, [sendWsGetMessage])

  useEffect(() => {
    sendWsGetMessage(SERVER_ACTIONS.LAN_GET_LAN_STATUS)
  }, [sendWsGetMessage, dataRefresher])

  return (
    <>
      <PageHeader
        title='LAN'
        subtitle="This section allows you to modify the router's LAN IP address interface settings. Typically, the router LAN IP address settings do not need to be changed. In addition, this page allows you to configure the router's LAN DHCP server/relay settings or DHCP reservations/static leases which automatically assigns IP addresses to the wired and wireless devices that connect to your router. The router can also function as a name server and allows you to manually enter customized host names to resolve to the IP addresses of devices on your local network."
      />

      <Stack gap={2}>
        <CommonConfiguration
          data={data}
          statusData={statusData}
          formik={formik}
        />

        <DHCPServerRelay data={data} formik={formik} />

        <StaticLeases
          formik={formik}
          list={staticLeasesList}
          onAdd={handleStaticLeasesAdd}
          onDelete={handleStaticLeasesDelete}
        />

        <HostEntries
          formik={formik}
          data={data}
          list={hostEntiresList}
          onAdd={handleHostAdd}
          onDelete={handleHostDelete}
        />

        <StaticArp
          formik={formik}
          list={staticArpList}
          onAdd={handleStaticArpAdd}
          onDelete={handleStaticArpDelete}
        />
      </Stack>

      <Stack direction='row' ml='auto'>
        <Button icon='save' text='save' onClick={() => formik.handleSubmit()} />
      </Stack>
    </>
  )
}
