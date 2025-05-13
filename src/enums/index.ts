export const DashboardEvent = {
  ClientsRadioFrequencyRatio: 'clientsRadioFrequencyRatio',
  MostActive: 'mostActive',
  RecentActivity: 'recentActivity',
} as const

export type DashboardEventType =
  (typeof DashboardEvent)[keyof typeof DashboardEvent]

export const WifiNetIndex = {
  WIRE: 0,
  WIRE5: 1,
} as const

export type WifiNetIndexType = (typeof WifiNetIndex)[keyof typeof WifiNetIndex]

export const EncryptionOption = {
  No_Encryption: 'none',
  OWE: 'owe',
  WPA2_Personal: 'psk2',
  WPA2_Enterprise: 'wpa2',
  WPA2_Personal_Mixed_Mode: 'psk-mixed',
  WPA2_Enterprise_Mixed_Mode: 'wpa',
  WPA3_Personal: 'wpa3-sae',
  WPA3_Enterprise: 'wpa3-eap',
  WPA2_WPA3_Personal_Mixed_Mode: 'wpa3-sae-mixed',
} as const

export type EncryptionOptionTypes =
  (typeof EncryptionOption)[keyof typeof EncryptionOption]

export const MacfilterOption = {
  Disable: '',
  Allow_listed_only: 'allow',
  Deny_listed: 'deny',
} as const

export type MacfilterOptionTypes =
  (typeof MacfilterOption)[keyof typeof MacfilterOption]
