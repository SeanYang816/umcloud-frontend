import * as Yup from 'yup'
import { validation } from 'config'
import { isValidPortOrPortrange } from 'utils/validations'

const { string } = Yup

const portrangeValidationSchema = string()
  .required('This field is required')
  .test(
    'port-validation',
    validation.portOrPortrange.error,
    isValidPortOrPortrange,
  )

const commonFieldProps = {
  name: string()
    .required('This field is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),
  iface: string().required('This field is required'),
  match_proto: string().required('This field is required'),
  match_port: portrangeValidationSchema,
  trigger_proto: string().required('This field is required'),
  trigger_port: portrangeValidationSchema,
}

export const formValidationSchema = Yup.object().shape({
  ...commonFieldProps,
  schedule: string(),
})

export const modalValidationSchema = Yup.object().shape({
  __enabled: string(),
  ...commonFieldProps,
  time_schedule: string(),
})
