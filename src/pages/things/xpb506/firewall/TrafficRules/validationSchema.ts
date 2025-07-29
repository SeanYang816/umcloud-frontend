import { validation } from 'config'
import { isValidIPv4OrIPv6, isValidPortOrPortrange } from 'utils/validations'
import * as Yup from 'yup'

const { string, array } = Yup

export const formValidationSchema = Yup.object().shape({
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  proto: string().required('Protocol is required'),

  extport: string()
    .required('External port is required')
    .matches(validation.listNegPortrange.reg),

  schedule: string(),
})

export const forwardFormValidationSchema = Yup.object().shape({
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  src: string()
    .required('Source interface is required')
    .oneOf(['lan', 'wan'], 'Source interface must be LAN or WAN1+WAN2'),

  dest: string()
    .required('Destination interface is required')
    .oneOf(['lan', 'wan'], 'Destination interface must be LAN or WAN1+WAN2'),

  schedule: string(),
})

export const modalValidationSchema = Yup.object().shape({
  __enabled: string().required('Rule enabled/disabled status is required'),

  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  family: string(),

  proto: string().required('Protocol is required'),

  icmp_type: array().of(string()).required('ICMP type is required'),

  src: string()
    .required('Source zone is required')
    .oneOf(['*', 'lan', 'wan'], 'Invalid source zone'),

  src_mac: string().matches(validation.macaddr.reg, validation.macaddr.error),

  src_ip: string().test(
    'IPv4OrIPv6-validation',
    validation.IPv4OrIPv6.error,
    isValidIPv4OrIPv6,
  ),

  src_port: string().test(
    'port-validation',
    validation.portOrPortrange.error,
    isValidPortOrPortrange,
  ),

  dest: string().oneOf(['', '*', 'lan', 'wan'], 'Invalid destination zone'),

  dest_ip: string().test(
    'IPv4OrIPv6-validation',
    validation.IPv4OrIPv6.error,
    isValidIPv4OrIPv6,
  ),

  dest_port: string().test(
    'port-validation',
    validation.portOrPortrange.error,
    isValidPortOrPortrange,
  ),

  target: string().required('Action is required'),

  extra: string(), // File says it's required but can be empty

  time_schedule: string(),
})
