import { validation } from 'config'
import * as Yup from 'yup'

const { string } = Yup

export const formValidationSchema = Yup.object().shape({
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  srcip: string(),

  dstip: string(),

  proto: string()
    .required('Protocol is required')
    .oneOf(['all', 'tcp udp', 'tcp', 'udp', 'icmp'], 'Invalid protocol'),

  srcport: string().when(['proto'], {
    is: (proto: string) => ['tcp udp', 'tcp', 'udp'].includes(proto),
    then: () =>
      string().matches(
        validation.listNegPortrange.reg,
        'Invalid port range format',
      ),
  }),

  dstport: string().when(['proto'], {
    is: (proto: string) => ['tcp udp', 'tcp', 'udp'].includes(proto),
    then: () =>
      string().matches(
        validation.listNegPortrange.reg,
        'Invalid port range format',
      ),
  }),

  schedule: string(),
})

export const modalValidationSchema = Yup.object().shape({
  __enabled: string(),
  name: string()
    .required('Name is required')
    .matches(validation.rulename.reg, validation.rulename.error)
    .min(1, 'Name must be at least 1 character')
    .max(32, 'Name must be at most 32 characters'),

  proto: string().required('Protocol is required'),

  src_ip: string().matches(
    validation.negIpaddr.reg,
    'Invalid source address format',
  ),

  src_port: string().matches(
    validation.listNegPort.reg,
    'Invalid port range format',
  ),

  dest_ip: string().matches(
    validation.negIpaddr.reg,
    'Invalid destination address format',
  ),

  dest_port: string().matches(
    validation.listNegPort.reg,
    'Invalid port range format',
  ),

  time_schedule: string(),
})
