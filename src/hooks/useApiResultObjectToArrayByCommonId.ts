import { isEmpty, isNil, isEqual } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { StringStringType, StringObjectType } from 'types'

export function useApiResultObjectToArrayByCommonId(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: StringObjectType | any,
  name: string,
) {
  const derived = useMemo<StringStringType[]>(() => {
    // bail early
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isEmpty(result) || isNil((result as any)[name])) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ids = (result as any)[name] as unknown
    if (!Array.isArray(ids)) return []

    const groupArray: Array<StringObjectType> = []

    for (const id of ids as string[]) {
      const obj: StringObjectType = { key: id }

      for (const propertyKey of Object.keys(result)) {
        const parts = propertyKey.split('.')
        if (parts.length !== 4) continue
        // parts: [*, *, <id>, <lastPart>]
        if (parts[2] !== id) continue
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj[parts[3]] = (result as any)[propertyKey]
      }

      groupArray.push(obj)
    }

    return groupArray as StringStringType[]
  }, [result, name])

  // lazy init prevents an extra render on mount
  const [list, setList] = useState<StringStringType[]>(() => derived)

  // sync only when actually different to avoid loops
  useEffect(() => {
    setList((prev) => (isEqual(prev, derived) ? prev : derived))
  }, [derived])

  return [list, setList] as const
}
