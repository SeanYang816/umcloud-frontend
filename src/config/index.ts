import { SelectOptionProps } from 'types'

export const config = {
  basename: '',
  defaultPath: '/',
}

export const validation = {
  rulename: {
    reg: /^[a-zA-Z0-9_-]+$/,
    error: 'Verify if the value is a valid rule name.',
  },
  host: {
    // reg: /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.?)+\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    error: 'Please enter a valid hostname or IP address (IPv4).',
  },
  hostname: {
    reg: /^(?!-)[a-zA-Z0-9_\-.](?!.*--)[a-zA-Z0-9_\-.]{0,251}(?<!-)$/, // This is used to validate hostnames as per DNS standards.
    error:
      'Verify if the value is a valid DNS domain name or hostname. The hostname can contain uppercase and lowercase alphanumerical characters, underscore, dash and dots. Hostname cannot start with a dash or end with a dot. Maxlength is 253.',
    example: 'this_IS-a.valid.host.name',
  },
  ip4addr: {
    reg: /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(\/(\S+))?$/, // This is used to validate IPv4 addresses.
    error: 'Verify if the value is an IPv4 address.',
    example: '192.168.10.1',
  },
  ip4addrOrIgnore: {
    reg: /^(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|ignore)$/,
    error: 'Verify if the value is an IPv4 address or string "ignore".',
  },
  ip6addr: {
    reg: /^([a-fA-F0-9:.]+)(\/(\d+))?$/, // This is used to validate IPv4 addresses.
    error: 'Verify if the value is an IPv6 address.',
    example: '2001:db8:1200::ab:45ff:fe12:3456',
  },
  port: {
    reg: /^(0|6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3})$/,
    error: 'Verify if the value is a port between 0 and 65535',
    example: '8080',
  },
  portrange: {
    reg: /^(\d+)-(\d+)$/,
    error:
      'Verify if the value contains one or more port separated by a dash. For example: "0-65535"',
    example: '0-65535',
  },
  portOrPortrange: {
    // reg: /^/,
    error:
      'Verify if the value contains one or more port separated by a dash. For example: "0-65535 or 5000"',
    // example: '0-65535'
  },
  hostnameOrIPv4: {
    error: 'Please verify if the value is a valid hostname or IPv4.',
  },
  IPv4OrIPv6: {
    error: 'Please verify if the value is a valid IPv4 or IPv6.',
  },
  portrangeOrIgnore: {
    reg: /^(?:(\d+(?:-\d+)*)|ignore)$/,
  },
  negPortrange: {
    reg: /^(?:!)?(\d+(?:-\d+)*)$/,
  },
  listNegPortrange: {
    reg: /^(?:!)?(?:\d+(?:-\d+)*(?:\s+|$))+$/,
  },
  macaddr: {
    reg: /^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/,
    error:
      'Verify if the value is a valid MAC address separated by colons. The address may contain uppercase and lowercase hexadecimal characters.',
    example: '00:11:22:33:44:55',
  },
  listNegPort: {
    // reg: /[^ \t]+|(?!^!)\b(?:0|([1-9]\d{0,3}|[1-5]\d{4}|6[0-5][0-5][0-3][0-5]))\b/g
    reg: /^(?:!?\d+(?:-\d+)?(?:\s+|$))+$/g,
  },
  negIpaddr: {
    reg: /^!?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|([0-9a-fA-F:]+))$/,
  },
  negPort: {
    reg: /^(!?[0-9]{1,5}|!6553[0-5]|!655[0-2][0-9]|!65[0-4][0-9]{2}|!6[0-4][0-9]{3}|!([0-5]?[0-9]{1,4}))$/,
  },
  limitTo255: {
    reg: /^(0|([1-9]\d{0,1}|1\d{2}|2[0-4]\d|25[0-5]))$/,
    error: 'Input between 0 to 255',
  },
  smallerThan9200: {
    reg: /^(?:[0-8]\d{0,3}|9200)$/,
    error: 'The number should be smaller than 9200.',
  },
  minLength1: {
    reg: /^.{1,}$/,
    error: 'Please enter at least 1 characters',
  },
  minLength2: {
    reg: /^.{2,}$/,
    error: 'Please enter at least 2 characters',
  },
  rangeLength32: {
    reg: /^.{1,32}$/,
    error: 'The length should be between 1 and 32',
  },
  wpakey: {
    reg: /^(?=.*[A-Fa-f0-9]{64}$)(?=.*[\s\S]{8,63}$)[A-Fa-f0-9]{64}|[\s\S]{8,63}$/,
    error:
      'Please enter a valid WPA pre-shared key, from 8 to 63 characters or a valid WPA key containing exactly 64 hexadecimal characters.',
  },
}

export const booleanList: SelectOptionProps[] = [
  { label: 'Disable', value: '0' },
  { label: 'Enable', value: '1' },
]
