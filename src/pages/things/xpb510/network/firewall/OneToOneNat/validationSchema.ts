import { validation } from 'config'
import { isValidHostnameOrIPv4 } from 'utils/validations'
import * as Yup from 'yup'

// Validation rules
const requiredField = (fieldName: string) =>
  Yup.string().required(`${fieldName} is required`)
const portrangeOrIgnore = (fieldName: string) =>
  Yup.string().matches(
    validation.portrangeOrIgnore.reg,
    `${fieldName} is invalid`,
  )

// Form validation schema
export const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  priaddr: requiredField('This field').test(
    'hostnameOrIPv4-validation',
    validation.hostnameOrIPv4.error,
    isValidHostnameOrIPv4,
  ),

  pubaddr: requiredField('This field').test(
    'hostnameOrIPv4-validation',
    validation.hostnameOrIPv4.error,
    isValidHostnameOrIPv4,
  ),

  iface: requiredField('Interface'),

  fwdmode: requiredField('Forwarding mode'),

  proto: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => requiredField('Protocol'),
  }),

  src_port: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => portrangeOrIgnore('External Port'),
  }),

  dest_port: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => portrangeOrIgnore('Internal Port'),
  }),

  reflection: Yup.boolean().when('fwdmode', {
    is: 'portforward',
    then: () => Yup.boolean(),
  }),

  schedule: Yup.string(),
})

// Modal validation schema
export const modalValidationSchema = Yup.object().shape({
  __enabled: Yup.string(),
  name: Yup.string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  dest_ip: requiredField('Private IP').matches(
    validation.negIpaddr.reg,
    'Private IP is invalid',
  ),

  src_ip: requiredField('Public IP').matches(
    validation.negIpaddr.reg,
    'Public IP is invalid',
  ),

  iface: Yup.string(),

  fwdmode: requiredField('Forwarding mode').oneOf(
    ['dmz', 'portforward'],
    'Select a value in options',
  ),

  proto: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => Yup.string(),
  }),

  src_port: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => portrangeOrIgnore('External Port'),
  }),

  dest_port: Yup.string().when('fwdmode', {
    is: 'portforward',
    then: () => portrangeOrIgnore('Internal Port'),
  }),

  reflection: Yup.boolean().when('fwdmode', {
    is: 'portforward',
    then: () => Yup.boolean(),
  }),
})
