import { StringObjectType, StringStringType } from 'types'

type groupedObjectsType = {
  [key: string]: StringObjectType
}

export function apiResultObjectToArrayByCommonId(
  result: StringObjectType,
  name: string,
) {
  const keysArray = result[name] as string[]

  if (!keysArray || !Array.isArray(keysArray)) {
    return []
  }

  const groupedObjects: groupedObjectsType = {}

  Object.keys(result).forEach((propertyKey) => {
    const [part1, part2, id, key] = propertyKey.split('.')

    if (part1 && part2 && id && key && keysArray.includes(id)) {
      if (!groupedObjects[id]) {
        groupedObjects[id] = { key: id }
      }
      groupedObjects[id][key] = result[propertyKey]
    }
  })

  const arrayOfObjects = Object.values(groupedObjects)

  return arrayOfObjects as StringStringType[]
}
