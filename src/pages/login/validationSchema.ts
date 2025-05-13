import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Username is required')
    .min(1, 'Username must be at least 1 character')
    .max(255, 'Username must be at most 255 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(1, 'Password must be at least 1 character')
    .max(255, 'Password must be at most 255 characters'),
})
