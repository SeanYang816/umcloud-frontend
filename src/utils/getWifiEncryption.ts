export const get_wifi_encryption = (encr: string, mgmt: string) => {
  if (encr.indexOf('mixed WPA/WPA2 NONE') >= 0) {
    if (mgmt.indexOf('WPA-EAP') >= 0)
      return encr.replace(/mixed WPA\/WPA2 NONE/g, 'WPA2 Enterprise Mixed Mode')
    else
      return encr.replace(/mixed WPA\/WPA2 NONE/g, 'WPA2 Personal Mixed Mode')
  } else if (encr.indexOf('WPA2 NONE') >= 0) {
    if (mgmt.indexOf('WPA-PSK') >= 0 && mgmt.indexOf('SAE') >= 0)
      return encr.replace(/WPA2 NONE/g, 'WPA2/WPA3 Personal Mixed Mode')
    else if (mgmt.indexOf('WPA-EAP WPA-EAP-SHA256') >= 0)
      // Maybe not work here because it works as wpa2 enterprise now.
      return encr.replace(/WPA2 NONE/g, 'WPA2/WPA3 Enterprise Mixed Mode')
    else if (mgmt.indexOf('WPA-EAP-SHA256') >= 0)
      return encr.replace(/WPA2 NONE/g, 'WPA3 Enterprise')
    else if (mgmt.indexOf('WPA-EAP') >= 0)
      return encr.replace(/WPA2 NONE/g, 'WPA2 Enterprise')
    else if (mgmt.indexOf('SAE') >= 0)
      return encr.replace(/WPA2 NONE/g, 'WPA3 Personal')
    else if (mgmt.indexOf('WPA-PSK') >= 0)
      return encr.replace(/WPA2 NONE/g, 'WPA2 Personal')
    else if (mgmt.indexOf('OWE') >= 0) return encr.replace(/WPA2 NONE/g, 'OWE')
  } else if (encr.indexOf('WPA2 PSK') >= 0) {
    // never see it goes into here, keep it for safe.
    if (mgmt.indexOf('WPA-EAP-SHA256') >= 0)
      return encr.replace(/WPA2 PSK/g, 'WPA3 Enterprise')
    else if (mgmt.indexOf('WPA-EAP') >= 0)
      return encr.replace(/WPA2 PSK/g, 'WPA2 Enterprise')
    else if (mgmt.indexOf('SAE') >= 0)
      return encr.replace(/WPA2 PSK/g, 'WPA3 Personal')
    else if (mgmt.indexOf('WPA-PSK') >= 0)
      return encr.replace(/WPA2 PSK/g, 'WPA2 Personal')
  } else if (encr == 'none') {
    return 'No Encryption'
  }

  return encr
}
