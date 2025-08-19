import { validation } from 'config'
import {
  isValidHostnameOrIPv4,
  isValidPortOrPortrange,
} from 'utils/validations'
import * as Yup from 'yup'

const { string, bool, array } = Yup

export const formValidationSchema = Yup.object().shape({
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  proto: string(),

  extiface: string(),

  extPort: string()
    .required('This field is required')
    .test(
      'port-validation',
      validation.portOrPortrange.error,
      isValidPortOrPortrange,
    ),

  intaddr: string()
    .required('This field is required')
    .test(
      'hostnameOrIPv4-validation',
      validation.hostnameOrIPv4.error,
      isValidHostnameOrIPv4,
    ),

  intPort: string()
    .required('This field is required')
    .test(
      'port-validation',
      validation.portOrPortrange.error,
      isValidPortOrPortrange,
    ),

  schedule: string(),
})

export const modalValidationSchema = Yup.object().shape({
  __enabled: string(),
  name: string()
    .required('This field is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1)
    .max(32),
  proto: string(),
  src_mac: array().of(
    string().matches(validation.macaddr.reg, validation.macaddr.error),
  ),

  src_ip: string().matches(validation.ip4addr.reg, validation.ip4addr.error),

  src_port: string().test(
    'port-validation',
    validation.portOrPortrange.error,
    isValidPortOrPortrange,
  ),
  src_iface: string(),
  src_dport: string()
    .required('This field is required')
    .test(
      'port-validation',
      validation.portOrPortrange.error,
      isValidPortOrPortrange,
    ),

  dest_ip: string()
    .required('This field is required')
    .matches(validation.ip4addr.reg, validation.ip4addr.error),

  dest_port: string()
    .required('This field is required')
    .test(
      'port-validation',
      validation.portOrPortrange.error,
      isValidPortOrPortrange,
    ),

  reflection: bool(),
  time_schedule: string(),
  src: string(),
  src_dip: string(),
  dest: string(),
  extra: string(),
})
