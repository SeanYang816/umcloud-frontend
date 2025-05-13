import * as Yup from 'yup'

const { string } = Yup

export const formValidationSchema = Yup.object().shape({
  name: string().required(),

  days: string().required(),

  start_time: string().required(),

  end_time: string().required(),
})

export const modalValidationSchema = Yup.object().shape({
  name: string().required(),

  days: string().required(),

  start_time: string().required(),

  end_time: string().required(),
})
