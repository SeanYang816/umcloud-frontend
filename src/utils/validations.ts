import { validation } from 'config'

export const isValidPortOrPortrange = (value: string | undefined) => {
  // 下列這行是為了驗證中有時為非必填項目，這時 typescript 會將其判定為 undefined
  if (value === undefined) return true

  // 第一種情況：port 的純數字形式
  const isNumeric = /^\d+$/.test(value)
  if (isNumeric) {
    const portNumber = parseInt(value, 10)

    return portNumber >= 0 && portNumber <= 65535
  }

  // 第二種情況：port 範圍的表示形式
  const isRange = /^\d+-\d+$/.test(value)
  if (isRange) {
    const [start, end] = value.split('-').map(Number)

    return (
      start >= 0 && start <= 65535 && end >= 0 && end <= 65535 && start <= end
    )
  }

  // 如果不符合以上兩種情況，則驗證失敗
  return false
}

export const isValidHostnameOrIPv4 = (value: string | undefined) => {
  // 下列這行是為了驗證中有時為非必填項目，這時 typescript 會將其判定為 undefined
  if (value === undefined) return true

  return (
    validation.hostname.reg.test(value) || validation.ip4addr.reg.test(value)
  )
}

export const isValidIPv4OrIPv6 = (value: string | undefined) => {
  // 下列這行是為了驗證中有時為非必填項目，這時 typescript 會將其判定為 undefined
  if (value === undefined) return true

  return (
    validation.ip4addr.reg.test(value) || validation.ip6addr.reg.test(value)
  )
}
