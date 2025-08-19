import { isEmpty, isNil } from 'lodash'
import { useMemo } from 'react'
import { StringStringType, StringObjectType } from 'types'

export function useApiResultObjectToArrayByCommonId(
  result: StringObjectType,
  name: string,
) {
  const derived = useMemo<StringStringType[]>(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isEmpty(result) || isNil((result as any)[name])) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keysArray = (result as any)[name] as string[]
    if (!Array.isArray(keysArray)) return []

    const groupArray: Array<StringObjectType> = []

    for (const key of keysArray) {
      const newObj: StringObjectType = {}

      for (const propertyKey of Object.keys(result)) {
        const parts = propertyKey.split('.')
        if (parts.length !== 4) continue
        const [, , id, lastPart] = parts
        if (id === key) {
          if (!newObj.key) newObj.key = id
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newObj[lastPart] = (result as any)[propertyKey]
        }
      }
      groupArray.push(newObj)
    }

    return groupArray as StringStringType[]
  }, [result, name])

  // If you must keep the tuple shape for compatibility:
  // return [derived, () => {}] as const

  return [derived] as [StringStringType[]]
}
