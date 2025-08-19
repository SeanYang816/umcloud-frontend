import * as Yup from 'yup'

const { string, number } = Yup

export const dosPreventionValidationSchema = Yup.object().shape({
  tcp_enabled: string().required('Enable is required'),

  tcp_rate: number()
    .integer('Rate must be an integer')
    .min(0, 'Rate must be a positive integer or zero')
    .required('Rate is required'),

  tcp_burst: number()
    .integer('Burst must be an integer')
    .min(0, 'Burst must be a positive integer or zero')
    .required('Burst is required'),

  udp_enabled: string().required('Enable is required'),

  udp_rate: number()
    .integer('Rate must be an integer')
    .min(0, 'Rate must be a positive integer or zero')
    .required('Rate is required'),

  udp_burst: number()
    .integer('Burst must be an integer')
    .min(0, 'Burst must be a positive integer or zero')
    .required('Burst is required'),

  icmp_enabled: string().required('Enable is required'),

  icmp_rate: number()
    .integer('Rate must be an integer')
    .min(0, 'Rate must be a positive integer or zero')
    .required('Rate is required'),

  icmp_burst: number()
    .integer('Burst must be an integer')
    .min(0, 'Burst must be a positive integer or zero')
    .required('Burst is required'),
})
