import { validation } from 'config'
import { isValidHostnameOrIPv4 } from 'utils/validations'
import * as Yup from 'yup'

const { string, array } = Yup

export const validationSchema = Yup.object().shape({
  hostname: string()
    .matches(validation.hostname.reg, validation.hostname.error)
    .required('Hostname is required'),

  log_size: string()
    .matches(/^[1-9]\d*$/, 'Log size must be a positive integer')
    .required('Log size is required'),

  log_ip: string()
    .test(
      'hostnameOrIPv4-validation',
      validation.hostnameOrIPv4.error,
      isValidHostnameOrIPv4,
    )
    .required('Log IP is required'),

  log_port: string()
    .matches(validation.port.reg, validation.port.error)
    .required('Log Port is required'),

  conloglevel: string().required('Conloglevel is required'),

  cronloglevel: string().required('Cronloglevel is required'),

  zonename: string().required('Zonename is required'),

  daylight_saving_enable: string().required(
    'Daylight Saving Enable is required',
  ),

  daylight_saving_offset: string().required(
    'Daylight Saving Offset is required',
  ),

  daylight_saving_start_month: string().required('Start Month is required'),

  daylight_saving_start_week: string().required('Start Week is required'),

  daylight_saving_start_day_of_week: string().required(
    'Start Day of Week is required',
  ),

  daylight_saving_start_time: string().required('Start Time is required'),

  daylight_saving_end_month: string().required('End Month is required'),

  daylight_saving_end_week: string().required('End Week is required'),

  daylight_saving_end_day_of_week: string().required(
    'End Day of Week is required',
  ),

  daylight_saving_end_time: string().required('End Time is required'),

  clock_mode: string().required('Clock Mode is required'),

  localtime_year: string(),
  localtime_month: string(),
  localtime_day: string(),
  localtime_hour: string(),
  localtime_minute: string(),
  localtime_second: string(),
  ntpserver: array().of(
    string().matches(validation.hostname.reg, validation.hostname.error),
  ),
})
