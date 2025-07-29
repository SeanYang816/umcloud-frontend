import * as Yup from 'yup'

const { boolean, number, array } = Yup

const portRange = () => number().min(1).max(65535)

export const validationSchema = Yup.object().shape({
  lo_iface_en: boolean().required('This field is required'),

  lo_iface: array(),

  lo_http_en: boolean().required('This field is required'),

  lo_http_port: portRange().required('This field is required'),

  lo_https_en: boolean().required('This field is required'),

  lo_https_port: portRange().required('This field is required'),

  lo_telnet_en: boolean().required('This field is required'),

  lo_telnet_port: portRange().required('This field is required'),

  lo_ssh_en: boolean().required('This field is required'),

  lo_ssh_port: portRange().required('This field is required'),

  lo_ssh_pa: boolean().required('This field is required'),

  re_iface_en: boolean().required('This field is required'),

  re_iface: array().required('This field is required'),

  re_http_en: boolean().required('This field is required'),

  re_http_port: portRange().required('This field is required'),

  re_https_en: boolean().required('This field is required'),

  re_https_port: portRange().required('This field is required'),
})
