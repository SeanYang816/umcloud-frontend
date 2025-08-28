export function strNumToBool(strNum: string) {
  return strNum === '1'
}

export function boolToStrNum(bool: boolean) {
  return bool ? '1' : '0'
}

export function toggleStrNum(strNum: string) {
  if (strNum === '1') return '0'
  else if (strNum === '0') return '1'
  else {
    console.error('Something is wrong')

    return '0'
  }
}

export function isUpperCase(letter: string) {
  return letter === letter.toUpperCase()
}

// ws request channeId enent params
export const genChannelId = () => {
  return (
    'ch-' +
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
    ).toString(36)
  )
}

// ws request requestId enent params
export const genRequestId = () => {
  return (
    'req-' +
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12),
    ).toString(36)
  )
}

export const fToC = (f: number) => ((f - 32) * 5) / 9
export const cToF = (c: number) => (c * 9) / 5 + 32
