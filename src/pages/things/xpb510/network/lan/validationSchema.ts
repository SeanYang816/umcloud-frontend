import { validation } from 'config'
import { isValidHostnameOrIPv4 } from 'utils/validations'
import * as Yup from 'yup'

const { string } = Yup

export const validationSchema = {
  __natmode: string().required('This field is required'),
  // proto: string()
  //   .required('This field is required'),
  ipaddr: string()
    .required('This field is required')
    .matches(validation.ip4addr.reg, validation.ip4addr.error),
  netmask: string()
    .required('This field is required')
    .matches(validation.ip4addr.reg, validation.ip4addr.error),
  // gateway: string()
  //   .required('This field is required'),
  // dns: string()
  //   .required('This field is required'),
  macaddr: string()
    // .required('This field is required')
    .matches(validation.macaddr.reg, validation.macaddr.error),
  mtu: string()
    // .required('This field is required')
    .matches(validation.smallerThan9200.reg, validation.smallerThan9200.error),
  // metric: string()
  //   .required('This field is required'),
  // delegate: string()
  //   .required('This field is required'),
  // auto: string()
  //   .required('This field is required'),
  // broadcast: string()
  //   .required('This field is required'),
  // ip6addr: string()
  //   .required('This field is required'),
  // ip6assign: string()
  //   .required('This field is required'),
  // ip6gw: string()
  //   .required('This field is required'),
  // ip6hint: string()
  //   .required('This field is required'),
  // ip6prefix: string()
  //   .required('This field is required'),
  ignore: string().required('This field is required'),
  relay: string().required('This field is required'),
  start_addr: string()
    .required('This field is required')
    .matches(validation.ip4addr.reg, validation.ip4addr.error),
  end_addr: string()
    .required('This field is required')
    .matches(validation.ip4addr.reg, validation.ip4addr.error),
  leasetime: string()
    .required('This field is required')
    .matches(validation.minLength2.reg, validation.minLength2.error),

  // 已下四項 wins dns1 dns2 domain，文件雖顯示為 required，但因需要可帶空值，所以把 required 驗證拿掉
  wins: string().when('ignore', {
    is: '0',
    then: () =>
      string().matches(validation.ip4addr.reg, validation.ip4addr.error),
  }),
  dns1: string().when('ignore', {
    is: '0',
    then: () =>
      string().matches(validation.ip4addr.reg, validation.ip4addr.error),
  }),
  dns2: string().when('ignore', {
    is: '0',
    then: () =>
      string().matches(validation.ip4addr.reg, validation.ip4addr.error),
  }),
  domain: string().when('ignore', {
    is: '0',
    then: () =>
      string().test(
        'hostnameOrIPv4-validation',
        validation.hostnameOrIPv4.error,
        isValidHostnameOrIPv4,
      ),
  }),
  dynamicdhcp: string().required('This field is required'),
  logqueries: string().required('This field is required'),
}
