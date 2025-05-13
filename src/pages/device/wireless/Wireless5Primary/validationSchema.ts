import { validation } from 'config'
import * as Yup from 'yup'
import { EncryptionOptionTypes, MacfilterOptionTypes } from 'enums'
import { isValidHostnameOrIPv4 } from 'utils/validations'

const { string, array } = Yup

export const validationSchema = Yup.object().shape({
  hwmode: string().required('This field is required'),
  htmode: string().required('This field is required'),
  channel: string().required('This field is required'),
  ssid: string()
    .required('This field is required')
    .matches(validation.rangeLength32.reg, validation.rangeLength32.error),
  bssid: string(), // TODO: if I add required, the request will not be send
  // .required('This field is required'),
  mode: string().required('This field is required'),
  network: string().required('This field is required'),
  hidden: string().required('This field is required'),
  macfilter: string(),
  maclist: array()
    .when('macfilter', {
      is: MacfilterOptionTypes.Allow_listed_only,
      then: () =>
        array().of(
          string()
            .required('This field is required')
            .matches(validation.macaddr.reg, validation.macaddr.error),
        ),
    })
    .when('macfilter', {
      is: MacfilterOptionTypes.Deny_listed,
      then: () =>
        array().of(
          string()
            .required('This field is required')
            .matches(validation.macaddr.reg, validation.macaddr.error),
        ),
    }),
  isolate: string().required('This field is required'),
  encryption: string().required('This field is required'),
  cipher: string()
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Personal,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Personal_Mixed_Mode,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA3_Personal,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA3_Enterprise,
      then: () => string().required('This field is required'),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_WPA3_Personal_Mixed_Mode,
      then: () => string().required('This field is required'),
    }),
  _wpa_key: string()
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Personal,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Personal_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA3_Personal,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_WPA3_Personal_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.wpakey.reg, validation.wpakey.error),
    }),
  // password: string(),
  // .required('This field is required'),
  // priv_key_pwd: string(),
  // .required('This field is required'),
  // identity: string(),
  // .required('This field is required'),
  // eap_type: string(),
  // .required('This field is required'),

  auth_server: string()
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise,
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
      is: EncryptionOptionTypes.WPA3_Enterprise,
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
      is: EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode,
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
      is: EncryptionOptionTypes.WPA2_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA3_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.port.reg, validation.port.error),
    }),

  auth_secret: string()
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA3_Enterprise,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    })
    .when('encryption', {
      is: EncryptionOptionTypes.WPA2_Enterprise_Mixed_Mode,
      then: () =>
        string()
          .required('This field is required')
          .matches(validation.minLength1.reg, validation.minLength1.error),
    }),
  // pre_auth: string()
  //   .required('This field is required'),
  // asu_ip: string()
  //   .required('This field is required'),
  // asu_port: string()
  //   .required('This field is required'),
  // enable_tri_cert: string()
  //   .required('This field is required'),
  // cert_filetype: string()
  //   .required('This field is required'),
  // _custom: string()
  //   .required('This field is required'),
  // _custom1: string()
  //   .required('This field is required'),
  // _custom2: string()
  //   .required('This field is required'),
  // unicast_rekey_packet: string()
  //   .required('This field is required'),
  // multicast_rekey_packet: string()
  //   .required('This field is required'),
  // unicast_rekey_timeout: string()
  //   .required('This field is required'),
  // multicast_rekey_timeout: string()
  //   .required('This field is required')
})
