import { validation } from 'config'
import * as Yup from 'yup'

const { string, boolean } = Yup

export const modeValidationSchema = Yup.object().shape({
  enabled: string().required(),
  mode: boolean().required(),
})

export const formValidationSchema = Yup.object().shape({
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),
  mac_addr: string()
    .required('MAC address is required')
    .matches(validation.macaddr.reg, validation.macaddr.error),
  schedule: string(),
})

export const modalValidationSchema = Yup.object().shape({
  __enabled: boolean(),
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),
  src_mac: string().required('MAC address is required'),
  time_schedule: string(),
})
