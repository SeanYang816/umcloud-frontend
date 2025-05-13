import { isArray, isNil } from 'lodash'
import React, { useState, useEffect } from 'react'
import { StringStringType, StringObjectType } from 'types'

export function useApiResultObjectToArrayByCommonId(
  result: StringObjectType,
  name: string,
) {
  const [state, setState] = useState<StringObjectType[]>([])

  useEffect(() => {
    if (isNil(result) || !isArray(result[name])) {
      setState([])

      return
    }

    const keysArray = result[name] as string[]

    const groupArray: Array<StringObjectType> = []

    keysArray.forEach((key) => {
      const newObj: StringObjectType = {}

      Object.keys(result).forEach((propertyKey) => {
        const [part1, part2, id, lastPart] = propertyKey.split('.')

        if (part1 && part2 && id && lastPart && key === id) {
          if (!newObj.key) {
            newObj.key = id
          }
          newObj[lastPart] = result[propertyKey]
        }
      })
      groupArray.push(newObj)
    })

    setState(groupArray)
  }, [result, name])

  return [state, setState] as [
    StringStringType[],
    React.Dispatch<React.SetStateAction<StringStringType[]>>,
  ]
}
