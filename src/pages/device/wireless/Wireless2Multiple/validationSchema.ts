import { validation } from 'config'
import * as Yup from 'yup'
import { EncryptionOption } from 'enums'
import { isValidHostnameOrIPv4 } from 'utils/validations'

const { string } = Yup

export const validationSchema = Yup.object().shape({
  disabled: string().required('This field is required'),
  time_schedule: string(),
  ssid: string()
    .required('This field is required')
    .matches(validation.rangeLength32.reg, validation.rangeLength32.error),

  // TODO: I can't find mode on GUI, so I comment this code for now
  // mode: string()
  //   .required('This field is required'),

  hidden: string().required('This field is required'),
  isolate: string().required('This field is required'),
  encryption: string().required('This field is required'),
  cipher: string()
    .when('encryption', {
      is: EncryptionOption.WPA2_Personal,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Personal_Mixed_Mode,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise_Mixed_Mode,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Personal,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Enterprise,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_WPA3_Personal_Mixed_Mode,
      then: () => string().required('This field is required'),
    }),
  _wpa_key: string()
    .when('encryption', {
      is: EncryptionOption.WPA2_Personal,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Personal_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Personal,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_WPA3_Personal_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    }),
  auth_server: string()
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .test(
            'hostnameOrIPv4-validation',
            validation.hostnameOrIPv4.error,
            isValidHostnameOrIPv4,
          ),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .test(
            'hostnameOrIPv4-validation',
            validation.hostnameOrIPv4.error,
            isValidHostnameOrIPv4,
          ),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .test(
            'hostnameOrIPv4-validation',
            validation.hostnameOrIPv4.error,
            isValidHostnameOrIPv4,
          ),
    }),

  auth_port: string()
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    }),

  auth_secret: string()
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA3_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    })
    .when('encryption', {
      is: EncryptionOption.WPA2_Enterprise_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    }),
})
