export function encrypt_act(a: number, k: number, N: number) {
  let akN
  if (k < 0) return 0
  if (k == 0) return 1
  else if (k == 1) return a
  // k >=2
  const k2 = Math.floor(k / 2)
  const re = Math.floor(k % 2)
  const ak2 = encrypt_act(a, k2, N)
  const ak = ak2 * ak2
  akN = Math.floor(ak % N)
  if (re == 1) {
    akN = akN * a

    return Math.floor(akN % N)
  } else return akN
}
export function encrypt_word(word_value: string) {
  let num = 1
  const N1: string = '142819'
  const P1: string = '983'
  const N2: string = '46217'
  const P2: string = '733'
  let N: string = N1
  let P: string = P1
  let i: number
  let str: string
  let val: string = ''
  let j: number
  let zerostr: string = ''

  if (num == 1) {
    N = N2
    P = P2
  }

  for (i = 0; i < word_value.length; i++) {
    zerostr = ''
    num = encrypt_act(word_value.charCodeAt(i), parseFloat(P), parseFloat(N))
    str = num.toString()
    if (str.length < 8) {
      for (j = 0; j < 8 - str.length; j++) {
        zerostr += '0'
      }
      str = zerostr + str
    }
    val += str
  }

  return val
}
