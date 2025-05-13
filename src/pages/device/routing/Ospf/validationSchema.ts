import * as Yup from 'yup'

const { string, number, boolean } = Yup

export const modalValidationSchema = Yup.object().shape({
  ospf_enable: string().required('Please provide an input.'),
  network_type: string().required('Please provide an input.'),
  authentication: boolean().required('Please provide an input.'),
  key_string: string().required('Please provide an input.'),
  key_mode: boolean().required('Please provide an input.'),
  cost: number()
    .positive('Value must be a positive number')
    .integer('Value must be an integer')
    .min(1, 'Value must be greater than or equal to 1')
    .max(65535, 'Value must be less than or equal to 65535')
    .required('Please provide an input.'),
  priority: number()
    .positive('Value must be a positive number')
    .integer('Value must be an integer')
    .min(0, 'Value must be greater than or equal to 0')
    .max(255, 'Value must be less than or equal to 255')
    .required('Please provide an input.'),
  area: number()
    .positive('Value must be a positive number')
    .integer('Value must be an integer')
    .min(0, 'Value must be greater than or equal to 0')
    .max(4294967295, 'Value must be less than or equal to 4294967295')
    .required('Please provide an input.'),
})
