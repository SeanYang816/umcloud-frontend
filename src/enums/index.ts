export enum DashboardEventType {
  ClientsRadioFrequencyRatio = 'clientsRadioFrequencyRatio',
  MostActive = 'mostActive',
  RecentActivity = 'recentActivity',
}

export enum WifiNetIndex {
  WIRE = 0,
  WIRE5 = 1,
}

export enum EncryptionOptionTypes {
  No_Encryption = 'none',
  OWE = 'owe',
  WPA2_Personal = 'psk2',
  WPA2_Enterprise = 'wpa2',
  WPA2_Personal_Mixed_Mode = 'psk-mixed',
  WPA2_Enterprise_Mixed_Mode = 'wpa',
  WPA3_Personal = 'wpa3-sae',
  WPA3_Enterprise = 'wpa3-eap',
  WPA2_WPA3_Personal_Mixed_Mode = 'wpa3-sae-mixed',
}

export enum MacfilterOptionTypes {
  Disable = '',
  Allow_listed_only = 'allow',
  Deny_listed = 'deny',
}
