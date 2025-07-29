import * as Yup from 'yup'

const { string, boolean } = Yup

export const modalValidationSchema = Yup.object().shape({
  rip_enable: string().required('RIP Enable is required'),
  send_version: string().required('Send Version is required'),
  receive_version: string().required('Receive Version is required'),
  authentication: boolean().required('Authentication is required'),
  key_string: string().required('Key String is required'),
  key_mode: boolean().required('Key Mode is required'),
})
